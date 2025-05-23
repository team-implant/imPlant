using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetSQL.Migrations
{
    /// <inheritdoc />
    public partial class positions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Only add Position column if it doesn't exist
            migrationBuilder.AddColumn<int>(
                name: "Position",
                table: "Soil_Humidity_Thresholds",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                table: "Soil_Humidity_Thresholds");

            migrationBuilder.AddColumn<double>(
                name: "Value",
                table: "Soil_Humidity_Thresholds",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
