﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Repository
{
    public class EmployeeRepository : MISADbContext<Employee>, IEmployeeRepository
    {
        IDepartmentRepository departmentRepository;
        IPositionRepository positionRepository;

        public EmployeeRepository(IDepartmentRepository departmentRepository, IPositionRepository positionRepository)
        {
            this.departmentRepository = departmentRepository;
            this.positionRepository = positionRepository;
        }

        public new List<Employee> Get()
        {
            //string sql = "SELECT * FROM Employee ";


            string sql = @"
            SELECT e.*, d.DepartmentName, p.PositionName 
            FROM Employee e
            LEFT JOIN Department d ON e.DepartmentId = d.DepartmentId
            LEFT JOIN Position p ON e.PositionId = p.PositionId";

            List<Employee> employees = base.connnection.Query<Employee>(sql).ToList();

            var sortedEmployees = employees.OrderBy(e => e.EmployeeCode).ToList();

            sortedEmployees.Reverse();

            return sortedEmployees;
        }

        public new Employee GetById(string id)
        {
            string sql = @"
            SELECT e.*, d.DepartmentName, p.PositionName 
            FROM Employee e
            LEFT JOIN Department d ON e.DepartmentId = d.DepartmentId
            LEFT JOIN Position p ON e.PositionId = p.PositionId
            WHERE EmployeeId = @EmployeeId";
            
            var parameter = new
            {
                EmployeeId = id
            };

            var employee = base.connnection.QueryFirstOrDefault<Employee>(sql, parameter);

            return employee;

        }


        public Employee GetByCode(string code)
        {
            var sql = @"
            SELECT e.*, d.DepartmentName, p.PositionName
            FROM Employee e
            LEFT JOIN Department d ON e.DepartmentId = d.DepartmentId
            LEFT JOIN Position p ON e.PositionId = p.PositionId
            WHERE EmployeeCode = @EmployeeCode";

            var param = new
            {
               EmployeeCode = code
            };

            var employee = base.connnection.QueryFirstOrDefault<Employee>(sql, param);
            
            

            return employee;
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

        private Employee fillName(Employee employee)
        {
            Employee newEmployee = employee;

            Position position = positionRepository.GetById(employee.PositionId.ToString());
            if (position == null)
            {
                position = new Position();
            }

            Department department = departmentRepository.GetById(employee.DepartmentId.ToString());

            if (department == null)
            {
                department = new Department();
            }

            newEmployee.DepartmentName = department.DepartmentName;
            newEmployee.PositionName = position.PositionName;


            return newEmployee;
        }

    }
}
