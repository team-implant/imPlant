#ifndef SENSORS_H
#define SENSORS_H

void init_sensors(void);
void collect_all_sensor_data(void);
extern char outbound_buffer[256];

#endif
