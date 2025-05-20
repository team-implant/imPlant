#include "state.h"
#include <stdint.h>

char outbound_buffer[256];

char inbound_buffer[128];

bool shouldMeasure = false;
bool shouldHandleInboundData = false;
bool calibrating_water_level = false;

void enableMeasure(void) {
    shouldMeasure = true;
}

void incomingDataDetected(void) {
    shouldHandleInboundData = true;
}
