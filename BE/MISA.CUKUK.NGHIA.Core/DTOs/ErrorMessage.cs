using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUK.NGHIA.Core.DTOs
{
    public class ErrorMessage
    {
        public string? UserMsg { get; set; }

        public object? DevMsg { get; set; }

        public ErrorMessage(string userMsg, object DevMsg)
        {
            this.DevMsg = DevMsg;
            this.UserMsg = userMsg;
        }

    }
}
