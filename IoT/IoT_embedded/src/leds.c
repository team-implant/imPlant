#include "leds.h"
#include "includes.h"
#include <util/delay.h>

void turnOffAll() {
    leds_turnOff(1);
    leds_turnOff(2);
    leds_turnOff(3);
    leds_turnOff(4);
}

void ledAnimation() {
    _delay_ms(1000);
    leds_turnOn(4);
    _delay_ms(1000);
    turnOffAll();
    _delay_ms(1000);
    leds_turnOn(1);
    leds_turnOn(2);
    leds_turnOn(3);
    leds_turnOn(4);
    _delay_ms(1000);
    turnOffAll();
    _delay_ms(1000);
    leds_turnOn(1);
    leds_turnOn(2);
    leds_turnOn(3);
}