namespace DefaultNamespace;

public interface ILightIntensityService
{
    Task<IEnumerable<LightIntensityDTO>> GetAllLightIntensitiesAsync();
    Task<LightIntensityDTO?> GetLightIntensityByIdAsync(int id);
}