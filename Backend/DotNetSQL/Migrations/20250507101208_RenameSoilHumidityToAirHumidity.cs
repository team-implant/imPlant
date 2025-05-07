using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetSQL.Migrations
{
    public partial class RenameSoilHumidityToAirHumidity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Rename the column "SoilHumidity" to "AirHumidity" in the "AirHumidity" table
            migrationBuilder.RenameColumn(
                name: "SoilHumidity",
                table: "AirHumidity",
                newName: "AirHumidity"
            );

            // Rename the column "soil" to "SoilHumidity" in the "SoilHumidity" table
            migrationBuilder.RenameColumn(
                name: "soil",
                table: "SoilHumidity",
                newName: "SoilHumidity"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Revert the column name from "AirHumidity" back to "SoilHumidity"
            migrationBuilder.RenameColumn(
                name: "AirHumidity",
                table: "AirHumidityDto",
                newName: "SoilHumidity"
            );

            // Revert the column name from "SoilHumidity" back to "soil"
            migrationBuilder.RenameColumn(
                name: "soil",
                table: "SoilHumidityDto",
                newName: "SoilHumidity"
            );
        }
    }
}