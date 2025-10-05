namespace ConnectApi.DTO
{
	public class UploadImageDTO
	{
		public string UserId { get; set; } // or get from JWT claims
		public IFormFile ProfileImageUrl { get; set; }
	}
}
