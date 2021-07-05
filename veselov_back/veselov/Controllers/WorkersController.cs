using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using veselov.Models;
using Microsoft.AspNetCore.Authorization;

namespace veselov.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly MyContext _context;

        public WorkersController(MyContext context)
        {
            _context = context;
        }

        // GET: api/Workers
        [HttpGet]
        public IEnumerable<Worker> GetWorkers()
        {
            return _context.getAllWorkers();
        }

        // GET: api/Workers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Worker>> GetWorker(long id)
        {
            var worker = _context.getWorker(id);

            if (worker == null)
            {
                return NotFound();
            }

            return worker;
        }

        [HttpGet("Exp/{e}")]
        [Authorize]
        public IEnumerable<Worker> GetExpWorkers(int e)
        {
            return _context.getExpWorkers(e);

        }

        // PUT: api/Workers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorker(long id, Worker worker)
        {
            if (id != worker.Id)
            {
                return BadRequest();
            }

            _context.Entry(worker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Workers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<Company>>> PostWorker(Worker worker, long id)
        {

            var C = await _context.Companies.FindAsync(id);

            if (C == null)
                return BadRequest();

            C.Workers.Add(worker);

            await _context.SaveChangesAsync();

            return await _context.Companies.ToListAsync();
        }

        // DELETE: api/Workers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Company>>> DeleteWorker(long id)
        {
            var worker = _context.getWorker(id);
            if (worker == null)
            {
                return NotFound();
            }

            _context.Companies.Where(C => C.Workers.FirstOrDefault(w => w.Id == id) != null).FirstOrDefault().Workers.Remove(worker);
            await _context.SaveChangesAsync();

            return await _context.Companies.ToListAsync();
        }

        private bool WorkerExists(long id)
        {
            return _context.getAllWorkers().Any(e => e.Id == id);
        }
    }
}
