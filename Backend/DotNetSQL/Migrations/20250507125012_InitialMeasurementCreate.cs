using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetSQL.Migrations
{
    /// <inheritdoc />
    public partial class InitialMeasurementCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeasurementData", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MeasurementData");
        }
    }
}
