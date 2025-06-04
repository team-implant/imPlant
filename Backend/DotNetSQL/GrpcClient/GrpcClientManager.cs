namespace DotNetSQL.GrpcClient;


using Grpc.Net.Client;
using DotNetSQL.Protos;
using Grpc.Core;

public class GrpcClientManager : IGrpcClientManager
{
    private GrpcChannel channel;
    private WaterPump.WaterPumpClient grpcService;
    

//initializes the grpc connection to the server and the used service
    public GrpcClientManager()
    {
        channel = GrpcChannel.ForAddress("http://iot_server:5000");
        grpcService = new WaterPump.WaterPumpClient(channel);
    }
    
    public async Task<string> IrrigationControl(int id){
        Plant request = new()
        {
            PlantId = id
        };
    //calling the grpc method from the service

        MessageReply reply = await grpcService.QueueWateringAsync(request);

        return reply.Status;

    }

}
