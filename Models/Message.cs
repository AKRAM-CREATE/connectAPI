using Microsoft.AspNetCore.Identity;

namespace ConnectApi.Models
{
	public class Message
	{
		public int Id { get; set; }   // Primary key

		// Foreign key to Sender
		public string userName { get; set; }
		public string SenderId { get; set; }
		public ApplicationUser Sender { get; set; }   // Navigation property

		// Foreign key to Receiver
		public string ReceiverId { get; set; }
		public ApplicationUser Receiver { get; set; } // Navigation property

		// The message body
		public string Content { get; set; }

		// Metadata
		public DateTime SentAt { get; set; } = DateTime.UtcNow;
		public bool IsRead { get; set; } = false;  // unread / read state

		public int ConversationId { get; set; }
		public Conversation Conversation { get; set; }
	}
}
