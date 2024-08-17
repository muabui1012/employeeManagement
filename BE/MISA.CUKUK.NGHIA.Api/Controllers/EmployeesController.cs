using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using System;
using MISA.CUKUK.NGHIA.Core.Entities;
using System.Reflection.Metadata;
using MISA.CUKUK.NGHIA.Core.Interfaces;
using Microsoft.Extensions.Logging.Abstractions;
using MISA.CUKUK.NGHIA.Core.DTOs;
using MISA.CUKCUK.NGHIA.Core.DTOs;

namespace MISA.CUKUK.NGHIA.Api.Controllers
{
    /// <summary>
    /// Employee controller
    /// Author: Nghia (16/08/2024)
    /// </summary>
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        IEmployeeService employeeService;
        IEmployeeRepository employeeRepository;

        public EmployeesController(IEmployeeService service, IEmployeeRepository repository)
        {
            this.employeeService = service;
            this.employeeRepository = repository;
        }

        /// <summary>
        /// Danh sách nhân viên
        /// Author: Nghia (16/08/2024)
        /// </summary>
        /// <returns>List gồm thông tin các nhân viên</returns>
        [HttpGet]
        public IActionResult GetEmployees()
        {   
            try
            {
                var employees = employeeRepository.Get();

                if (employees.Count == 0)
                {
                    return StatusCode(204, "No content");
                }

                return StatusCode(200, employees);

                
            } 
            catch (System.Exception e)
            {
                   return StatusCode(500, e);
                   
            }
                        
        }

        /// <summary>
        /// Lấy thông tin nhân viên theo id
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpGet("{employeeId}")]
        public IActionResult GetEmployeeById(string employeeId)
        {
            try
            {
                var employee = employeeRepository.GetById(employeeId);

                if (employee != null)
                {
                    return StatusCode(200, employee);
                    
                }
                else
                {
                    return StatusCode(204, "No content");
                }

            }
            catch (System.Exception e)
            {
                return StatusCode(404, e);
            }

        }


        [HttpPost]
        public IActionResult InsertEmployee(Employee employee)
        {
           
            try
            {
                ServiceResult validation = (ServiceResult)employeeService.InsertService(employee);
                
                if (!validation.Success)
                {
                    return StatusCode(409, validation.Message);
                }

                var result = employeeRepository.Insert(employee);

                return StatusCode(201, new
                {
                    Message = "Inserted",
                    EmployeeCode = employee.EmployeeCode
                });
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        [HttpPut]
        public IActionResult UpdateEmployee([FromBody] Employee employee)
        {
            try
            {
                var result = employeeRepository.Update(employee);
                
                if (result == 0)
                {
                    return StatusCode(400, "Invalid data");
                }

                return StatusCode(200, new
                {
                    Message = "Updated",
                    Employee = employee 
                });

            }
            catch (System.Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }


        [HttpDelete("{employeeId}")]
        public IActionResult DeleteEmployee(string employeeId)
        {
            try
            {
                var result = employeeRepository.Delete(employeeId);

                if (result != 0)
                {
                    return StatusCode(204, new
                    {
                        Message = "Deleted",
                        EmployeeId = employeeId
                    });
                } else
                {
                    return StatusCode(404, "Not found any employee with that EmployeeID");
                }

            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet("newEmployeeCode")]
        public IActionResult GetNewEmployeeCode()
        {
            try
            {
                var newEmployeeCode = employeeRepository.GetNewEmployeeCode();

                return StatusCode(200, newEmployeeCode);
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet("filter")]
        public IActionResult GetWithFilter([FromBody] EmployeeFilter employeeFilter)
        {
            try
            {
                var employees = employeeRepository.Get();

                var filteredEmployees = employeeService.filter(employees, employeeFilter);
                
                return StatusCode(200, filteredEmployees);
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
