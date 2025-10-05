using ConnectApi.Models;

namespace ConnectApi.Repository
{
	public interface IMessageRepository
	{
		Task<Message> storeMessage(Message message);
		Task<List<Message>> GetUnreadMessages(string userId);

		Task<Conversation> GetOrCreateConversation(string user1Id, string user2Id);
		Task<List<Message>> GetMessagesOfUser(string user1Id);
	}
}
