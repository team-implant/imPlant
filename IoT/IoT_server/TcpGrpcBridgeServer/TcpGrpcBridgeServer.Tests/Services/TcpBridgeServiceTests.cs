using Moq;
using System.Threading.Tasks;
using TcpGrpcBridgeServer.Services;
using TcpGrpcBridgeServer.Protos;
using Grpc.Core;
using Xunit;

public class TcpBridgeServiceTests
{
    [Fact]
    public async Task QueueWatering_SendsCorrectMessageAndReturnsSuccess()
    {
        // Arrange
        var mockSender = new Mock<ITcpSender>();
        var service = new TcpBridgeService(mockSender.Object);
        var plant = new Plant { PlantId = 42 };
        var context = TestServerCallContext.Create();

        // Act
        var response = await service.QueueWatering(plant, context);

        // Assert
        mockSender.Verify(s => s.SendMessageAsync("42"), Times.Once);
        Assert.Equal("Message sent to TCP clients: 42", response.Status);
    }
}
