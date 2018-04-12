using System;

namespace ImageAnnotator
{
    public class Image: EntityBase
    {
        public string FileName { get; set; }
        public string AnnotationJson { get; set; }
    }
}