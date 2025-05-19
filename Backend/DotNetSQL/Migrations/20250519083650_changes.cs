using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetSQL.Migrations
{
    /// <inheritdoc />
    public partial class changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MeasurementData_Soil_Humidity_Thresholds_SoilHumidityDetailsId",
                table: "MeasurementData");

            migrationBuilder.RenameColumn(
                name: "SoilHumidityDetailsId",
                table: "MeasurementData",
                newName: "plant_id");

            migrationBuilder.RenameIndex(
                name: "IX_MeasurementData_SoilHumidityDetailsId",
                table: "MeasurementData",
                newName: "IX_MeasurementData_plant_id");

            migrationBuilder.AddForeignKey(
                name: "FK_MeasurementData_Plants_plant_id",
                table: "MeasurementData",
                column: "plant_id",
                principalTable: "Plants",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MeasurementData_Plants_plant_id",
                table: "MeasurementData");

            migrationBuilder.RenameColumn(
                name: "plant_id",
                table: "MeasurementData",
                newName: "SoilHumidityDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_MeasurementData_plant_id",
                table: "MeasurementData",
                newName: "IX_MeasurementData_SoilHumidityDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_MeasurementData_Soil_Humidity_Thresholds_SoilHumidityDetailsId",
                table: "MeasurementData",
                column: "SoilHumidityDetailsId",
                principalTable: "Soil_Humidity_Thresholds",
                principalColumn: "Id");
        }
    }
}
