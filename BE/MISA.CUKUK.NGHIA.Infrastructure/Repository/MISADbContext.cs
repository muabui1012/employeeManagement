using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MySqlConnector;
using Dapper;
using MISA.CUKUK.NGHIA.Core.Entities;
using MISA.CUKUK.NGHIA.Core.Interfaces;


namespace MISA.CUKUK.NGHIA.Infrastructure.Repository
{
   

    public class MISADbContext<T> : IDisposable
    {

     
        private string connectionString =
                        "Host=8.222.228.150;" +
                        "Port=3306;" +
                        "User Id=manhnv;" +
                        "Password=12345678;" +
                        "Database=UET_21020472_DaoXuanNghia";

        public IDbConnection connnection;
        
        /// <summary>
        /// Initialize DB connection 
        /// </summary>
        public MISADbContext()
        {
            connnection = new MySqlConnection(connectionString);
        }

        /// <summary>
        /// Close DB connection
        /// </summary>
        public void Dispose() => connnection.Close();

        public List<T> Get()
        {
            var className = typeof(T).Name;
            var sqlCommand = $"SELECT * FROM {className}";
            var entities = connnection.Query<T>(sqlCommand).ToList();
            return entities;     
         }

        public T GetById(string id)
        {
            var className = typeof(T).Name;
            var sqlCommand = $"SELECT * FROM {className} WHERE {className}Id = @Id";
            var param = new DynamicParameters();
            param.Add("id", id);
            var entity = connnection.QueryFirstOrDefault<T>(sqlCommand, param);
            return entity;
        }

        public int Delete(string id)
        {
            var className = typeof(T).Name;
            var sqlCommand = $"DELETE FROM {className} WHERE {className}Id = @Id";
            var param = new DynamicParameters();
            param.Add("id", id);
            var rowAffect = connnection.Execute(sqlCommand, param);
            return rowAffect;
        }
    }
}
