namespace DotNetSQL.GrpcClient
{
    public interface IGrpcClientManager
    {
        Task<string> IrrigationControl(int id);
    }
}