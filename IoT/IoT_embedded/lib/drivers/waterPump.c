#include <avr/io.h>
#include "waterPump.h"

void pump_init()
{
    DDRA |= _BV(PA7);
    PORTA |= _BV(PA7);
    pump_stop();
}

void pump_start()
{
    PORTA |= _BV(PA7);
}

void pump_stop()
{
    PORTA &= ~(_BV(PA7));
}

int pump_running()
{
    if (PORTA && _BV(PA7) == 0)
    {
        return 0;
    }
    return 1;
}