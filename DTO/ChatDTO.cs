namespace ConnectApi.DTO
{
	public class ChatDTO
	{
		public string senderId { get; set; }
		public string receiverId { get; set; }
		public string message { get; set; }  // <-- matches frontend
		public string userName { get; set; }
		public string receiverUsername { get; set; }
	}
}
