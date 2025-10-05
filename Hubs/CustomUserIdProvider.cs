using Microsoft.AspNetCore.SignalR;

public class CustomUserIdProvider : IUserIdProvider
{
	public string? GetUserId(HubConnectionContext connection)
	{
		// First try claim
		var claimId = connection.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
		if (!string.IsNullOrEmpty(claimId))
			return claimId;

		// Fallback: read from query string
		if (connection.GetHttpContext()?.Request.Query.TryGetValue("userId", out var qsId) == true)
		{
			return qsId;
		}

		return null;
	}
}
