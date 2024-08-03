namespace MISA.CUKUK.NGHIA.Api.Entities
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; } = string.Empty;

        public Guid DepartmentId { get; set; }

        public Guid PositionId { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
    }
}
