#include <avr/interrupt.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <util/delay.h>
#include <math.h>

#include "dht11.h"
#include "includes.h"
#include "periodic_task.h"
#include "uart.h"
#include "wifi.h"
#include "leds.h"
#include "light.h"

static uint8_t _buff[100];
static uint8_t _index = 0;
volatile static bool _done = false;
uint8_t temperature_reading;
uint8_t temperature_reading_decimal;
uint8_t humidity_reading;
uint8_t humidity_reading_decimal;
bool temp_hum_error = false;
bool shouldMeasure = false;
char buffer[128];

void console_rx(uint8_t _rx) {
    uart_send_blocking(USART_0, _rx);
    if (('\r' != _rx) && ('\n' != _rx)) {
        if (_index < 100 - 1) {
            _buff[_index++] = _rx;
        }
    } else {
        _buff[_index] = '\0';
        _index = 0;
        _done = true;
        uart_send_blocking(USART_0, '\n');
        //        uart_send_string_blocking(USART_0, (char*)_buff);
    }
}

void send_data(char data[]) {
    wifi_command_TCP_transmit((uint8_t *)data, strlen(data));
}

void enableMeasure(){
    shouldMeasure = true;
}

void measureLight(){
    uint32_t ans = 1024 - light_read();
    sprintf(buffer, "%sLIGHT=%d\n", buffer, ans);
}

void measureTemp() {
    // in here do the getting + sending to TCP, since timers need a void function
    DHT11_ERROR_MESSAGE_t status =
        dht11_get(&humidity_reading, &humidity_reading_decimal, 
            &temperature_reading, &temperature_reading_decimal);
    if (status == DHT11_FAIL)
        temp_hum_error = true;
    else {
        temp_hum_error = false;
        sprintf(buffer, "TEMP=%d.%d\nHUMIDITY=%d.%d\n", temperature_reading,
                temperature_reading_decimal, humidity_reading, humidity_reading_decimal);
    }
}

void turnOffAll(){
    leds_turnOff(1);
    leds_turnOff(2);
    leds_turnOff(3);
    leds_turnOff(4);
}

void startWifi(){
    wifi_init();
    leds_turnOn(1);
    wifi_command_join_AP("imPlantIoT", "12456789");
    leds_turnOn(2);
    wifi_command_create_TCP_connection("192.168.15.234", 23, NULL, NULL);
    leds_turnOn(3);
}

// initiate the temp and light sensor
void inits(){
    leds_init();
    dht11_init();
    light_init();
    // allow for interrupts
    sei();
}

int main() {
    inits();
    turnOffAll();
    // initiate wifi connection
    startWifi();
    int perMinute = 20;
    void (*pointer)(void) = &enableMeasure; 
    // initiate a timer with the [measureTemp] function at [perMinute] 
    periodic_task_init_c(pointer, (60000/perMinute));


    while (1) {
        _delay_ms(100);
        if(shouldMeasure){
            measureTemp();
            // measureLight();
            send_data(buffer);
            shouldMeasure = false;
        }
    }
    
    return 0;
}