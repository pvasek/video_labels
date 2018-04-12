using System;

namespace ImageAnnotator.WebUI.Dtos
{
    public class ImageDto 
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string AnnotationJson { get; set; }
    }
}