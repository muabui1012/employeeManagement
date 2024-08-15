using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKUK.NGHIA.Core.Entities
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
        public string PositionName { get; set; } = string.Empty;

        /// <summary>
        /// Người tạo
        /// </summary>
        public string CreatedBy { get; set; } = string.Empty;

        /// <summary>
        /// Ngày tạo
        /// </summary>
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
