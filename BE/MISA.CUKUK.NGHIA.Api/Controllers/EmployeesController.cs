using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using System;
using MISA.CUKUK.NGHIA.Api.Entities;

namespace MISA.CUKUK.NGHIA.Api.Controllers
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
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

        [HttpGet("{employeeId}")]
        public IActionResult GetEmployeeById(int employeeId)
        {
            return Ok("Get employee by id");
        }

        [HttpPost]
        public IActionResult InsertEmployee()
        {
            return Ok("Insert employee");
        }

        [HttpPut("{employeeId}")]
        public IActionResult UpdateEmployee(int employeeId)
        {
            return Ok("Update employee");
        }

        [HttpDelete("{employeeId}")]
        public IActionResult DeleteEmployee(int employeeId)
        {
            return Ok("Delete employee");
        }
    }
}
