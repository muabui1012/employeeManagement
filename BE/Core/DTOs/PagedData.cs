using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{

    /// <summary>
    /// Tổ chức lại dữ liệu thành từng trang    
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PagedData<T>
    {
        public PagedData()
        {
            
        }
        public PagedData(List<T> inputData, int pageSize)
        {
            this.TotalPageNumber = (int)Math.Ceiling(inputData.Count / (double)pageSize);

            this.PageSize = pageSize;

            this.Data = new List<List<T>>();


            for (int pageNumber = 1; pageNumber <= TotalPageNumber; pageNumber++)
            {
                List<T> pageData = new List<T>();
                for (int i = (pageNumber - 1) * pageSize; i < pageNumber * pageSize; i++)
                {
                    if (i >= inputData.Count)
                    {
                        break;
                    }
                    pageData.Add(inputData[i]);
                }
                
                this.Data.Add(pageData);

            }
        }
        public int TotalPageNumber { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public List<List<T>>? Data { get; set; }
    }
}
