using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKUK.NGHIA.Core.Interfaces
{
    public interface IBaseService <T> where T : class
    {
        object InsertService(T entity);
    }
}
