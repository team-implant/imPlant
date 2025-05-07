using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetSQL.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAirAndSoilHumidityColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Humidity",
                table: "MeasurementData",
                newName: "SoilHumidity");

            migrationBuilder.AddColumn<double>(
                name: "AirHumidity",
                table: "MeasurementData",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "AirHumidity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    humidity = table.Column<double>(type: "float", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirHumidity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SoilHumidity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    soil = table.Column<double>(type: "float", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoilHumidity", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AirHumidity");

            migrationBuilder.DropTable(
                name: "SoilHumidity");

            migrationBuilder.DropColumn(
                name: "AirHumidity",
                table: "MeasurementData");

            migrationBuilder.RenameColumn(
                name: "SoilHumidity",
                table: "MeasurementData",
                newName: "Humidity");
        }
    }
}
