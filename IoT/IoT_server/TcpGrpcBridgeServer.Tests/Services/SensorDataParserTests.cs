using System;
using System.Collections.Generic;
using TcpGrpcBridgeServer.Models;
using TcpGrpcBridgeServer.Services;
using Xunit;

namespace TcpGrpcBridgeServer.Tests
{
    public class SensorDataParserTests
    {
        [Fact]
        public void ParseSensorData_ValidInput_ReturnsTwoSensorDataObjects()
        {
            // Arrange
            string input = "TEMP=23.5C\nHUMIDITY=40.2%\nLIGHT=123LUX\nDIST=80MM\nSOIL1=20.1%\nSOIL2=21.1%\n";

            // Act
            List<SensorData> result = SensorDataParser.ParseSensorData(input);

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Equal(23.5f, result[0].Temperature);
            Assert.Equal(40.2f, result[0].AirHumidity);
            Assert.Equal(20.1f, result[0].SoilHumidity);
            Assert.Equal(123f, result[0].Light);
            Assert.Equal(80f, result[0].TankFillLevel);
            Assert.Equal(1, result[0].SoilHumidityDetailsId);

            Assert.Equal(21.1f, result[1].SoilHumidity);
            Assert.Equal(2, result[1].SoilHumidityDetailsId);
        }

        [Fact]
        public void ParseSensorData_MissingFields_ThrowsFormatException()
        {
            // Arrange
            string input = "TEMP=23.5C\nHUMIDITY=40.2%\nLIGHT=123LUX\nSOIL1=20.1%\n";

            // Act & Assert
            Assert.Throws<FormatException>(() => SensorDataParser.ParseSensorData(input));
        }

        [Fact]
        public void ParseSensorData_InvalidNumbers_ThrowsFormatException()
        {
            // Arrange
            string input = "TEMP=abcC\nHUMIDITY=xyz%\nLIGHT=123LUX\nDIST=80MM\nSOIL1=20.1%\nSOIL2=21.1%\n";

            // Act & Assert
            Assert.Throws<FormatException>(() => SensorDataParser.ParseSensorData(input));
        }
    }
}
