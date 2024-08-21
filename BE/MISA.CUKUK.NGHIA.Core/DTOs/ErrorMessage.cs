using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUK.NGHIA.Core.DTOs
{

    /// <summary>
    /// Gửi lỗi về cho client
    /// </summary>
    public class ErrorMessage
    {
        public int StatusCode { get; set; }
        public string? UserMsg { get; set; }

        public object? DevMsg { get; set; }

        public ErrorMessage(string userMsg, object DevMsg)
        {
            this.DevMsg = DevMsg;
            this.UserMsg = userMsg;
        }

        public ErrorMessage(int statusCode, string? userMsg, object? devMsg)
        {
            StatusCode = statusCode;
            UserMsg = userMsg;
            DevMsg = devMsg;
        }
    }
}
