using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MySqlConnector;
using Dapper;


namespace MISA.CUKUK.NGHIA.Infrastructure.Repository
{
    public class DbContext
    {   
        private string connectionString =
                        "Host=8.222.228.150;" +
                        "Port=3306;" +
                        "User Id=manhnv;" +
                        "Password=12345678;" +
                        "Database=UET_21020472_DaoXuanNghia";

        protected IDbConnection connnection;
        public DbContext()
        {
           connnection = new MySqlConnection(connectionString);
        }

    }
}
