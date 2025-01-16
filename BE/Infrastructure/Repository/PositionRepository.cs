using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Repository
{
    public class PositionRepository : MISADbContext<Position>, IPositionRepository
    {
        public int Insert(Position entity)
        {
            string sql = "INSERT INTO `Position`(PositionId, PositionName, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate) VALUES(UUID(), @positionName, @createdBy, @createdDate, @modifiedBy, @modifiedDate)";

            var parameter = new
            {
                positionName = entity.PositionName,
                createdBy = entity.CreatedBy,
                createdDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                modifiedBy = entity.CreatedBy,
                modifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            };

            var result = base.connnection.Execute(sql, parameter);

            return result;
        }

        public int Update(Position entity)
        {
            string sql = "UPDATE `Position` SET PositionName = @positionName, ModifiedBy = @modifiedBy, ModifiedDate = @modifiedDate WHERE PositionId = @positionId";

            var parameter = new
            {
                positionName = entity.PositionName,
                modifiedBy = entity.ModifiedBy,
                modifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                positionId = entity.PositionId
            };

            var result = base.connnection.Execute(sql, parameter);

            return result;

        }
    }
}
