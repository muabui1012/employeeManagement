using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class DepartmentService : IDepartmentService
    {
        public object InsertService(Department entity)
        {
            if (entity == null)
            {
                return new ServiceResult
                {
                    Success = false,
                    Message = "Dữ liệu không được để trống",
                    Data = null
                };
            }

            if (entity.DepartmentName == null)
            {
                return new ServiceResult
                {
                    Success = false,
                    Message = "Tên phòng ban không được để trống",
                    Data = null
                };
            }

            return new ServiceResult
            {
                Success = true,
                Message = "",
                Data = entity
            };
        }
    }
}
