using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;



using MISA.CUKUK.NGHIA.Api.Entities;



namespace MISA.CUKUK.NGHIA.Api.Controllers
{
    /// <summary>
    /// Department controller
    /// Author: Nghia (04/08/2024)
    /// </summary>
    [Route("api/v1/departments")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        /// <summary>
        /// Get all departments
        /// Author: Nghia (04/08/2024)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetDepartments()
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

                var sql = "SELECT * FROM Department";

                try
                {
                    var departments = connection.Query<Department>(sql);
                    return StatusCode(200, departments);
                }
                catch (System.Exception)
                {
                    return StatusCode(500, "There was an error when get");

                }
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
            
        }

        /// <summary>
        /// Get department by id
        /// Author: Nghia (04/08/2024)
        /// </summary>
        /// <param name="departmentId"></param>
        /// <returns></returns>
        [HttpGet("{departmentId}")]
        public IActionResult GetDepartmentById(string departmentId)
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

                var sql = "SELECT * FROM Department WHERE DepartmentId = @departmentId";

                var parameter = new { departmentId = departmentId };

                var department = connection.Query<Department>(sql, parameter);

                if (department.Any())
                {
                    return StatusCode(200, department.First());
                } else
                {
                    return StatusCode(204);
                }
                
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// validate department
        /// </summary>
        /// <param name="department"></param>
        /// <param name="errorList"></param>
        /// <returns></returns>
        private bool validateDepartment(Department department, List<string> errorList)
        {
            if (department.DepartmentName == string.Empty)
            {
                errorList.Add("Department name is required");
                return false;
            }

            
            return true;
        }

        /// <summary>
        /// Add new department
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult InsertDepartment([FromBody]Department department)
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

                List<string> errorList = [];

                if (!validateDepartment(department, errorList))
                {
                    return StatusCode(400, errorList);
                }
                else
                {
                    string sql = "INSERT INTO Department(DepartmentId, DepartmentName, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate) VALUES(UUID(), @DepartmentName, @CreatedBy, @CreatedDate, @ModifiedBy, @ModifiedDate)";
                    var parameter = new { 
                        DepartmentName = department.DepartmentName,
                        CreatedBy = "Nghia",
                        CreatedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), 
                        ModifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), 
                        ModifiedBy = "Nghia"
                    };
                    try
                    {
                        connection.Execute(sql, parameter);
                    }
                    catch (System.Exception)
                    {
                        return StatusCode(500, "There was an error when insert");
                    }
                    return Ok("Inserted");
                }
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }

        }

        /// <summary>
        /// Update department
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult UpdateDepartment([FromBody] Department department)
        {
            List<string> errorList = [];
            if (!validateDepartment(department, errorList))
            {
                return StatusCode(400, errorList);
            }
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
                string sql = "UPDATE Department SET DepartmentName = @DepartmentName, ModifiedBy = @ModifiedBy, ModifiedDate = @ModifiedDate WHERE DepartmentId = @DepartmentId";
                var parameter = new
                {
                    DepartmentId = department.DepartmentId,
                    DepartmentName = department.DepartmentName,
                    ModifiedBy = "Nghia",
                    ModifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                };
                try
                {
                    connection.Execute(sql, parameter);
                    return Ok("Updated");
                } 
                catch (System.Exception)
                {
                    return StatusCode(404, "Department not found");
                }
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }

        }

        /// <summary>
        /// Delete department
        /// Author: Nghia (04/08/2024)
        /// </summary>
        /// <param name="departmentId"></param>
        /// <returns></returns>
        [HttpDelete("{departmentId}")]
        public IActionResult DeleteEmployee(string departmentId)
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

                string sql = "DELETE FROM Department WHERE DepartmentId = @departmentId";

                var parameter = new { departmentId = departmentId };

                try
                {
                    connection.Execute(sql, parameter);
                    
                }
                catch (System.Exception)
                {
                    return StatusCode(500, "There was an error when delete");
                }
                return StatusCode(204, "Deleted");
            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }

    
}
