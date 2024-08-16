using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MISA.CUKUK.NGHIA.Core.Entities;
using MISA.CUKUK.NGHIA.Core.Interfaces;

namespace MISA.CUKUK.NGHIA.Infrastructure.Repository
{
    public class EmployeeRepository : MISADbContext<Employee>, IEmployeeRepository
    {
       
        public new int Insert(Employee entity)
        {
            throw new NotImplementedException();
        }

        public new int Update(Employee entity)
        {
            throw new NotImplementedException();
        }
    }
}
