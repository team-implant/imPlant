namespace DotNetSQL.GrpcClient;

using DotNetSQL.Protos;
using Grpc.Core;
using Grpc.Net.Client;

public class GrpcClientManager : IGrpcClientManager
{
    private GrpcChannel channel;
    private WaterPump.WaterPumpClient grpcService;
    

    public GrpcClientManager()
    {
        channel = GrpcChannel.ForAddress("http://localhost:5000");
        grpcService = new WaterPump.WaterPumpClient(channel);
    }
    
    public async Task<string> IrrigationControl(int id){
        Plant request = new (){
            PlantId = id
        };

        MessageReply reply = await grpcService.QueueWateringAsync(request);

        return reply.Status;

    }

}