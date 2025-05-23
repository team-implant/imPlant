using System.Net;
using System.Net.Sockets;
using System.Net.NetworkInformation;

namespace TcpGrpcBridgeServer.Network
{
    public class TcpServer
    {
        public static List<TcpClient> ConnectedClients { get; } = new();

        public static async Task StartAsync()
        {
            Console.WriteLine("Starting TCP server...");

            IPAddress ipAddr = IPAddress.Any; // Default fallback

            foreach (NetworkInterface ni in NetworkInterface.GetAllNetworkInterfaces())
            {
                if ((ni.NetworkInterfaceType == NetworkInterfaceType.Wireless80211 ||
                    ni.NetworkInterfaceType == NetworkInterfaceType.Ethernet)
                    && ni.OperationalStatus == OperationalStatus.Up
                    && !ni.Name.ToLower().Contains("vethernet")
                    && !ni.Description.ToLower().Contains("virtual")
                    && !ni.Description.ToLower().Contains("hyper-v"))
                {
                    Console.WriteLine($"Interface: {ni.Name}");
                    foreach (UnicastIPAddressInformation ip in ni.GetIPProperties().UnicastAddresses)
                    {
                        if (ip.Address.AddressFamily == AddressFamily.InterNetwork)
                        {
                            ipAddr = ip.Address;
                            Console.WriteLine($"Selected IPv4 address: {ipAddr}");
                            goto DoneSelectingIP;
                        }
                    }
                }
            }

        DoneSelectingIP:

            Console.WriteLine("CREATING TCP LISTENER");
            TcpListener server = new TcpListener(ipAddr, 23);
            Console.WriteLine("THE SERVER WILL START SOON");

            try
            {
                server.Start();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error starting TCP server: " + ex.Message);
                return;
            }

            Console.WriteLine("THE SERVER HAS STARTED");
            Console.WriteLine($"TCP Server started at {ipAddr}:23...");

            while (true)
            {
                TcpClient client = await server.AcceptTcpClientAsync();
                string? remoteIp = client.Client.RemoteEndPoint != null ? ((IPEndPoint)client.Client.RemoteEndPoint).ToString() : "Unknown";
                Console.WriteLine($"TCP client connected from {remoteIp}");
                ConnectedClients.Add(client);
                _ = Task.Run(() => ClientHandler.HandleClientAsync(client));
            }
        }


        //send message to all connected TCP clients using gRPC
        public static async Task SendMessageToTcpClientsAsync(string message)
        {
            byte[] data = System.Text.Encoding.ASCII.GetBytes(message + "\n");

            foreach (var client in ConnectedClients.ToList())
            {
                try
                {
                    if (client.Connected)
                    {
                        NetworkStream stream = client.GetStream();
                        await stream.WriteAsync(data, 0, data.Length);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending to client: {ex.Message}");
                }
            }
        }
    }
}
