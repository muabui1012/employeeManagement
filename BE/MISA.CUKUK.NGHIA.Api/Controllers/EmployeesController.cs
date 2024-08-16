using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using System;
using MISA.CUKUK.NGHIA.Core.Entities;
using System.Reflection.Metadata;

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
                string connectionString =
                    "Host=8.222.228.150;" +
                    "Port=3306;" +
                    "User Id=manhnv;" +
                    "Password=12345678;" +
                    "Database=UET_21020472_DaoXuanNghia";
                    
                
                var connection = new MySqlConnection(connectionString);

                var sql = "SELECT * FROM Employee";

                var employees = connection.Query<Employee>(sql);

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

                var connection = new MySqlConnection(connectionString);

                var sql = "SELECT * FROM Employee WHERE EmployeeId = @EmployeeId";

                var paramater = new { EmployeeId = employeeId };

                var employee = connection.Query<Employee>(sql, paramater);

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


        /// <summary>
        /// validate field of employee
        /// </summary>
        /// <param name="employee"></param>
        /// <param name="errorList"></param>
        /// <returns></returns>
        public static bool validateFieldEmployee(Employee employee, List<string> errorList)
        {
            if (employee.FullName == null || employee.FullName == "")
            {
                errorList.Add("Full name is required");
                return false;
            }

            if (employee.EmployeeCode == null || employee.EmployeeCode == "")
            {
                errorList.Add("Employee code is required");
                return false;
            }


            if (employee.DepartmentId == Guid.Empty)
            {
                errorList.Add("Department is required");
                return false;
            }

            if (employee.PositionId == Guid.Empty)
            {
                errorList.Add("Position is required");
                return false;
            }

            return true;
        }

        public static Employee getEmployee(Guid employeeId)
        {
            string connectionString =
                    "Host=8.222.228.150;" +
                    "Port=3306;" +
                    "User Id=manhnv;" +
                    "Password=12345678;" +
                    "Database=UET_21020472_DaoXuanNghia";
            ;

            var connection = new MySqlConnection(connectionString);

            var sql = "SELECT * FROM Employee WHERE EmployeeId = @EmployeeId";

            var paramater = new { EmployeeId = employeeId };

            var employee = connection.Query<Employee>(sql, paramater);

            if (employee.Any())
            {
                return employee.First();

            }
            return null;
        }


        public static bool employeeCodeCheck(string employeeCode, List<string> errorList)
        {
            string connectionString =
                  "Host=8.222.228.150;" +
                  "Port=3306;" +
                  "User Id=manhnv;" +
                  "Password=12345678;" +
                  "Database=UET_21020472_DaoXuanNghia";
            ;

            var connection = new MySqlConnection(connectionString);

            var sql = "SELECT * FROM Employee WHERE EmployeeCode = @EmployeeCode";

            var paramater = new { EmployeeCode = employeeCode };
            try
            {
                var employee = connection.Query<Employee>(sql, paramater);

                if (employee.Any())
                {
                    errorList.Add("Employee code is existed");
                    return false;
                }
            }
            catch (System.Exception)
            {
                return false;
            }   
            return true;

        }

        /// <summary>
        /// validate data of employee
        /// </summary>
        /// <param name="employee"></param>
        /// <param name="errorList"></param>
        /// <returns></returns>
        public static bool validateDataEmployee(Employee employee, List<string> errorList)
        {

            if (employee.DateOfBirth > DateTime.Now)
            {
                errorList.Add("Date of birth is not valid");
                return false;
            }

            if (employee.NationalityIdDate > DateTime.Now)
            {
                errorList.Add("NationalIdDate is not valid");

            }

            string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            if (!System.Text.RegularExpressions.Regex.IsMatch(employee.Email, emailPattern))
            {
                errorList.Add("Email is not valid");
                return false;
            }
           
            return true;
        }


        private static (string FirstName, string Lastname) splitFullName(string fullName)
        {
            if (string.IsNullOrEmpty(fullName))
            {
                return ("", "");
            }
            string[] names = fullName.Split(" ");
            string firstName = names[0];
            string lastName = string.Join(" ", names, 1, names.Length - 1); ;
            return (firstName, lastName);
        }

        [HttpPost]
        public IActionResult InsertEmployee(Employee employee)
        {
           
            try
            {
                

                
               


                

               
              

            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }

            return StatusCode(201, "Inserted");
        }

        [HttpPut]
        public IActionResult UpdateEmployee([FromBody] Employee employee)
        {
            
            List<string> errorList = new List<string>();
            Employee oldEmployee = getEmployee(employee.EmployeeId);
            if (oldEmployee == null)
            {
                return StatusCode(404, "Employee not found");
            }
            bool changed = false;

            if (!object.Equals(employee.EmployeeCode, oldEmployee.EmployeeCode))
            {
                changed = true;
                errorList.Add("You can not change the EmployeeCode");
            }

            if (!validateDataEmployee(employee, errorList) || changed)
            {
                return StatusCode(400, String.Join("\n", errorList));
            }

            try
            {
                string connectionString =
                  "Host=8.222.228.150;" +
                  "Port=3306;" +
                  "User Id=manhnv;" +
                  "Password=12345678;" +
                  "Database=UET_21020472_DaoXuanNghia";
                var connection = new MySqlConnection(connectionString);

                var sql =   "UPDATE Employee SET " +
                            "DepartmentId = @DepartmentId, " +
                            "PositionId = @PositionId, " +
                            "ModifiedBy = @ModifiedBy, " +
                            "ModifiedDate = @ModifiedDate, " +
                            "FullName = @FullName, " +
                            "FirstName = @FirstName, " +
                            "LastName = @LastName, " +
                            "DateOfBirth = @DateOfBirth, " +
                            "NationalityId = @NationalityId, " +
                            "NationalityIdDate = @NationalityIdDate, " +
                            "NationalityIdPlace = @NationalityIdPlace, " +
                            "Gender = @Gender, " +
                            "Address = @Address, " +
                            "MobilePhoneNumber = @MobilePhoneNumber, " +
                            "TelephoneNumber = @TelephoneNumber, " +
                            "Email = @Email, " +
                            "BankAccount = @BankAccount, " +
                            "BankName = @BankName, " +
                            "BankBranch = @BankBranch " +
                            "WHERE EmployeeId = @EmployeeId";

                var parameter = new
                {
                    employee.DepartmentId,
                    employee.PositionId,
                    ModifiedBy = "Nghia",
                    ModifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                    employee.FullName,
                    splitFullName(employee.FullName).FirstName,
                    splitFullName(employee.FullName).Lastname,
                    employee.DateOfBirth,
                    employee.NationalityId,
                    employee.NationalityIdDate,
                    employee.NationalityIdPlace,
                    employee.Gender,
                    employee.Address,
                    employee.MobilePhoneNumber,
                    employee.TelephoneNumber,
                    employee.Email,
                    employee.BankAccount,
                    employee.BankName,
                    employee.BankBranch,
                    employee.EmployeeId


                };
              
                try
                {
                    connection.Execute(sql, parameter);

                } catch (System.Exception e)
                {
                    return StatusCode(500, "ALDKALKD" + e);
                }

                return StatusCode(200, "Updated");
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
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

                var parameter = new {employeeId = employeeId.ToString()};

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
