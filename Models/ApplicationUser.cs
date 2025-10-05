using Microsoft.AspNetCore.Identity;

namespace ConnectApi.Models
{
	public class ApplicationUser : IdentityUser
	{
		public string? ProfileImageUrl { get; set; }
	}
}
