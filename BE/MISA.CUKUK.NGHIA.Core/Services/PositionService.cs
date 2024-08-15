using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.CUKUK.NGHIA.Core.Entities;
using MISA.CUKUK.NGHIA.Core.Interfaces;
using MISA.CUKUK.NGHIA.Core.DTOs;


namespace MISA.CUKUK.NGHIA.Core.Services
{
    public class PositionService : IPositionService
    {
        public object InsertService(Position entity)
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

            if (entity.PositionName == null)
            {
                return new ServiceResult
                {
                    Success = false,
                    Message = "Tên vị trí không được để trống",
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
