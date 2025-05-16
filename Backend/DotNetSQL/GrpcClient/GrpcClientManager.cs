namespace DotNetSQL.GrpcClient;


using Grpc.Net.Client;
using DotNetSQL.Protos;
using Grpc.Core;

public class GrpcClientManager : IGrpcClientManager
{
    private GrpcChannel channel;

    private GreenHouse.GreenHouseClient grpcService;
    

//initializes the grpc connection to the server and the used service
    public GrpcClientManager()
    {
        channel = GrpcChannel.ForAddress("http://localhost:5000");
        grpcService = new GreenHouse.GreenHouseClient(channel);
    }
    
    //calling the grpc method from the service
    public async Task<string> GreenHouseControl(int id)
    {
        GreenHouseAction request = new()
        {
            ActionId = id
        };

        MessageReply reply = await grpcService.TriggerActionAsync(request);

        return reply.Status;

    }

}