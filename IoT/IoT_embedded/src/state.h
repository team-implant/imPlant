#ifndef STATE_H
#define STATE_H

#include <stdbool.h>

extern bool shouldMeasure;
extern bool shouldHandleInboundData;
extern bool calibrating_water_level;

void enableMeasure(void);
void incomingDataDetected(void);

#endif
