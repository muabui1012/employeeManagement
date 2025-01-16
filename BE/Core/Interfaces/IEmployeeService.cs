using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTOs;
using Core.Entities;


namespace Core.Interfaces
{
    public interface IEmployeeService: IBaseService<Employee>
    {
       
        public object filter(List<Employee> employees, EmployeeFilter employeeFilter);
    }
}
