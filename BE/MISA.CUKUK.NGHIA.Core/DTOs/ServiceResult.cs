﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKUK.NGHIA.Core.DTOs
{
    public class ServiceResult
    {
        public bool Success { get; set; }

        public string? Message { get; set; }

        public object? Data { get; set; }


    }
}
