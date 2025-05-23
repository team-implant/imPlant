using TcpGrpcBridgeServer.Network;

public class TcpSender : ITcpSender
{
    public async Task SendMessageAsync(string message)
    {
        await TcpServer.SendMessageToTcpClientsAsync(message);
    }
}
