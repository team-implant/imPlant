#pragma once

// This is a replacement of a regular dotenv file. It's added to .gitignore, so
// it will not be uploaded to GitHub, for safety reasons Here, we can keep
// things like:
#define WIFI_PASSWORD = "Password1"
#define WIFI_NAME = "WiFi_name"
// Or keep track of stuff like IP addresses on a network, so we won't have to
// ask people (without uploading them to Git constantly...)
#define MY_IP_ADDRESS = "192.168.0.1"
