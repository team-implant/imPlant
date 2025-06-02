#include "includes.h"
#include <stdbool.h>
#include <avr/wdt.h>

#include "buttons.h"
#include "display.h"
#include "leds.h"
#include "periodic_task.h"
#include "sensors.h"
#include "watering.h"
#include "wifi_com.h"
#include "calibration.h"

char outbound_buffer[256];
char inbound_buffer[128];

bool shouldMeasure = true;
bool shouldHandleInboundData = false;
bool calibrating_water_level = false;

static bool first = false;

void displayAndDie() {
    if (!first){
        display_empty();
        disable_timer_b();
    }
    first = false;
}

void asyncDisableDisplayAfterMs(int ms){
    first = true;
    void (*disablePointer)(void) = &displayAndDie;
    periodic_task_init_b(disablePointer, ms);
}

void enableMeasure(void) {
    shouldMeasure = true;
}

void incomingDataDetected(void) {
    shouldHandleInboundData = true;
}

void inits() {
    sei();
    leds_init();
    turnOffAll();
    init_display();
    init_sensors();
    init_watering();
    buttons_init();
    display_empty();
}

int main() {
    inits();
    turnOffAll();
    display_empty();

    // Connect to WiFi
    bool working = startWifi();

    // Setup periodic measurement every 3 minutes (20x per hour)
    int perHour = 20;
    int perMinute = 0;
    if (perHour > 0){
        periodic_task_init_c(&enableMeasure, 3600000 / perHour);
    }
    else if (perMinute > 0) {
        periodic_task_init_c(&enableMeasure, 60000 / perMinute);
    } 
    else {
        working = false;
        display_dead();
    }

    if (working) {
        display_setValues(17, 17, 22, 1);  // Show welcome/“Hi”
        asyncDisableDisplayAfterMs(5000);
    }

    while (working) {
        _delay_ms(100);
        leds_turnOff(4);

        if (shouldMeasure) {
            leds_turnOn(4);
            collect_all_sensor_data();
            if (send_data(outbound_buffer) != 0){
                working = false;
                break;
            }
            shouldMeasure = false;
        }

        if (shouldHandleInboundData) {
            handle_incoming_wifi_data();
            shouldHandleInboundData = false;
        }

        if (buttons_1_pressed()) {
            calibrate_water_levels();
        }

        if (buttons_2_pressed()) {
            calibrate_sprinkler_angles();
        }
    }
    ledAnimation();
    display_dead();
    _delay_ms(60000*3);
    wdt_reset();
    wdt_enable(WDTO_8S);
    while (1);  // Will never reach here. If the device is described as dead, it will wait 3 minutes and restart itself, trying again :)
    // Surely this reminds us of a story of a certain greek king, whose name begun with S and ended with isyphus. It is plain to see 
    // that we have forced this poor little arduino to suffer a fate worse then death. Constantly giving it a task, and upon failing said task
    // where it had no say in the matter, is forced to immedietely pronounce its very self dead, wait in dread, and finally kill itself only to
    // be dragged back into life by a force infinetely higher than itself. Truly a fate worse then death. May we ask god for forgivenes for what
    // we have created. For surely the creature holds for us naught by contempt.
    return 0;
}
