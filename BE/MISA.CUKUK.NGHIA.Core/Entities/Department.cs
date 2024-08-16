using MISA.CUKUK.NGHIA.Core.CustomValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKUK.NGHIA.Core.Entities
{
    public class Department
    {/// <summary>
     /// Mã phòng ban
     /// 
     /// </summary>
        public Guid DepartmentId { get; set; } = Guid.Empty;

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        [Required(ErrorMessage = "Tên phòng ban không được để trống")]
        [MaxLength(100, ErrorMessage = "Tên phòng ban không được vượt quá 100 ký tự")]
        public string DepartmentName { get; set; } = string.Empty;


        /// <summary>
        /// Người tạo
        /// </summary>
        public string CreatedBy { get; set; } = string.Empty;

        /// <summary>
        /// Ngày tạo
        /// </summary>
        [DateGreaterThanToday]
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Người sửa
        /// </summary>
        
        public string ModifiedBy { get; set; } = string.Empty;

        /// <summary>
        /// Ngày sửa
        /// </summary>
        [DateGreaterThanToday]
        public DateTime ModifiedDate { get; set; }
    }
}
