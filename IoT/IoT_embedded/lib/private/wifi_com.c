#include <string.h>
#include <util/delay.h>
#include "display.h"
#include "leds.h"
#include "watering.h"
#include "wifi_com.h"
#include "sensors.h"
#include "env.h"
#include <avr/wdt.h>

extern char inbound_buffer[128];
extern void incomingDataDetected(void);

WIFI_ERROR_MESSAGE_t send_data(char data[]) {
    return wifi_command_TCP_transmit((uint8_t *)data, strlen(data));
}

void handle_incoming_wifi_data() {
    if (strncmp(inbound_buffer, "1", 1) == 0) {
        waterPlant1();
    } else if (strncmp(inbound_buffer, "2", 1) == 0) {
        waterPlant2();
    } else if (strncmp(inbound_buffer, "0", 1) == 0) {
        neutral();
    } else if (strncmp(inbound_buffer, "r", 1) == 0) {
        wdt_reset();
        wdt_enable(WDTO_8S);
        while(1);
    } else {
        display_setValues(17, 22, 19, 22);
        asyncDisableDisplayAfterMs(2000);
    }
}

bool startWifi() {
    int x1 = -1, x2 = -1, cnt = -1, limit = 2;
    wifi_init();
    leds_turnOn(1);

    while (x1 != 0) {
        x1 = wifi_command_join_AP(WIFI_NAME, WIFI_PASSWORD);
        if (x1 > 0 && ++cnt == limit) {
            display_dead();
            _delay_ms(250);
            return false;
        } else if (x1 > 0) {
            display_error(1 + (cnt * 10));
            _delay_ms(500);
        }
    }

    display_empty();
    leds_turnOn(2);
    cnt = -1;

    while (x2 != 0) {
        x2 = wifi_command_create_TCP_connection(MY_IP_ADDRESS, 23,
                &incomingDataDetected, inbound_buffer);
        if (x2 > 0 && ++cnt == limit) {
            display_dead();
            _delay_ms(250);
            return false;
        } else if (x2 > 0) {
            display_error(2 + (cnt * 10));
            _delay_ms(500);
        }
    }

    leds_turnOn(3);
    display_empty();
    return true;
}
