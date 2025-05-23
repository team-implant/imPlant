using Grpc.Core;

public class TestServerCallContext : ServerCallContext
{
    public static ServerCallContext Create()
    {
        return new TestServerCallContext();
    }

    protected override Task WriteResponseHeadersAsyncCore(Metadata responseHeaders) => Task.CompletedTask;

    // ⚠️ FIXED CS8765 + CS8603 — matching nullability of overridden method
#pragma warning disable CS8765 // Nullability of type of parameter doesn't match overridden member (possibly because of nullability attributes).
    protected override ContextPropagationToken CreatePropagationTokenCore(ContextPropagationOptions options)
#pragma warning restore CS8765 // Nullability of type of parameter doesn't match overridden member (possibly because of nullability attributes).
    {
        throw new NotImplementedException("ContextPropagationToken cannot be instantiated directly in tests.");
    }

    protected override string MethodCore => "TestMethod";
    protected override string HostCore => "localhost";
    protected override string PeerCore => "TestPeer";
    protected override DateTime DeadlineCore => DateTime.UtcNow.AddMinutes(1);
    protected override Metadata RequestHeadersCore => new Metadata();
    protected override CancellationToken CancellationTokenCore => CancellationToken.None;
    protected override Metadata ResponseTrailersCore => new Metadata();

    // ⚠️ FIXED CS8618 — initialize non-nullable auto-property
    protected override Status StatusCore { get; set; } = new Status(StatusCode.OK, "OK");

    // ⚠️ FIXED CS8618 — initialize or make nullable
#pragma warning disable CS8765 // Nullability of type of parameter doesn't match overridden member (possibly because of nullability attributes).
    protected override WriteOptions WriteOptionsCore { get; set; } = new WriteOptions();
#pragma warning restore CS8765 // Nullability of type of parameter doesn't match overridden member (possibly because of nullability attributes).

    // ⚠️ FIXED CS8603 — return dummy AuthContext instead of null, or mark nullable
    protected override AuthContext AuthContextCore => new AuthContext("dummy-auth", new Dictionary<string, List<AuthProperty>>());
}
