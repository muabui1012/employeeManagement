using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MISA.CUKUK.NGHIA.Core.Entities;
using MISA.CUKUK.NGHIA.Core.Interfaces;

namespace MISA.CUKUK.NGHIA.Infrastructure.Repository
{
    public class EmployeeRepository : MISADbContext<Employee>, IEmployeeRepository
    {


        public Employee GetByCode(string code)
        {
            var sql = "SELECT * FROM Employee WHERE EmployeeCode = @EmployeeCode";

            var param = new
            {
               EmployeeCode = code
            };

            var employees = base.connnection.QueryFirstOrDefault<Employee>(sql, param);
            
            return employees;
        }
        


        public int Insert(Employee employee)
        {
            string sql = "INSERT INTO Employee(EmployeeId, EmployeeCode, DepartmentId, PositionId, " +
                                                    "CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, " +
                                                    "FullName, FirstName, LastName, DateOfBirth, " +
                                                    "NationalityId, NationalityIdDate, NationalityIdPlace, " +
                                                    "Gender, Address, " +
                                                    "MobilePhoneNumber, TelephoneNumber, Email, " +
                                                    "BankAccount, BankName, BankBranch) ";
            string sqlValue = "VALUES(UUID(), @EmployeeCode, @DepartmentId, @PositionId, " +
                                      "@CreatedBy, @CreatedDate, @ModifiedBy, @ModifiedDate, " +
                                      "@FullName, @FirstName, @LastName, @DateOfBirth, " +
                                      "@NationalityId, @NationalityIdDate, @NationalityIdPlace, " +
                                      "@Gender, @Address, " +
                                      "@MobilePhoneNumber, @TelephoneNumber, @Email, " +
                                      "@BankAccount, @BankName, @BankBranch)";
            string sqlFinal = sql + sqlValue;

            var parameter = new
            {
                EmployeeCode = employee.EmployeeCode,
                DepartmentId = employee.DepartmentId,
                PositionId = employee.PositionId,
                CreatedBy = employee.CreatedBy,
                CreatedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                ModifiedBy = employee.CreatedBy,
                ModifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                FullName = employee.FullName,
                FirstName = splitFullName(employee.FullName).FirstName,
                LastName = splitFullName(employee.FullName).Lastname,
                DateOfBirth = employee.DateOfBirth,
                NationalityId = employee.NationalityId,
                NationalityIdDate = employee.NationalityIdDate,
                NationalityIdPlace = employee.NationalityIdPlace,
                Gender = employee.Gender,
                Address = employee.Address,
                MobilePhoneNumber = employee.MobilePhoneNumber,
                TelephoneNumber = employee.TelephoneNumber,
                Email = employee.Email,
                BankAccount = employee.BankAccount,
                BankName = employee.BankName,
                BankBranch = employee.BankBranch

            };
            
            var result = base.connnection.Execute(sqlFinal, parameter);

            return result;
        }

        public int Update(Employee employee)
        {
            var sql = "UPDATE Employee SET " +
                            "DepartmentId = @DepartmentId, " +
                            "PositionId = @PositionId, " +
                            "ModifiedBy = @ModifiedBy, " +
                            "ModifiedDate = @ModifiedDate, " +
                            "FullName = @FullName, " +
                            "FirstName = @FirstName, " +
                            "LastName = @LastName, " +
                            "DateOfBirth = @DateOfBirth, " +
                            "NationalityId = @NationalityId, " +
                            "NationalityIdDate = @NationalityIdDate, " +
                            "NationalityIdPlace = @NationalityIdPlace, " +
                            "Gender = @Gender, " +
                            "Address = @Address, " +
                            "MobilePhoneNumber = @MobilePhoneNumber, " +
                            "TelephoneNumber = @TelephoneNumber, " +
                            "Email = @Email, " +
                            "BankAccount = @BankAccount, " +
                            "BankName = @BankName, " +
                            "BankBranch = @BankBranch " +
                            "WHERE EmployeeId = @EmployeeId";

            var parameter = new
            {
                employee.DepartmentId,
                employee.PositionId,
                ModifiedBy = "Nghia",
                ModifiedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                employee.FullName,
                splitFullName(employee.FullName).FirstName,
                splitFullName(employee.FullName).Lastname,
                employee.DateOfBirth,
                employee.NationalityId,
                employee.NationalityIdDate,
                employee.NationalityIdPlace,
                employee.Gender,
                employee.Address,
                employee.MobilePhoneNumber,
                employee.TelephoneNumber,
                employee.Email,
                employee.BankAccount,
                employee.BankName,
                employee.BankBranch,
                employee.EmployeeId


            };

            var result = base.connnection.Execute(sql, parameter);

            return result;

        }


        private static (string FirstName, string Lastname) splitFullName(string fullName)
        {
            if (string.IsNullOrEmpty(fullName))
            {
                return ("", "");
            }
            string[] names = fullName.Split(" ");
            string firstName = names[0];
            string lastName = string.Join(" ", names, 1, names.Length - 1); ;
            return (firstName, lastName);
        }

        public Employee GetWithFilter(int pageSize, int pageNumber, string employeeFilter, string departmentId, string positionId)
        {
            throw new NotImplementedException();
        }

        public string GetNewEmployeeCode()
        {
            var sql = "SELECT MAX(EmployeeCode) FROM Employee";

            var lastCode = base.connnection.QueryFirstOrDefault<string>(sql);

            return generateNewEmployeeCode(lastCode);

        }

        private string generateNewEmployeeCode(string lastCode)
        {
            if (lastCode == null)
            {
                return "NV-0001";
            }
            string[] code = lastCode.Split("-");
            int newCode = int.Parse(code[1]) + 1;
            return "NV-" + newCode.ToString("D4");
        }

    }
}
