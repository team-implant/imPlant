#pragma once
#include "includes.h"

void pump_init();   // Initialize the pump module. Connect the relay it to the port PA7 on the Arduino
void pump_start();  // Start the pump
void pump_stop();   // Stop the pump
int pump_running(); // Returns 1 if the pump is running, 0 if it's stopped