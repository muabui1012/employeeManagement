﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using System;
using Core.Entities;
using System.Reflection.Metadata;
using Core.Interfaces;
using Microsoft.Extensions.Logging.Abstractions;
using Core.DTOs;
using Core.DTOs;
using Infrastructure.Repository;
using OfficeOpenXml;

namespace Api.Controllers
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
        IDepartmentRepository departmentRepository;

        public EmployeesController(IEmployeeService service, IEmployeeRepository repository)
        {
            this.employeeService = service;
            this.employeeRepository = repository;
            this.departmentRepository = new DepartmentRepository();
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
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
                   
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
                    ErrorMessage error = new ErrorMessage("Không tìm thấy bản ghi", "No content");
                    return StatusCode(204, "No content");
                }

            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(404, e);
            }

        }

        /// <summary>
        /// Thêm mơi nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>

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
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }

        }


        /// <summary>
        /// Sửa nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
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
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
        }

        /// <summary>
        /// Xoá nhân viên
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
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
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
        }


        /// <summary>
        /// Lấy mã nhân viên mới (khi thêm mới,mã nhân viên sẽ tự động tăng)    
        /// </summary>
        /// <returns></returns>
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
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
        }



        /// <summary>
        /// Get Employees with filter
        /// </summary>
        /// <param name="employeeId"></param>
        /// <param name="employeeCode"></param>
        /// <param name="positionId"></param>
        /// <param name="departmentId"></param>
        /// <param name="fullName"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet("filter")]
        public IActionResult GetWithFilter(
            [FromQuery(Name = "EmployeeId")] Guid? employeeId,
            [FromQuery(Name = "EmployeeCode")] string? employeeCode,
            [FromQuery(Name = "PositionId")] Guid? positionId,
            [FromQuery(Name = "DepartmentId")] Guid? departmentId,
            [FromQuery(Name = "FullName")] string? fullName,
            [FromQuery(Name = "PageNumber")] int? pageNumber,
            [FromQuery(Name = "PageSize")] int? pageSize
            
           
        )
        {
            try
            {

                EmployeeFilter employeeFilter = new EmployeeFilter()
                {
                    EmployeeId = employeeId,
                    EmployeeCode = employeeCode,
                    PositionId = positionId,
                    DepartmentId = departmentId,
                    FullName = fullName,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };

               
                var employees = employeeRepository.Get();

                var filteredEmployees = employeeService.filter(employees, employeeFilter);
                
                return StatusCode(200, filteredEmployees);
            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
        }


        [HttpGet("exportExcel")]
        public IActionResult Export()
        {
            try
            {
                var employees = employeeRepository.Get();

                var stream = new MemoryStream();

                using (var package = new ExcelPackage(stream))
                {
                    var workSheet = package.Workbook.Worksheets.Add("Sheet1");
                    workSheet.Cells.LoadFromCollection(employees, true);
                    package.Save();
                }

                stream.Position = 0;

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DanhSachNhanVien.xlsx");
            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
        }
    }

    
}
