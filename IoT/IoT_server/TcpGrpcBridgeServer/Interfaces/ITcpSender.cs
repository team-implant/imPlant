public interface ITcpSender
{
    Task SendMessageAsync(string message);
}
