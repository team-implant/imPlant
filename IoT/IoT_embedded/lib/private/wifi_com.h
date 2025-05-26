#pragma once

#include <stdbool.h>
#include "wifi.h"

WIFI_ERROR_MESSAGE_t send_data(char data[]);
void handle_incoming_wifi_data(void);
bool startWifi(void);
