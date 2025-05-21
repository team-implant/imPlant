using DotNetSQL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IPlantService
{
    Task<IEnumerable<Plant>> GetAllPlantsAsync();
    Task<Plant?> GetPlantByIdAsync(int id);
    Task<Plant?> GetPlantByNameAsync(string name);
}
