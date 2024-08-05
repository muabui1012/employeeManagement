using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using System;
using MISA.CUKUK.NGHIA.Api.Entities;

namespace MISA.CUKUK.NGHIA.Api.Controllers
{
    /// <summary>
    /// Employee controller
    /// Author: Nghia (03/08/2024)
    /// </summary>
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        /// <summary>
        /// Danh sách nhân viên
        /// Author: Nghia (03/08/2024)
        /// </summary>
        /// <returns>List gồm thông tin các nhân viên</returns>
        [HttpGet]
        public IActionResult GetEmployees()
        {   
            try
            {
                string connectionString =
                    "Host=8.222.228.150;" +
                    "Port=3306;" +
                    "User Id=manhnv;" +
                    "Password=12345678;" +
                    "Database=UET_21020472_DaoXuanNghia";
                    ;
                
                var connection = new MySqlConnection(connectionString);

                var sql = "SELECT * FROM Employee";

                var employees = connection.Query<Employee>(sql);
            
                System.Console.WriteLine(string.Join("/n", employees));

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
                string connectionString =
                    "Host=8.222.228.150;" +
                    "Port=3306;" +
                    "User Id=manhnv;" +
                    "Password=12345678;" +
                    "Database=UET_21020472_DaoXuanNghia";
                ;

                System.Console.WriteLine("Hello");

                var connection = new MySqlConnection(connectionString);

                var sql = "SELECT * FROM Employee WHERE EmployeeId = @EmployeeId";

                var paramater = new { EmployeeId = employeeId };

                var employee = connection.Query<Employee>(sql, paramater);

                System.Console.WriteLine(string.Join("/n", employee));

                if (employee.Any())
                {
                    return Ok(employee.First());
                    
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
        public IActionResult InsertEmployee()
        {
            return Ok("Insert employee");
        }

        [HttpPut("{employeeId}")]
        public IActionResult UpdateEmployee(Guid employeeId)
        {
            return Ok("Update employee");
        }

        [HttpDelete("{employeeId}")]
        public IActionResult DeleteEmployee(string employeeId)
        {
            try
            {
                string connectionString =
                    "Host=8.222.228.150;" +
                    "Port=3306;" +
                    "User Id=manhnv;" +
                    "Password=12345678;" +
                    "Database=UET_21020472_DaoXuanNghia";
                ;

                var connection = new MySqlConnection(connectionString);

                string sql = "DELETE FROM Employee WHERE EmployeeId = @employeeId";

                var parameter = new {employeeId = employeeId};

                try {       
                    connection.Execute(sql, parameter);
                    return StatusCode(204, "Deleted");
                }
                catch (System.Exception)
                {
                    return StatusCode(500, "There was an error when deleting");
                }

            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
