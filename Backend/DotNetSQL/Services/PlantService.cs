using DotNetSQL.Entities;
using DotNetSQL.EFC;
using DotNetSQL.IServices;
using Microsoft.EntityFrameworkCore;

public class PlantService : IPlantService
{
    private readonly AppDbContext _context;

    public PlantService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Plant>> GetAllPlantsAsync()
    {
        return await _context.Plants.ToListAsync();
    }

    public async Task<Plant?> GetPlantByIdAsync(int id)
    {
        return await _context.Plants.FindAsync(id);
    }

    public async Task<Plant?> GetPlantByNameAsync(string name)
    {
        return await _context.Plants.FirstOrDefaultAsync(p => p.Name == name);
    }
}
