#include <stdio.h>
#include <string.h>
#include <util/delay.h>
#include <avr/interrupt.h>

#include "dht11.h"
#include "light.h"
#include "hc_sr04.h"
#include "soil.h"
#include "adxl345.h"
#include "sensors.h"

extern char outbound_buffer[256];

void measureTemp() {
    uint8_t temp, temp_dec, hum, hum_dec;
    DHT11_ERROR_MESSAGE_t status;
    uint8_t retries = 5;

    cli();
    do {
        status = dht11_get(&hum, &hum_dec, &temp, &temp_dec);
        if (status == DHT11_OK) break;
        _delay_ms(200);
    } while (--retries > 0);
    sei();

    if (status != DHT11_OK) {
        sprintf(outbound_buffer + strlen(outbound_buffer), "DHT11_ERROR=%d\n", status);
    } else {
        sprintf(outbound_buffer + strlen(outbound_buffer), "TEMP=%d.%d\nHUMIDITY=%d.%d\n",
                temp, temp_dec, hum, hum_dec);
    }
}

void measureLight() {
    uint32_t ans = 1024 - light_read();
    sprintf(outbound_buffer + strlen(outbound_buffer), "LIGHT=%ld\n", ans);
}

void measureDist() {
    uint16_t distance = hc_sr04_takeMeasurement();
    sprintf(outbound_buffer + strlen(outbound_buffer), "DIST=%d\n", distance);
}

void measureSoils(int n) {
    sprintf(outbound_buffer + strlen(outbound_buffer),
            "SOIL%d=%d\n", (n % 2) + 1, soil_read(n));
}

void measureAcceleration() {
    int16_t x, y, z;
    adxl345_read_xyz(&x, &y, &z);
    sprintf(outbound_buffer + strlen(outbound_buffer),
            "ACCEL_X=%d\nACCEL_Y=%d\nACCEL_Z=%d\n", (x/834), (y/834), (z/834));
}

void collect_all_sensor_data() {
    strcpy(outbound_buffer, "DATA\n");
    measureTemp();
    measureLight();
    measureDist();
    measureSoils(8);
    _delay_ms(100);
    measureSoils(9);
    // measureAcceleration();
}

void init_sensors() {
    dht11_init();
    _delay_ms(2500);
    hc_sr04_init();
    soil_init();
    adxl345_init();
    light_init();
}
