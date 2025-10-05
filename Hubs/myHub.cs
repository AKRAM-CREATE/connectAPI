using ConnectApi.Models;
using Microsoft.AspNetCore.SignalR;
using ConnectApi.DTO;
using ConnectApi.Repository;
using Microsoft.AspNetCore.Authorization;


namespace ConnectApi.Hubs
{
	
	public class myHub : Hub
	{

		private readonly IMessageRepository _messageRepository;

		public myHub(IMessageRepository messageRepository)
		{
			_messageRepository = messageRepository;
		}

		public async Task SendMessage(ChatDTO dto)
		{
			var userId = Context.UserIdentifier;
			Console.WriteLine($"userid SendMessage: {userId}");

			var conversation = await _messageRepository.GetOrCreateConversation(dto.senderId, dto.receiverId);

			// Step 2: create message linked to that conversation
			var msg = new Message
			{
				userName = dto.userName,
				SenderId = dto.senderId,
				ReceiverId = dto.receiverId,
				Content = dto.message,
				SentAt = DateTime.UtcNow,
				IsRead = false,
				ConversationId = conversation.Id  // ✅
			};

			var savedMessage = await _messageRepository.storeMessage(msg);
		

			var response = new
			{
				Id = savedMessage.Id,
				receiverId = dto.receiverId,
				senderId = savedMessage.SenderId,
				userName = dto.userName,
				message = savedMessage.Content,
				sentAt = savedMessage.SentAt
			};

			// ✅ Send to the receiver only
			await Clients.User(dto.receiverId).SendAsync("ReceiveMessage", response);

			// ✅ Also send back to the sender so they see their own message
			await Clients.Caller.SendAsync("ReceiveMessage", response);
		}

		public async Task LoadConversation(string userId)
		{

			var messages = await _messageRepository.GetMessagesOfUser(userId);

			var formattedMessages = messages.Select(msg => new
			{
				Id = msg.Id,
				senderId = msg.SenderId,
				receiverId = msg.ReceiverId,
				message = msg.Content,
				sentAt = msg.SentAt,
				userName = msg.userName,
			}).ToList();

			await Clients.Caller.SendAsync("ReceiveMessagesBatch", formattedMessages);
		}

		//public override Task OnConnectedAsync()
		//{
		//	var userId = Context.UserIdentifier;
		//	Console.WriteLine($"userid : {userId}");
		//	Console.WriteLine($"Connected: {Context.UserIdentifier}");
		//	return base.OnConnectedAsync();
		//}


		//public override async Task OnConnectedAsync()
		//{
		//	var userId = Context.UserIdentifier; // This is how SignalR identifies the logged-in user

		//	if (!string.IsNullOrEmpty(userId))
		//	{
		//		var unreadMessages = await _messageRepository.GetUnreadMessages(userId);

		//		foreach (var msg in unreadMessages)
		//		{
		//			await Clients.Caller.SendAsync("ReceiveMessage", new
		//			{
		//				Id = msg.Id,
		//				senderId = msg.SenderId,
		//				message = msg.Content,
		//				sentAt = msg.SentAt,
		//				userName = msg.userName,
		//			});

		//			msg.IsRead = true;
		//		}
		//	}

		//	await base.OnConnectedAsync();
		//}

	}


}
