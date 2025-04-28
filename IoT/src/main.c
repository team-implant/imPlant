#include <avr/interrupt.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <util/delay.h>

#include "dht11.h"
#include "includes.h"
#include "periodic_task.h"
#include "uart.h"
#include "wifi.h"

static uint8_t _buff[100];
static uint8_t _index = 0;
volatile static bool _done = false;
uint8_t temperature_reading;
uint8_t temperature_reading_decimal;
uint8_t humidity_reading;
uint8_t humidity_reading_decimal;
uint8_t temp_hum_error = 0;

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

void measureTemp() {
    // // in here do the getting + sending to TCP, since timers need a void
    // // function alright
    DHT11_ERROR_MESSAGE_t status =
        dht11_get(&temperature_reading, &temperature_reading_decimal,
                  &humidity_reading, &humidity_reading_decimal);
    if (status == DHT11_FAIL)
        temp_hum_error = 1;
    else {
        temp_hum_error = 0;
        char buffer[16];
        sprintf(buffer, "TEMP=%d.%d\n", temperature_reading,
                temperature_reading_decimal);
        send_data(buffer);
    }
}

int main() {
    // allow for interrupts
    sei();

    // initiate wifi connection
    wifi_init();
    wifi_command_join_AP("POCO X3 NFC", "12456789");
    wifi_command_create_TCP_connection("192.168.19.234", 23, NULL, NULL);
    // initiate the temperature and humidity sensor
    dht11_init();
    int perMinute = 10;
    void (*pointer)(void) = &measureTemp;

    // // initiate a timer [perMinute] with the [measureTemp] function
    periodic_task_init_c(pointer, (60000/perMinute));
    while (1) {
        int a = 1;
    }

    // Example of uart and wifi connection
    //
    //  char welcome_text[] = "Welcome from SEP4 IoT hardware!\n";
    //  char prompt_text[] = "Type text to send: ";

    // uart_init(USART_0, 9600, console_rx);

    // uart_send_string_blocking(USART_0, prompt_text);

    // while (1)
    // {
    //     if (_done)
    //     {
    //         wifi_command_TCP_transmit(_buff, strlen((char *)_buff));
    //         _done = false;
    //         uart_send_string_blocking(USART_0, prompt_text);
    //     }
    // }
    return 0;
}