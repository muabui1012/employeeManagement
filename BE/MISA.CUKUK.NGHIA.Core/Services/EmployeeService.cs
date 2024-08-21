using MISA.CUKCUK.NGHIA.Core.DTOs;
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


        /// <summary>
        /// //Hàm lọc d
        /// '
        /// </summary>
        /// <param name="employees">List nhân viên</param>
        /// <param name="employeeFilter">Danh sách các tham số lọc</param>
        /// <returns></returns>
        public object filter(List<Employee> employees, EmployeeFilter employeeFilter)
        {
            if (employeeFilter.EmployeeCode != null)
            {
                employees = employees.Where(e => e.EmployeeCode.Contains(employeeFilter.EmployeeCode)).ToList();
            }

            if (employeeFilter.FullName != null)
            {
                employees = employees.Where(e => e.FullName.Contains(employeeFilter.FullName)).ToList();
            }

            if (employeeFilter.DepartmentId != null)
            {
                employees = employees.Where(e => e.DepartmentId == employeeFilter.DepartmentId).ToList();
            }

            if (employeeFilter.PositionId != null)
            {
                employees = employees.Where(e => e.PositionId == employeeFilter.PositionId).ToList();
            }

            if (employeeFilter.EmployeeId != null)
            {
                employees = employees.Where(e => e.EmployeeId == employeeFilter.EmployeeId).ToList();
            }
            

            if (employeeFilter.PageSize != null)
            {
                PagedData<Employee> pagedData = new PagedData<Employee>(employees, (int)employeeFilter.PageSize);

                if (employeeFilter.PageNumber != null)
                {
                    SinglePageData singlePageData = new()
                    {
                        TotalPage = pagedData.TotalPageNumber,
                        TotalRecord = employees.Count,
                        PageSize = (int)employeeFilter.PageSize,
                        PageNumber = (int)employeeFilter.PageNumber,
                        Data = pagedData.Data[(int)employeeFilter.PageNumber - 1]
                    };
                    return singlePageData;
                }

                return pagedData;
            }
            
            return employees;
        }

        /// <summary>
        /// Hàm kiểm tra dữ liệu trước khi thêm
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
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
