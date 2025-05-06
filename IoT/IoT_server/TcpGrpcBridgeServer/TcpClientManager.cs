using System.Collections.Concurrent;
using System.Net.Sockets;

namespace TcpGrpcBridgeServer;

public static class TcpClientManager
{
    public static ConcurrentBag<NetworkStream> ConnectedClients = new();
}
