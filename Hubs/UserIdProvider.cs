using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

public class UserIdProvider : IUserIdProvider
{
    public string GetUserId(HubConnectionContext connection)
    {
        // Return the user ID from JWT claim or Identity
        return connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}
