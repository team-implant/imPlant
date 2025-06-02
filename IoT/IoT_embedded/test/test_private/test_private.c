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

// Here you write the tests

void setUp(void){
    
}

void tearDown(void){

}

void test_unity(void){
    char message[1024];
    sprintf(message, "71 is 71 (tests are working correctly!) :1:_:PASS\n");
    TEST_MESSAGE(message); 
    TEST_ASSERT_TRUE_MESSAGE((71 == 71), "71 should be equal to 71. Unity failed");
}

int main(void){
    UNITY_BEGIN();
    RUN_TEST(test_unity);
    UNITY_END();
}