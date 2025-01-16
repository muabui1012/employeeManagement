using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.CustomValidation
{
    /// <summary>
    /// Ngày tháng không được lớn hơn ngày hiện tại
    /// </summary>
    public class DateGreaterThanToday: ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                DateTime dateTime = (DateTime)value;
                if (dateTime > DateTime.Now)
                {
                    return new ValidationResult("Ngày sinh không được lớn hơn ngày hiện tại");
                }
            }
            return ValidationResult.Success;
        }
    }
}
