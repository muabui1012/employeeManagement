using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IEmployeeRepository: IBaseRepository<Employee>
    {
        Employee GetByCode(string code);

        Employee GetWithFilter(int pageSize, int pageNumber, string employeeFilter, string departmentId, string positionId);

        string GetNewEmployeeCode();

    }
}
