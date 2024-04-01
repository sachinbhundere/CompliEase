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
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlite("Filename=C:\\Users\\sbhundere2\\source\\repos\\ConsoleApp6\\DB\\Compli.db");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("task");

                entity.Property(e => e.CisV8Maturity).HasColumnName("CIS_v8_maturity");

                entity.Property(e => e.Cisv8).HasColumnName("CISv8");

                entity.Property(e => e.Cmmclevel1).HasColumnName("CMMCLevel1");

                entity.Property(e => e.Cmmclevel2).HasColumnName("CMMCLevel2");

                entity.Property(e => e.Cvt).HasColumnName("CVT");

                entity.Property(e => e.FtcsafeguardsRule).HasColumnName("FTCSafeguardsRule");

                entity.Property(e => e.Gdpr).HasColumnName("GDPR");

                entity.Property(e => e.Hipaa).HasColumnName("HIPAA");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Ids).HasColumnName("IDS");

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
