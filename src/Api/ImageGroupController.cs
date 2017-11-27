using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VideoLabels.Services;

namespace VideoLabels.Controllers
{
    [Route("api/v1/imagegroup")]
    public class ImageGroupController : Controller
    {
        private DataService _dataService;

        public ImageGroupController(DataService dataService) 
        {
            _dataService = dataService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var groups = await _dataService.GetGroupsAsync();
            var data = groups
                .Select(i => new { i.Id, i.Name })
                .ToList();

            return Json(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetAll(string id)
        {
            var data = await _dataService.GetGroupAsync(id);
            return Json(data);
        }
    }
}
