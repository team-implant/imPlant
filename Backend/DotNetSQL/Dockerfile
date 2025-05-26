# 1) Runtime base image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

# 2) Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy only the csproj first (for layer caching)
COPY DotNetSQL.csproj ./

RUN dotnet restore "./DotNetSQL.csproj"

# Copy the rest of your source code
COPY . .

# Publish into /app/publish
RUN dotnet publish "DotNetSQL.csproj" -c Release -o /app/publish

# 3) Final stage
FROM base AS final
WORKDIR /app

# Copy the published output
COPY --from=build /app/publish .

# Launch your app
ENTRYPOINT ["dotnet", "DotNetSQL.dll"]
