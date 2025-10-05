using ConnectApi.Models;

namespace ConnectApi.Repository
{
	public interface IConversationRepository
	{
		Task<List<Conversation>> GetConversationUsersWith(string userId);
	}
}
