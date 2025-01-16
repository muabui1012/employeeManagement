using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;

using Core.Entities;
using Core.Interfaces;
using Core.Services;
using System.Linq.Expressions;
using Core.DTOs;


namespace Api.Controllers
{
  
    /// <summary>
    /// Position controller
    /// Author: Nghia (04/08/2024)
    /// </summary>
    [Route("api/v1/positions")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        IPositionRepository positionRepository;
        public PositionsController(IPositionRepository repository)
        {
            this.positionRepository = repository;
        }
        /// <summary>
        /// Get all positions
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var positions = positionRepository.Get();

                if (positions.Count == 0)
                {
                    return StatusCode(204);
                }
                return StatusCode(200, positions);

            }
            catch (System.Exception e)
            {
                return StatusCode(500, e);
            }
        }

        /// <summary>
        /// Get all positions
        /// </summary>
        /// <returns></returns>
        [HttpGet("{positionId}")]
        public IActionResult GetPositionById(string positionId)
        {
            try
            {
                Position position = positionRepository.GetById(positionId);

                if (position != null)
                {
                    return StatusCode(200, position);
                }

                return StatusCode(204, "Position not found");

            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
        }


       
        /// <summary>
        /// Insert position
        /// </summary>
        /// <param name="position"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult InsertPosition([FromBody] Position position)
        {
            try
            {
                try
                {
                    var result = positionRepository.Insert(position);
                } catch (System.Exception ex)
                {
                    string userMsg = "Vị trí không hợp lệ";
                    if (ex.Message.Contains("Duplicate entry")) {
                        userMsg = "Vị trí đã tồn tại";
                    }
                    ErrorMessage error = new ErrorMessage(userMsg, ex.Message);
                    
                    return StatusCode(400, error);
                }
                return StatusCode(201, "Đã thêm vị trí");

            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }
            
        }

        /// <summary>
        /// Update position
        /// </summary>
        /// <param name="position"></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult UpdatePosition([FromBody]Position position)
        {
            try
            {
                try
                {
                    var result = positionRepository.Update(position);
                }
                catch (System.Exception ex)
                {
                    ErrorMessage error = new("Đã có lỗi xảy ra", ex.Message);
                    return StatusCode(500, error);
                }
                return StatusCode(200, "Đã cập nhật thành công");

            }
            catch (System.Exception e)
            {
                ErrorMessage error = new("Đã có lỗi xảy ra", e.Message);
                return StatusCode(500, error);
            }

        }

        /// <summary>
        /// Delete position
        /// </summary>
        /// <param name="positionId"></param>
        /// <returns></returns>
        [HttpDelete("{positionId}")]
        public IActionResult DeletePosition(string positionId)
        {
            try
            {
               positionRepository.Delete(positionId);

               return StatusCode(204, "Đã xóa vị trí");
            }
            catch (System.Exception e)
            {
                ErrorMessage error = new ErrorMessage("Đã có lỗi xảy ra", e.Message);

                return StatusCode(500, error);
            }
        }
    }
}
