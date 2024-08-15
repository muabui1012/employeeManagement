using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.CUKUK.NGHIA.Core.Entities;

namespace MISA.CUKUK.NGHIA.Core.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        List<T> Get();
        T GetById(Guid id);

        int Insert(T entity);

        int Update(T entity);

        int Delete(T entity);


    }
}
