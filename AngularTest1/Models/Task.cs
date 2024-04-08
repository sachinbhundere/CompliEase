using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ConsoleApp6.Models
{
    public partial class Task
    {
        [Key]
        public long Id { get; set; }
        public string? Policy { get; set; }
        public string? Statement { get; set; }
        public string? Issue { get; set; }
        public string? Requirement { get; set; }
        public string? Task1 { get; set; }
        public string? TaskDescription { get; set; }
        public string? HowTo { get; set; }
        public string? Severity { get; set; }
        public long? DueDate { get; set; }
        public long? Owner { get; set; }
        public long? Status { get; set; }
        public long? Statlastupdatedby { get; set; }
        public long? Plan { get; set; }
        public long? Sop { get; set; }
        public long? Comments { get; set; }
        public long? EstimatedEffort { get; set; }
        public double? Improvementscore { get; set; }
        public long? Evidence { get; set; }
        public long? EvValidation { get; set; }
        public long? IsAnswered { get; set; }
        public string? Cisv8 { get; set; }
        public string? Cmmclevel1 { get; set; }
        public string? Cmmclevel2 { get; set; }
        public string? FtcsafeguardsRule { get; set; }
        public string? Gdpr { get; set; }
        public string? Iso270012022 { get; set; }
        public string? NistCsf { get; set; }
        public string? SecCompliance { get; set; }
        public string? CisV8Maturity { get; set; }
        public string? Hipaa { get; set; }
        public string? Nist800171 { get; set; }
    }
}
