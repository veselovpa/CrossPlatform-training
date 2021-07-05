using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace veselov.Models
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options)
            : base(options)
        {
        }

        //public DbSet<Worker> Workers { get; set; }
        public DbSet<Company> Companies { get; set; }

        public List<Worker> getAllWorkers()
        {
            var res = new List<Worker>();
            foreach (var i in Companies.ToList())
            {
                res.AddRange(i.Workers);
            }
            return res;
        }

        public Worker getWorker(long id)
        {
            foreach (var i in Companies.ToList())
            {
                var res = i.Workers.FirstOrDefault(p => p.Id == id);
                if (res != null)
                    return res;
            }
            return null;
        }


        public IEnumerable<Worker> getExpWorkers(int exp)
        {
            return
                from Worker in getAllWorkers()
                where Worker.YearsExperience > exp
                select Worker;
        }

        public IEnumerable<Company> getBigCompanies(int h)
        {
            return Companies.Where(c => c.Workers.Count > h);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>()
                .OwnsMany(property => property.Workers);
        }
    }
}