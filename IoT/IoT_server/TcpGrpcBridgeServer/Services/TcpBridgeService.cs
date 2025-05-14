using Grpc.Core;
using TcpGrpcBridgeServer.Protos;
using System.Text;

namespace TcpGrpcBridgeServer.Services;

public class TcpBridgeService : WaterPump.WaterPumpBase
{
    public override async Task<MessageReply> QueueWatering(Plant request, ServerCallContext context)
    {
        int message = request.PlantId;
        byte[] data = Encoding.ASCII.GetBytes(message + "\n");

        await TcpServer.SendMessageToTcpClientsAsync(message.ToString());

        return new MessageReply
        {
            Status = $"Message sent to TCP clients: {message}"
        }; }
}
