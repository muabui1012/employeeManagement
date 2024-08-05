using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;

using MISA.CUKUK.NGHIA.Api.Entities;
using System.Linq.Expressions;


namespace MISA.CUKUK.NGHIA.Api.Controllers
{
    [Route("api/v1/positions")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
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

                var sql = "SELECT * FROM `Position`";

                var positions = connection.Query<Position>(sql);

                return StatusCode(200, positions);

            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost]
        public IActionResult InsertPosition([FromBody] Position position)
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

                string sql = "INSERT INTO `Position`(PositionId, PositionName, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate) VALUES(UUID(), @positionName, @createdBy, @createdDate, @modifiedBy, @modifiedDate)";
                
                var parameter = new { 
                    positionName = position.PositionName, 
                    createdBy = "Nghia", 
                    createdDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), 
                    modifiedBy = "Nghia", 
                    modifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
                };

                System.Console.WriteLine(parameter.ToString());

                try
                {
                    connection.Execute(sql, parameter);
                    
                } 
                catch (System.Exception e)
                {
                    return StatusCode(500, e);
                }

            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
            return StatusCode(200, "Inserted");
        }


        [HttpPut]
        public IActionResult UpdatePosition([FromBody]Position position)
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

                string sql = "UPDATE `Position` SET PositionName = @positionname, ModifiedBy = @ModifiedBy, ModifiedDate = @ModifiedDate WHERE PositionId = @positionId";

                var parameter = new { 
                    positionId = position.PositionId, 
                    positionname = position.PositionName,
                    ModifiedBy = "Nghia",
                    ModifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
                };

                try
                {
                    connection.Execute(sql, parameter);
                }
                catch (System.Exception e)
                {
                    return StatusCode(500, e);
                }

            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }

            return Ok("Updated");
        }

        [HttpDelete("{positionId}")]
        public IActionResult DeletePosition(string positionId)
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

                string sql = "DELETE FROM Position WHERE PositionId = @positionid";

                var parameter = new { positionId = positionId };

                try
                {
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
