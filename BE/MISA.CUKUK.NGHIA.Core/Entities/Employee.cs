using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKUK.NGHIA.Core.Entities
{
    public class Employee
    {
        /// <summary>
        /// Employee Id
        /// </summary>
        public Guid EmployeeId { get; set; } = Guid.Empty;

        /// <summary>
        /// Employee Code
        /// </summary>
        public string EmployeeCode { get; set; } = string.Empty;

        /// <summary>
        /// Department Id
        /// </summary>
        public Guid DepartmentId { get; set; } = Guid.Empty;

        /// <summary>
        /// Position Id
        /// </summary>
        public Guid PositionId { get; set; } = Guid.Empty;

        /// <summary>
        /// Employee Full Name
        /// </summary>
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Date of Birth
        /// </summary>
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// Số CCCD
        /// </summary>
        public string NationalityId { get; set; } = string.Empty;

        /// <summary>
        /// Ngày cấp
        /// </summary>
        public DateTime NationalityIdDate { get; set; }

        /// <summary>
        /// Nơi cấp
        /// </summary>
        public string NationalityIdPlace { get; set; } = string.Empty;

        /// <summary>
        /// Giới tính
        /// 0: Nam
        /// 1: Nữ
        /// 2: Khác
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// Số điện thoại di động
        /// </summary>
        public string MobilePhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Số điện thoại cố định
        /// </summary>
        public string TelephoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Tài khoản ngân hàng
        /// </summary>
        public string BankAccount { get; set; } = string.Empty;

        /// <summary>
        /// Tên ngân hàng
        /// </summary>
        public string BankName { get; set; } = string.Empty;

        /// <summary>
        /// Chi nhánh ngân hàng
        /// </summary>
        public string BankBranch { get; set; } = string.Empty;

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
