using MISA.CUKUK.NGHIA.Core.DTOs;
using MISA.CUKUK.NGHIA.Core.Entities;
using MISA.CUKUK.NGHIA.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKUK.NGHIA.Core.Services
{
    public class EmployeeService : IEmployeeService
    {
        IEmployeeRepository employeeRepository;
        public EmployeeService(IEmployeeRepository repository)
        {
            employeeRepository = repository;
        }
        public object InsertService(Employee entity)
        {
            
            Employee existeds = employeeRepository.GetByCode(entity.EmployeeCode);

            if (existeds != null)
            {
                return new ServiceResult
                {
                    Success = false,
                    Message = "Mã nhân viên đã tồn tại"
                };
            }


            return new ServiceResult
            {
                Success = true,
                Data = entity
            };

        }
    }

}
