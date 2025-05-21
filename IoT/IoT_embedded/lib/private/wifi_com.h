#ifndef WIFI_COM_H
#define WIFI_COM_H

#include <stdbool.h>

void send_data(char data[]);
void handle_incoming_wifi_data(void);
bool startWifi(void);

#endif
