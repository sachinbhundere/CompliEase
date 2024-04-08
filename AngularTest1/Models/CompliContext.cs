using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ConsoleApp6.Models
{
    public partial class CompliContext : DbContext
    {
        public CompliContext()
        {
        }

        public CompliContext(DbContextOptions<CompliContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Task> Tasks { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Filename=C:\\Users\\sbhundere2\\OneDrive - DXC Production\\Desktop\\Paddu\\CompliDB4.db");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("Task");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.CisV8Maturity).HasColumnName("CIS_v8_maturity");

                entity.Property(e => e.Cisv8).HasColumnName("CISv8");

                entity.Property(e => e.Cmmclevel1).HasColumnName("CMMCLevel1");

                entity.Property(e => e.Cmmclevel2).HasColumnName("CMMCLevel2");

                entity.Property(e => e.FtcsafeguardsRule).HasColumnName("FTCSafeguardsRule");

                entity.Property(e => e.Gdpr).HasColumnName("GDPR");

                entity.Property(e => e.Hipaa).HasColumnName("HIPAA");

                entity.Property(e => e.IsAnswered).HasColumnName("isAnswered");

                entity.Property(e => e.Iso270012022).HasColumnName("ISO_27001_2022");

                entity.Property(e => e.Nist800171).HasColumnName("NIST_800_171");

                entity.Property(e => e.NistCsf).HasColumnName("NIST_CSF");

                entity.Property(e => e.SecCompliance).HasColumnName("SEC_compliance");

                entity.Property(e => e.Sop).HasColumnName("SOP");

                entity.Property(e => e.Task1).HasColumnName("Task");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
