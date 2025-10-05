using ConnectApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ConnectApi.Repository
{
	public class MessageRepository : IMessageRepository
	{
		ITIEntity context;

		public MessageRepository(ITIEntity context)
		{
			this.context = context;
		}

		public async Task<Message> storeMessage(Message message)
		{
			context.Messages.Add(message);
			await context.SaveChangesAsync();
			return message;
		}

		public async Task<List<Message>> GetUnreadMessages(string userId)
		{
			return await context.Messages
				.Where(m => m.ReceiverId == userId )
				.OrderBy(m => m.SentAt)
				.ToListAsync();
		}

		public async Task<Conversation> GetOrCreateConversation(string user1Id, string user2Id)
		{
			var conversation = await context.Conversations
				.FirstOrDefaultAsync(c =>
					(c.User1Id == user1Id && c.User2Id == user2Id) ||
					(c.User1Id == user2Id && c.User2Id == user1Id));

			if (conversation == null)
			{
				conversation = new Conversation
				{
					User1Id = user1Id,
					User2Id = user2Id
				};
				context.Conversations.Add(conversation);
				await context.SaveChangesAsync();
			}

			return conversation;
		}


		public async Task<List<Message>> GetMessagesOfUser(string userId)
		{
			var conversations = await context.Conversations
	        .Where(c => c.User1Id == userId || c.User2Id == userId)
	        .Select(c => c.Id)
	          .ToListAsync();

			if (!conversations.Any())
				return new List<Message>();

			return await context.Messages
				.Where(m => conversations.Contains(m.ConversationId))
				.OrderBy(m => m.SentAt)
				.ToListAsync();
		}


	}
}
