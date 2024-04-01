using AngularTest1.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularTest1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly DataContext _context;
        public TasksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public Tasks Gets()
        {
           var fjhfhj =  new Tasks
            {
                ID = 1,
                Name = Random.Shared.Next(-20, 55).ToString(),
                Score = null // Summaries[Random.Shared.Next(Summaries.Length)]
            };

            return fjhfhj;
        }
    }
}
