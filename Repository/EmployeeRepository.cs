using ConnectApi.Models;

namespace ConnectApi.Repository
{
	public class EmployeeRepository : IEmplyeeRepository
	{
		ITIEntity context;

		public EmployeeRepository(ITIEntity db)
		{
			context = db;
		}


		public List<Employee> GetAll() {
			List<Employee> employees = context.Employees.ToList();

			return employees;
		
		}


		public Employee GetById(int id) {
			
			Employee employee = context.Employees.FirstOrDefault(x => x.Id == id);
			return employee;

		}
	}
}
