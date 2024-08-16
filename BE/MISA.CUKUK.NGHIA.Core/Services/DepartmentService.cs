using MISA.CUKUK.NGHIA.Core.DTOs;
using MISA.CUKUK.NGHIA.Core.Entities;
using MISA.CUKUK.NGHIA.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKUK.NGHIA.Core.Services
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
