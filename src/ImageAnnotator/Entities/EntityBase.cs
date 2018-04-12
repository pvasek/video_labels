using System;

namespace ImageAnnotator
{
    public class EntityBase
    {        
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}