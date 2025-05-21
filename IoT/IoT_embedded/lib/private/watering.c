#include <util/delay.h>
#include "servo.h"
#include "waterPump.h"
#include "watering.h"

static int PLANT1_ANGLE = 70;
static int PLANT2_ANGLE = 105;
static int NEUTRAL_ANGLE = 87;

void runWaterPump(){
    _delay_ms(500);
    pump_start();
    uint32_t timeout = 10000;
    while (timeout-- > 0) _delay_ms(1);
    pump_stop();
    _delay_ms(1000);
}

void waterPlant1() {
    servo(PLANT1_ANGLE);
    runWaterPump();
    servo(NEUTRAL_ANGLE);
}

void waterPlant2() {
    servo(PLANT2_ANGLE);
    runWaterPump();
    servo(NEUTRAL_ANGLE);
}

void neutral(){
    servo(NEUTRAL_ANGLE);
}

void init_watering() {
    pump_init();
}
