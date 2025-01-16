using Microsoft.AspNetCore.Http;
using Core.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Exceptions
{

    /// <summary>
    /// Xử lý exception 
    /// </summary>
    public class HandleExceptionMiddleware
    {
        private RequestDelegate _next;

        public HandleExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                // Xử lý request
                await _next(context);
            }
            catch (Exception ex)
            {
                var userMsg = "Có lỗi xảy ra, vui lòng liên hệ MISA để được hỗ trợ!";
                var error = new ErrorMessage(context.Response.StatusCode, userMsg, ex.Message);
                
                var res = JsonConvert.SerializeObject(error);
                // Xử lý exception
                await context.Response.WriteAsync(res);
                
            }
        }

    }
}
