#include <avr/interrupt.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <util/delay.h>

#include "Buttons.h"
#include "servo.h"
#include "PC_Comm.h"
#include "dht11.h"
#include "env.h"
#include "hc_sr04.h"
#include "includes.h"
#include "leds.h"
#include "light.h"
#include "periodic_task.h"
#include "uart.h"
#include "wifi.h"
#include "soil.h"
#include "adxl345.h"
#include "waterPump.h"
#include "display.h"

static uint8_t _buff[100];
static uint8_t _index = 0;
volatile static bool _done = false;
uint8_t temperature_reading;
uint8_t temperature_reading_decimal;
uint8_t humidity_reading;
uint8_t humidity_reading_decimal;
bool temp_hum_error = false;
bool shouldMeasure = false;
char outbound_buffer[128];
char inbound_buffer[128];
bool shouldHandleInboundData = false;
bool calibrating_water_level = false;

int PLANT1_ANGLE = 70;
int PLANT2_ANGLE = 105;
int NEUTRAL_ANGLE = 87;

// Seems like its never used, if you find yourself uncommenting this function delete this comment lol
// if not deleted TODO: get rid of this function ↓
// void console_rx(uint8_t _rx) {
//     uart_send_blocking(USART_0, _rx);
//     uart_send_blocking(USART_0, _rx);
//     if (('\r' != _rx) && ('\n' != _rx)) {
//         if (_index < 100 - 1) {
//             _buff[_index++] = _rx;
//         }
//     } else {
//         _buff[_index] = '\0';
//         _index = 0;
//         _done = true;
//         uart_send_blocking(USART_0, '\n');
//         //        uart_send_string_blocking(USART_0, (char*)_buff);
//     }
// }

