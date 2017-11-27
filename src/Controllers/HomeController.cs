using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace VideoLabels.Controllers
{
    [Route("")]
    public class HomeController : Controller
    {
        [HttpGet]
        [Route("app/{*path}")]
        public IActionResult Index(string path = null)
        {
            return View();
        }

        [Route("")]
        public IActionResult Root() 
        {
            return Redirect("~/app");
        }
    }
}
