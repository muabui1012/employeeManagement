using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUK.NGHIA.Core.DTOs
{
    public class EmployeeFilter
    {
        public Guid? EmployeeId { get; set; }

        public string? EmployeeCode { get; set; }

        public Guid? PositionId { get; set; }

        public Guid? DepartmentId { get; set; }

        public string? FullName { get; set; }

        public int? PageNumber { get; set; }

        public int? PageSize { get; set; }

    }
}
