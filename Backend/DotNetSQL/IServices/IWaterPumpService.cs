using DotNetSQL.DTOs;

public interface IWaterPumpService
{
    Task<IEnumerable<WaterPumpDto>> GetWaterPumpAsync();
    Task<WaterPumpDto?> GetWaterPumpByIdAsync(int id);
    // Optionally: Task<WaterPumpDto> AddWaterPumpAsync(WaterPumpDto dto);
}
