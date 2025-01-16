using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Core.CustomValidation;

namespace Core.Entities
{
    public class Position
    {
        /// <summary>
        /// Mã vị trí
         /// </summary>
        public Guid PositionId { get; set; } = Guid.Empty;

        /// <summary>
        /// Tên vị trí
        /// </summary>
        /// 
        [Required(ErrorMessage = "Tên vị trí không được để trống")]
        [MaxLength(255, ErrorMessage = "Tên vị trí không được vượt quá 255 ký tự")]
        public string PositionName { get; set; } = string.Empty;

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
        public DateTime ModifiedDate { get; set; }
    }
}
