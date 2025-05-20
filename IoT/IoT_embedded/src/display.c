#include "display.h"
#include "periodic_task.h"
#include <stdbool.h>

static bool first = false;

void displayAndDie() {
    if (!first){
        display_empty();
        disable_timer_b();
    }
    first = false;
}

void asyncDisableDisplayAfterMs(int ms){
    first = true;
    void (*disablePointer)(void) = &displayAndDie;
    periodic_task_init_b(disablePointer, ms);
}

void init_display() {
    display_init();
}
