using Microsoft.EntityFrameworkCore;

namespace ImageAnnotator
{
    public class DbService: DbContext
    {
        public DbService(DbContextOptions<DbService> options): base(options)
        {
        }
        
        public DbSet<Image> Images { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}