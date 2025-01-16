using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;

using Core.Entities;
using Core.Interfaces;
using Microsoft.OpenApi.Any;
using Core.DTOs;



namespace Api.Controllers
{
    /// <summary>
    /// Department controller
    /// Author: Nghia (04/08/2024)
    /// </summary>
    [Route("api/v1/departments")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        IDepartmentRepository departmentRepository;
        public DepartmentsController(IDepartmentRepository repository)
        {
            departmentRepository = repository;
        }

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
                var departments = departmentRepository.Get();
                if (departments.Count == 0)
                {
                    return StatusCode(204);
                } else
                {
                    return StatusCode(200, departments);
                }
            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
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
                var department = departmentRepository.GetById(departmentId);
                
                if (department != null)
                {
                    
                    return StatusCode(200, department);
                } else
                {
                    return StatusCode(204, "Department not found");
                }
                
            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
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
                try
                {
                    var result = departmentRepository.Insert(department);
                } catch (System.Exception ex)
                {
                    string userMsg = "Vị trí không hợp lệ";
                    if (ex.Message.Contains("Duplicate entry"))
                    {
                        userMsg = "Vị trí đã tồn tại";
                    }
                    ErrorMessage error = new ErrorMessage(userMsg, ex.Message);

                    return StatusCode(400, error);
                }

                return StatusCode(201, "Department added");

            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
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
            
            try
            {
                var result = departmentRepository.Update(department);
                return StatusCode(200, "Department updated");
            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
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
                departmentRepository.Delete(departmentId);
                return StatusCode(204, "Department deleted");
            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
        }
    }

    
}
