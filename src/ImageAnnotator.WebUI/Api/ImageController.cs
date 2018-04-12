using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ImageAnnotator.WebUI.Entities;
using ImageAnnotator.WebUI.Services;
using ImageAnnotator.WebUI.Dtos;

namespace ImageAnnotator.WebUI.Controllers
{
    [Route("api/v1/[controller]")]
    public class ImageController : Controller
    {
        private DbService _db;

        public ImageController(DbService db) 
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _db.Images.ToListAsync();
            
            var data = items
                .Select(i => new ImageDto { 
                    Id = i.Id, 
                    FileName = i.FileName,
                })
                .ToList();

            return Json(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var data = await _db.Images.FindAsync(id);
            return Json(new ImageDto { 
                    Id = data.Id, 
                    FileName = data.FileName,
                    AnnotationJson = data.AnnotationJson,
                });
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> Save(string id, 
            [FromBody] DataLabels labels)
        {
            var entity = await _db.Images.FindAsync(id);
            entity.AnnotationJson = JsonConvert.SerializeObject(labels);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}
