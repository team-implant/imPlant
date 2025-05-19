namespace DotNetSQL.GrpcClient
{
    public interface IGrpcClientManager
    {
        Task<string> GreenHouseControl(int id);
    }
}