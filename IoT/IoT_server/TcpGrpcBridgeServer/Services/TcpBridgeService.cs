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
        int sentCount = 0;

        foreach (var stream in TcpClientManager.ConnectedClients)
        {
            try
            {
                await stream.WriteAsync(data);
                sentCount++;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send to a TCP client: {ex.Message}");
            }
        }

        return new MessageReply { Status = $"Message sent to {sentCount} TCP client(s)." };
    }
}
