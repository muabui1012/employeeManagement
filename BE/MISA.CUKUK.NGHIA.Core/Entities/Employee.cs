using MISA.CUKUK.NGHIA.Core.CustomValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Required(ErrorMessage="Mã nhân viên không được để trống")]
        public string EmployeeCode { get; set; } = string.Empty;

        /// <summary>
        /// Department Id
        /// </summary>
        public Guid DepartmentId { get; set; } = Guid.Empty;


        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; } = string.Empty;

        
        /// <summary>
        /// Position Id
        /// </summary>
        public Guid PositionId { get; set; } = Guid.Empty;

        /// <summary>
        /// Vị trí
        /// </summary>
        public string PositionName { get; set; } = string.Empty;

        /// <summary>
        /// Employee Full Name
        /// </summary>
        [Required(ErrorMessage="Họ và tên không được để trống")]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Date of Birth
        /// </summary>
        [DateGreaterThanToday]
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Số CCCD
        /// </summary>
        [Required(ErrorMessage="Số CCCD không được để trống")]
        public string NationalityId { get; set; } = string.Empty;

        /// <summary>
        /// Ngày cấp
        /// </summary>
        [DateGreaterThanToday]
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
        [Required(ErrorMessage="Số điện thoại không được để trống")]
        public string MobilePhoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Số điện thoại cố định
        /// </summary>
        public string TelephoneNumber { get; set; } = string.Empty;

        /// <summary>
        /// Email
        /// </summary>
        [Required(ErrorMessage="Email không được để trống")]
        [EmailAddress(ErrorMessage="Email không đúng định dạng")]
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
