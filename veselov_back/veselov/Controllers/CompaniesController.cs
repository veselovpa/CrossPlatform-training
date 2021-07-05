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
    public class CompaniesController : ControllerBase
    {
        private readonly MyContext _context;

        public CompaniesController(MyContext context)
        {
            _context = context;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }


        // PUT: api/Companies/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        // public async Task<IActionResult> PutCompany(long id, Company company)
        public async Task<ActionResult<IEnumerable<Company>>> PutCompany(long id, Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            // return NoContent();
            return await _context.Companies.ToListAsync();
        }

        // POST: api/Companies
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<Company>>> PostCompany(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return await _context.Companies.ToListAsync();
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<Company>>> DeleteCompany(long id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return await _context.Companies.ToListAsync();
        }

        private bool CompanyExists(long id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}