// flavour
void ledAnimation(){
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
bool first;
void displayAndDie(){
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

// manages bool switchis for main-while loop
void enableMeasure() { shouldMeasure = true; }

void incomingDataDetected() { shouldHandleInboundData = true; }

// manages all the sensor and appending answers to outbound buffer string
// TODO: rework to maybe actually return the answer rather than appending to a global string???????
void measureLight() {
    uint32_t ans = 1024 - light_read();
    sprintf(outbound_buffer, "%sLIGHT=%ld\n", outbound_buffer, ans);
}

void measureDist() {
    uint16_t distance = hc_sr04_takeMeasurement();
    sprintf(outbound_buffer, "%sDIST=%d\n", outbound_buffer, distance);
}

void measureTemp() {
    DHT11_ERROR_MESSAGE_t status =
        dht11_get(&humidity_reading, &humidity_reading_decimal,
                  &temperature_reading, &temperature_reading_decimal);
    if (status == DHT11_FAIL)
        temp_hum_error = true;
    else {
        temp_hum_error = false;
        sprintf(outbound_buffer, "TEMP=%d.%d\nHUMIDITY=%d.%d\n",
                temperature_reading, temperature_reading_decimal,
                humidity_reading, humidity_reading_decimal);
    }
}

void measureSoils(int n) {
    sprintf(outbound_buffer + strlen(outbound_buffer),
            "SOIL%d=%d\n", (n % 2) + 1, soil_read(n));
}

void measureAcceleration() {
    int16_t x, y, z;
    adxl345_read_xyz(&x, &y, &z);
    sprintf(outbound_buffer + strlen(outbound_buffer),
            "ACCEL_X=%d\nACCEL_Y=%d\nACCEL_Z=%d\n", x, y, z);
}

// manages watering pump / servo motor activities
void runWaterPump(){
    _delay_ms(500); //wait to complete move
    pump_start();
    uint32_t timeout = 10000;
    while (timeout > 0){timeout--;_delay_ms(1);}
    pump_stop();
    _delay_ms(1000); //wait for water to empty before returning 
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

void send_data(char data[]) {
    wifi_command_TCP_transmit((uint8_t *)data, strlen(data));
}

void handle_incoming_wifi_data() {
    // send_data(inbound_buffer);
    if (strcmp(inbound_buffer, "WATER1") == 0) {
        waterPlant1();
    } else if (strcmp(inbound_buffer, "WATER2") == 0) {
        waterPlant2();
    }
    else if (strcmp(inbound_buffer, "NEUTRAL") == 0) {
        neutral();
    }
}

void turnOffAll() {
    leds_turnOff(1);
    leds_turnOff(2);
    leds_turnOff(3);
    leds_turnOff(4);
}

//both the while loops: check if answer from wifi.h is 0 (OK), otherwise try to connect again. If limit is reached return false and show 'dEAd'
bool startWifi() {
    int x1 = -1;
    int cnt = -1;
    int limit = 3;
    wifi_init();
    leds_turnOn(1);
    while (x1 != 0){
        x1 = wifi_command_join_AP(WIFI_NAME, WIFI_PASSWORD);
        if (x1 > 0) {
            if (++cnt == limit){display_dead(); _delay_ms(250); return false;}
            display_error(1+(cnt*10)); _delay_ms(500);
        }
    }
    display_empty();
    leds_turnOn(2);
    cnt = -1;
    int x2 = -1;
    while (x2 != 0){
        x2 = wifi_command_create_TCP_connection(MY_IP_ADDRESS, 23,
                &incomingDataDetected, inbound_buffer);
                // NULL , NULL);
        if (x2 > 0) {
            if (++cnt == limit){display_dead(); _delay_ms(250); return false;}
            display_error(2+(cnt*10)); _delay_ms(500);
        }
    }
    leds_turnOn(3);
    display_empty();
    return true;
}

// place all the inits in here please:
void inits() {
    leds_init();
    dht11_init();
    hc_sr04_init();
    soil_init();
    adxl345_init();
    light_init();
    buttons_init();
    pump_init();
    display_init();
    display_empty();
    // allow for interrupts
    sei();
}
/* 
For now, display shows following errors: 

E-x1 - failed on connection to wifi, tried x + 1 times
E-x2 - failed on connection to provided TCP port, tried x + 1 times

dEAd - failed completely (reached connection limit), device cannot operate
*/
int main() {
    inits();
    turnOffAll();
    display_empty();
    // initiate wifi connection
    bool working = startWifi();
    int perMinute = 20;
    int perHour = 0;
    void (*pointer)(void) = &enableMeasure;

    // manage proper timing
    if (perMinute == 0 && perHour != 0){periodic_task_init_c(pointer, (3600000 / perHour));}
    else if (perMinute != 0){periodic_task_init_c(pointer, (60000 / perMinute));}
    else {working = false; display_dead();}
    display_setValues(17, 17, 22, 1);
    asyncDisableDisplayAfterMs(5000);
    while (working) {
        _delay_ms(100);
        leds_turnOff(4);
        if (shouldMeasure) {
            leds_turnOn(4);
            sprintf(outbound_buffer, "");
            measureTemp();
            measureLight();
            measureDist();
            measureSoils(8);
            _delay_ms(100);
            measureSoils(9);
            measureAcceleration();
            send_data(outbound_buffer);
            shouldMeasure = false;
        }

        if (shouldHandleInboundData) {
            handle_incoming_wifi_data();
            shouldHandleInboundData = false;
        }

        //calibrate minimum and maximum water levels
        if (buttons_1_pressed()) {
            //since its single threaded, once we are in here, the arduino wont be able to go with the other functions anyway
            // so calibrating_water_level seems pointeless
            calibrating_water_level = true;
            turnOffAll();
            _delay_ms(250);
            leds_turnOn(1);
            while (!buttons_1_pressed()) {}
            uint16_t measurement_epmty = hc_sr04_takeMeasurement();
            leds_turnOn(2);
            _delay_ms(250);
            while (!buttons_1_pressed()) {}
            uint16_t measurement_full = hc_sr04_takeMeasurement();
            _delay_ms(250);
            leds_turnOn(3);

            sprintf(outbound_buffer,
                    "EMPTY_WATER_LEVEL=%d\nMAX_WATER_LEVEL=%d\n",
                    measurement_epmty, measurement_full);

            send_data(outbound_buffer);
            ledAnimation();
            calibrating_water_level = false;
        }

        //calibrate the sprinklers aim
        if (buttons_2_pressed()){
            display_setValues(18, 20, 18, 1);
            bool done = false;
            servo(PLANT1_ANGLE);
            while (!done){
                _delay_ms(100);
                if(buttons_1_pressed()){
                    PLANT1_ANGLE = PLANT1_ANGLE + 1;
                    servo(PLANT1_ANGLE);
                    display_int(PLANT1_ANGLE);
                    _delay_ms(500);
                    display_setValues(18, 20, 18, 1);
                }
                else if (buttons_2_pressed()){
                    PLANT1_ANGLE = PLANT1_ANGLE - 1;
                    servo(PLANT1_ANGLE);
                    display_int(PLANT1_ANGLE);
                    _delay_ms(500);
                    display_setValues(18, 20, 18, 1);
                }
                else if (buttons_3_pressed()){
                    done = true;
                }
            }
            display_setValues(18, 20, 18, 2);
            done = false;
            servo(PLANT2_ANGLE);
            while (!done){
                _delay_ms(100);
                if(buttons_1_pressed()){
                    PLANT2_ANGLE = PLANT2_ANGLE + 1;
                    servo(PLANT2_ANGLE);
                    display_int(PLANT2_ANGLE);
                    _delay_ms(500);
                    display_setValues(18, 20, 18, 2);
                }
                else if (buttons_2_pressed()){
                    PLANT2_ANGLE = PLANT2_ANGLE - 1;
                    servo(PLANT2_ANGLE);
                    display_int(PLANT2_ANGLE);
                    _delay_ms(500);
                    display_setValues(18, 20, 18, 2);
                }
                else if (buttons_3_pressed()){
                    display_setValues(13, 21, 20, 14);
                    asyncDisableDisplayAfterMs(5000);
                    done = true;
                }
            }
        }
    }
    while(1){}
    return 0;
}
