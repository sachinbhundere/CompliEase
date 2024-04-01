﻿using ConsoleApp6.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularTest1.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
        public ConsoleApp6.Models.Task[] Get()
        {
            
                var context = new CompliContext();

                ConsoleApp6.Models.Task[] sfasdf = context.Tasks.Where(t=> t.Ids != null).ToArray();


            return sfasdf;
        }

        [HttpPost]
        public ConsoleApp6.Models.Task[] Post(saveAns input)
        {

            var context = new CompliContext();
            
            ConsoleApp6.Models.Task[] sfasdf = context.Tasks.Where(t => t.Ids != null).ToArray();


            return sfasdf;
        }
    }

    public class saveAns
    {
        public int Id { get; set; }
        public string Key { get; set; }
    }
}