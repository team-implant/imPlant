using Grpc.Core;
using TcpGrpcBridgeServer.Protos;
using System.Text;

namespace TcpGrpcBridgeServer.Services;

public class TcpBridgeService : TcpBridge.TcpBridgeBase
{
    public override async Task<MessageReply> SendMessage(MessageRequest request, ServerCallContext context)
    {
        string message = request.Content;
        byte[] data = Encoding.ASCII.GetBytes(message + "\n");

        await TcpServer.SendMessageToTcpClientsAsync(message);

        return new MessageReply
        {
            Status = $"Message sent to TCP clients: {message}"
        }; }
}
