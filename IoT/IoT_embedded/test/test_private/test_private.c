#include "unity.h"

#include <util/delay.h>

#include <avr/io.h>
#include "adxl345.h"
#include <stdint.h>
#include <math.h>
#include "hc_sr04.h"
#include "dht11.h"
#include <stdio.h>
#include "light.h"
#include "pir.h"
#include "tone.h"

// Here you write t

void setUp(void){
    
}

void tearDown(void){

}

void test1(void){
    TEST_MESSAGE("71 is 71 :1:_:PASS\n");
    TEST_ASSERT_EQUAL(71, 71);
}

int main(void){
    UNITY_BEGIN();
    RUN_TEST(test1);
    UNITY_END();
}