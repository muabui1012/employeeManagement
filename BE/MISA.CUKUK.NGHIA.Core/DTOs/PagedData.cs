using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUK.NGHIA.Core.DTOs
{
    public class PagedData<T>
    {
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

        public List<List<T>>? Data { get; set; }
    }
}
