using Microsoft.EntityFrameworkCore;

namespace AngularTest1.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) :base(options)
        { }

        public DbSet<Tasks> Tasks => Set<Tasks>();
    }
}
