using ConnectApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ConnectApi.Repository
{
	public class ConversationRepository : IConversationRepository
	{
		ITIEntity context;

		public ConversationRepository(ITIEntity context) {
		
			this.context = context;
		}
		public async Task<List<Conversation>> GetConversationUsersWith(string userId)
		{
			var conversations = await context.Conversations
				.Where(c => c.User1Id == userId || c.User2Id == userId)
				.ToListAsync();

			return conversations;
		}

	}
}
