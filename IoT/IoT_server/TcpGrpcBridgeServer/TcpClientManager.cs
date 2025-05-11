using System.Collections.Concurrent;
using System.Net.Sockets;

namespace TcpGrpcServer;

public static class TcpClientManager
{
    public static ConcurrentBag<NetworkStream> ConnectedClients = new();
}