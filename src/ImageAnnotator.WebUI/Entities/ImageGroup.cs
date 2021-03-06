using System.Collections.Generic;

namespace ImageAnnotator.WebUI.Entities
{
    public class ImageGroup 
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<string> Files { get; set; }
        public Dictionary<string, DataLabels> Labels { get; set; }
    }
}