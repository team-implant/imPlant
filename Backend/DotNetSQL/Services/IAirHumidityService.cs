using DotNetSQL.DTOs;
public interface IAirHumidityService
{
    // Task<AirHumidityDto> AddAirHumidityAsync(AirHumidityDto airHumidityDto);
    Task<IEnumerable<AirHumidityDto>> GetAirHumidityAsync();
    Task<AirHumidityDto?> GetAirHumidityByIdAsync(int id);
    
}