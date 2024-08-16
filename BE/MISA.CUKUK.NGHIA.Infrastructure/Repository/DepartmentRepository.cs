using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MISA.CUKUK.NGHIA.Core.Entities;
using MISA.CUKUK.NGHIA.Core.Interfaces;

namespace MISA.CUKUK.NGHIA.Infrastructure.Repository
{
    public class DepartmentRepository : MISADbContext<Department>, IDepartmentRepository
    {
      

        public int Insert(Department entity)
        {
            string sql = "INSERT INTO Department (DepartmentId, DepartmentName, CreatedBy, CreatedDate) VALUES (UUID(), @DepartmentName, @CreatedBy, @CreatedDate)";
            
            var parameter = new
            {
                DepartmentName = entity.DepartmentName,
                CreatedBy = entity.CreatedBy,
                CreatedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            };

            var result = base.connnection.Execute(sql, parameter);

            return result;
        
        }

        public int Update(Department entity)
        {
            string sql = "UPDATE Department SET DepartmentName = @DepartmentName, ModifiedBy = @ModifiedBy, ModifiedDate = @ModifiedDate WHERE DepartmentId = @DepartmentId";
            var parameter = new
            {
                DepartmentName = entity.DepartmentName,
                ModifiedBy = entity.ModifiedBy,
                ModifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                DepartmentId = entity.DepartmentId
            };

            var result = base.connnection.Execute(sql, parameter);

            return result;

        }
    }
}
