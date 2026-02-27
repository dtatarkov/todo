using Db.Postgre.Entities;
using Microsoft.EntityFrameworkCore;

namespace Db.Postgre.Context;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<PostgreToDoEntity> ToDos { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PostgreToDoEntity>(entity =>
        {
            entity.ToTable("Todos");
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("gen_random_uuid()");
            
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.CompletionDatePlanned);
            entity.Property(e => e.CompletionDateActual);
            entity.Property(e => e.StateType).IsRequired();
        });
    }
}