using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImageAnnotator.WebUI.Entities;
using ImageAnnotator.WebUI.Services;
using ImageAnnotator.WebUI.Dtos;

namespace ImageAnnotator.WebUI.Controllers
{
    [Route("api/v1/[controller]")]
    public class ProjectController: Controller
    {
        private DbService _db;

        public ProjectController(DbService db) 
        {
            _db = db;
        }

        [HttpGet]
        public async Task<List<ProjectDto>> GetAll()
        {
            var projects = await _db.Projects
                .ToListAsync();

            return projects
                .Select(FromEntity)
                .ToList();
        }

        [HttpGet]
        public async Task<ProjectDto> Get(Guid id)
        {
            var projects = await _db.Projects
                .FindAsync(id);

            return FromEntity(projects);
        }

        [HttpPost]
        public async Task Save(ProjectDto dto) 
        {
            var entity = await _db.Projects.FindAsync(dto.Id);
            FromDto(entity, dto);
            await _db.SaveChangesAsync();
        }

        [HttpPut]
        public async Task Create(ProjectDto dto) 
        {
            var entity = new Project();
            FromDto(entity, dto);
            _db.Projects.Add(entity);
            await _db.SaveChangesAsync();
        }

        private void FromDto(Project entity, ProjectDto dto) 
        {
            entity.Name = dto.Name;
        }

        private ProjectDto FromEntity(Project entity) 
        {
            return new ProjectDto 
            { 
                Id = entity.Id, 
                Name = entity.Name 
            };
        }
    }
}
