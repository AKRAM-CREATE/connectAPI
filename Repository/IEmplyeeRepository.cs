using ConnectApi.Models;

namespace ConnectApi.Repository
{
	public interface IEmplyeeRepository
	{
		List<Employee> GetAll();

		Employee GetById(int id);
	}
}
