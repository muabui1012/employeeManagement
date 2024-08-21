using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.CUKCUK.NGHIA.Core.DTOs;
using MISA.CUKUK.NGHIA.Core.Entities;


namespace MISA.CUKUK.NGHIA.Core.Interfaces
{
    public interface IEmployeeService: IBaseService<Employee>
    {
       
        public object filter(List<Employee> employees, EmployeeFilter employeeFilter);
    }
}
