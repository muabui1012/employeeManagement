using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    /// <summary>
    /// Kết quả thực hiện service
    /// </summary>
    public class ServiceResult
    {
        public bool Success { get; set; }

        public string? Message { get; set; }

        public object? Data { get; set; }


    }
}
