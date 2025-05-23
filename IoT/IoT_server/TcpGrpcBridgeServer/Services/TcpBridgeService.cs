using Grpc.Core;
using TcpGrpcBridgeServer.Protos;
using System.Text;
using TcpGrpcBridgeServer.Network;

namespace TcpGrpcBridgeServer.Services;

public class TcpBridgeService : WaterPump.WaterPumpBase
{
    private readonly ITcpSender _tcpSender;

    public TcpBridgeService(ITcpSender tcpSender)
    {
        _tcpSender = tcpSender;
    }

    public override async Task<MessageReply> QueueWatering(Plant request, ServerCallContext context)
    {
        int message = request.PlantId;
        await _tcpSender.SendMessageAsync(message.ToString());

        return new MessageReply
        {
            Status = $"Message sent to TCP clients: {message}"
        };
    }
}

