using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.CUKUK.NGHIA.Core.Entities;
using MISA.CUKUK.NGHIA.Core.Interfaces;

namespace MISA.CUKUK.NGHIA.Infrastructure.Repository
{
    public class PositionRepository : IPositionRepository, IDisposable
    {
        
        
        /// <summary>
        /// Destructor
        /// </summary>
        public void Dispose()
        {

        }

        public int Delete(Position entity)
        {
            throw new NotImplementedException();
        }

        

        public List<Position> Get()
        {
            Position position = new Position();
           
            List<Position> positions = new();
            positions.Append(position);

            return positions;
        }

        public Position GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public int Insert(Position entity)
        {
            throw new NotImplementedException();
        }

        public int Update(Position entity)
        {
            throw new NotImplementedException();
        }
    }
}
