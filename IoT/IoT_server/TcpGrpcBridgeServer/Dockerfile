# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy and restore
COPY *.sln .
COPY TcpGrpcBridgeServer.csproj ./
RUN dotnet restore

# Copy all source and build
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 5000 23
ENTRYPOINT ["dotnet", "TcpGrpcBridgeServer.dll"]
