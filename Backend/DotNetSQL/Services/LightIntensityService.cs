using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;
using DotNetSQL.IServices;

namespace DotNetSQL.Services
{
    public class LightIntensityService : ILightIntensityService
    {
        private readonly AppDbContext _context;
    
        public LightIntensityService(AppDbContext context)
        {
            _context = context;
        }
    
        public async Task<IEnumerable<LightIntensityDTO>> GetAllLightIntensitiesAsync()
        {
            return await _context.MeasurementData.Select(q => new LightIntensityDTO{
                Id = q.Id,
                LightIntensity = q.LightIntensity,
                Timestamp = q.Timestamp,
            }).ToListAsync();
        }
    
        public async Task<LightIntensityDTO?> GetLightIntensityByIdAsync(int id)
        {
            return await _context.MeasurementData.Where(q => q.Id == id).Select(q => new LightIntensityDTO{
                Id = q.Id,
                LightIntensity = q.LightIntensity,
                Timestamp = q.Timestamp,
            }).FirstOrDefaultAsync();
        }
    }
}