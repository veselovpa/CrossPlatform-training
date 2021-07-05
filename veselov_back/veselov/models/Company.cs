using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace veselov.Models
{
    public class Company
    {
        public long Id { get; set; }
        public string Name { get; set; }       
        public List<Worker> Workers { get; set; }
    }
}
