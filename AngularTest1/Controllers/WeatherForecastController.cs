using ConsoleApp6.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularTest1.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("GetTaskList")]
        public ConsoleApp6.Models.Task[] Get()
        {
            
                var context = new CompliContext();

                ConsoleApp6.Models.Task[] sfasdf = context.Tasks.Where(t=> t.IsAnswered != null && t.IsAnswered != 0).ToArray();


            return sfasdf;
        }

        [HttpGet]
        [Route("GetAnswers")]
        public long[] GetAns()
        {

            var context = new CompliContext();

            long[] sfasdf = context.Tasks.Where(t => t.IsAnswered != null && t.IsAnswered != 0).Select(y=> y.Id).ToArray();


            return sfasdf;
        }

        [Route("SaveAnswer")]
        [HttpPost]
        public ConsoleApp6.Models.Task[] Post(saveAns input)
        {

            var context = new CompliContext();
            
            
         var sfasdf = context.Tasks.Where(t => t.Id == input.AnsID).FirstOrDefault();
            if (sfasdf != null)
            {
                sfasdf.IsAnswered = 1;

                context.Entry(sfasdf).State = EntityState.Modified;

            }
            return null;
        }
    }

    public class saveAns
    {
        public int AnsID { get; set; }
    }


    }