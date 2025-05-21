#include <stdio.h>
#include <string.h>
#include <util/delay.h>

#include "buttons.h"
#include "leds.h"
#include "hc_sr04.h"
#include "display.h"
#include "servo.h"
#include "watering.h"
#include "calibration.h"
#include "wifi_com.h"

extern char outbound_buffer[256];
extern bool calibrating_water_level;

void calibrate_water_levels() {
    calibrating_water_level = true;
    turnOffAll();
    _delay_ms(250);
    leds_turnOn(1);

    while (!buttons_1_pressed()) {}
    uint16_t measurement_empty = hc_sr04_takeMeasurement();

    leds_turnOn(2);
    _delay_ms(250);
    while (!buttons_1_pressed()) {}
    uint16_t measurement_full = hc_sr04_takeMeasurement();

    _delay_ms(250);
    leds_turnOn(3);

    sprintf(outbound_buffer,
            "WC;EMPTY_WATER_LEVEL=%d\nMAX_WATER_LEVEL=%d\n",
            measurement_empty, measurement_full);

    send_data(outbound_buffer);
    ledAnimation();
    calibrating_water_level = false;
}

void calibrate_sprinkler_angles() {
    int angle1 = 70;
    int angle2 = 105;

    display_setValues(18, 20, 18, 1);
    bool done = false;
    servo(angle1);

    while (!done) {
        _delay_ms(100);
        if (buttons_1_pressed()) {
            angle1 += 1;
            servo(angle1);
            display_int(angle1);
            _delay_ms(500);
            display_setValues(18, 20, 18, 1);
        } else if (buttons_2_pressed()) {
            angle1 -= 1;
            servo(angle1);
            display_int(angle1);
            _delay_ms(500);
            display_setValues(18, 20, 18, 1);
        } else if (buttons_3_pressed()) {
            done = true;
        }
    }

    display_setValues(18, 20, 18, 2);
    done = false;
    servo(angle2);

    while (!done) {
        _delay_ms(100);
        if (buttons_1_pressed()) {
            angle2 += 1;
            servo(angle2);
            display_int(angle2);
            _delay_ms(500);
            display_setValues(18, 20, 18, 2);
        } else if (buttons_2_pressed()) {
            angle2 -= 1;
            servo(angle2);
            display_int(angle2);
            _delay_ms(500);
            display_setValues(18, 20, 18, 2);
        } else if (buttons_3_pressed()) {
            display_setValues(13, 21, 20, 14);
            asyncDisableDisplayAfterMs(5000);
            done = true;
        }
    }
}
