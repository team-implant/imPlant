using DotNetSQL.DTOs;

namespace DotNetSQL.IServices
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterDto registerDto);

        Task<string?> LoginAsync(LoginDto loginDto);
    }

}