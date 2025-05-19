using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetSQL.Migrations
{
    /// <inheritdoc />
    public partial class FinalTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Plants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Servo_Calibration",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    plant_id = table.Column<int>(type: "int", nullable: false),
                    time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    angle = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servo_Calibration", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WaterPumps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Level = table.Column<float>(type: "real", nullable: false),
                    MinLevel = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    MaxLevel = table.Column<int>(type: "int", nullable: false, defaultValue: 100),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WaterPumps", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Soil_Humidity_Thresholds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    plant_id = table.Column<int>(type: "int", nullable: false),
                    min_threshold = table.Column<double>(type: "float", nullable: false),
                    time = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Soil_Humidity_Thresholds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Soil_Humidity_Thresholds_Plants_plant_id",
                        column: x => x.plant_id,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MeasurementData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Temperature = table.Column<double>(type: "float", nullable: false),
                    AirHumidity = table.Column<double>(type: "float", nullable: false),
                    SoilHumidity = table.Column<double>(type: "float", nullable: false),
                    Light = table.Column<double>(type: "float", nullable: false),
                    tank_fill_level = table.Column<double>(type: "float", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    plant_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeasurementData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MeasurementData_Plants_plant_id",
                        column: x => x.plant_id,
                        principalTable: "Plants",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Soil_Measurements",
                columns: table => new
                {
                    plant_id = table.Column<int>(type: "int", nullable: false),
                    measure_id = table.Column<int>(type: "int", nullable: false),
                    value = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Soil_Measurements", x => new { x.plant_id, x.measure_id });
                    table.ForeignKey(
                        name: "FK_Soil_Measurements_MeasurementData_measure_id",
                        column: x => x.measure_id,
                        principalTable: "MeasurementData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Soil_Measurements_Plants_plant_id",
                        column: x => x.plant_id,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MeasurementData_plant_id",
                table: "MeasurementData",
                column: "plant_id");

            migrationBuilder.CreateIndex(
                name: "IX_Soil_Humidity_Thresholds_plant_id",
                table: "Soil_Humidity_Thresholds",
                column: "plant_id");

            migrationBuilder.CreateIndex(
                name: "IX_Soil_Measurements_measure_id",
                table: "Soil_Measurements",
                column: "measure_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Servo_Calibration");

            migrationBuilder.DropTable(
                name: "Soil_Measurements");

            migrationBuilder.DropTable(
                name: "WaterPumps");

            migrationBuilder.DropTable(
                name: "MeasurementData");

            migrationBuilder.DropTable(
                name: "Soil_Humidity_Thresholds");

            migrationBuilder.DropTable(
                name: "Plants");
        }
    }
}
