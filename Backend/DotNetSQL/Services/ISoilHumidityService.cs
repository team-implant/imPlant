using DotNetSQL.DTOs;
public interface ISoilHumidityService
{
    // Task<SoilHumidityDto> AddSoilHumidityAsync(SoilHumidityDto soilHumidityDto);
    Task<IEnumerable<SoilHumidityDto>> GetSoilHumidityAsync();
    Task<SoilHumidityDto?> GetSoilHumidityByIdAsync(int id);

    
}