# TcpGrpcBridgeServer

A C# .NET-based server that acts as a **bridge between a gRPC client** and **Arduino devices connected via TCP sockets**. 
It allows sending commands from gRPC to Arduinos and logs sensor data (like temperature, humidity, light, and soil moisture) received from them into an Azure SQL Database.

## 🌐 Architecture Overview

```
\[gRPC Client] ---> \[gRPC Service] ---> \[TcpGrpcBridgeServer] ---> \[Arduino TCP Clients]
                                              |
                                              +--> \[Azure SQL Database]
```

## Features

- Receives commands from gRPC clients
- Forwards commands to all connected Arduino TCP clients
- Parses sensor data from Arduino
- Inserts validated data into Azure SQL Database
- Handles multiple TCP clients concurrently

## Technologies Used

- **.NET 9**
- **gRPC**
- **TCP/IP Sockets**
- **Azure SQL Database**
- **C# / ASP.NET Core**




### Build & Run the Server

bash
- dotnet build
- dotnet run


## Testing Tips

* Use [BloomRPC](https://github.com/bloomrpc/bloomrpc) to send gRPC commands
* Use Hercules to test TCP connectivity



## ✍️ Author

**Bibek**
Student, Software Technology Engineering
VIA University College
