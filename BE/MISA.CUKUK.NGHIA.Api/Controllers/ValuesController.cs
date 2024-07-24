using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;



namespace MISA.CUKUK.NGHIA.Api.Controllers
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            //Khai báo thông tin máy chủ
            string connectionString = "Host=8.222.228.150;Port:3306;" +
                "Database=UET_21020472_DaoXuanNghia" +
                "User Id = nvmanh;" +
                "Password=12345678";

            //Khởi tạo kết nối
            //var connection = new MySqlConnection(connectionString);

            //Khai báo câu lệnh truy vấn


            //Thực hiện lấy dữ liệu

            //Trả về dữ liệu
            return StatusCode(200, "nghia");
        }

        [HttpPost]
        public IActionResult Post()
        {
            return StatusCode(200, "nghia");
        }

        [HttpPut]
        public IActionResult Put()
        {
            return StatusCode(404);
        }


        [HttpDelete]
        public IActionResult Delete()
        {
            return StatusCode(404);
        }
    }
}
