using BookLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using System.Web.Http;

namespace BookLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly MyDBContext _context;
        public BookController(MyDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        // [Route("Books")]
        public IEnumerable<Book> Get()
        {
            try
            {
                return _context.Books.AsQueryable();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        [Route("AddBook")]
        public ActionResult AddBook(Book book)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                _context.Books.Add(book);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(book);
        }


    }
}
