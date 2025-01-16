using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        List<T> Get();
        T GetById(string id);

        int Insert(T entity);

        int Update(T entity);

        int Delete(string id);


    }
}
