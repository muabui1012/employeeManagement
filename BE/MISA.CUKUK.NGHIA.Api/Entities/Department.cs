namespace MISA.CUKUK.NGHIA.Api.Entities
{
    public class Department
    {
        /// <summary>
        /// Mã phòng ban
        /// 
        /// </summary>
        public Guid DepartmentId { get; set; } = Guid.Empty;

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; } = string.Empty;


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
