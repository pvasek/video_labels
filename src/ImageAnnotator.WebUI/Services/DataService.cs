using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using ImageAnnotator.WebUI.Entities;
using Newtonsoft.Json;

namespace ImageAnnotator.WebUI.Services
{
    public class DataService 
    {
        private List<ImageGroup> _groups;
        private string _rootDataPath;

        private DataService() 
        {            
        }
        
        public static DataService CreateFromFolder(string path)
        {
            var groups = new List<ImageGroup>();
            var subdirs = Directory.GetDirectories(path);
            foreach (var dir in subdirs) 
            {
                // this returns the name of the leaf directory
                var id = Path.GetFileName(dir);
                groups.Add(new ImageGroup 
                {
                    Id = id,
                    Name = id,
                    Files = Directory
                        .GetFiles(dir)
                        .Select(Path.GetFileName)
                        .ToList(),
                    Labels = CreateDataLabels(dir)
                });
            }

            return new DataService { 
                _groups = groups,
                _rootDataPath = path,
            };                  
        }

        internal void SetImageGroupLabels(ImageGroup data, string imageId, DataLabels labels)
        {
            data.Labels[imageId] = labels;
            var path = Path.Combine(_rootDataPath, data.Id, "labels.json");
            var json = JsonConvert.SerializeObject(data.Labels);
            File.WriteAllText(path, json);
        }

        private static Dictionary<string, DataLabels> CreateDataLabels(string groupPath)
        {
            var file = Path.Combine(groupPath, "labels.json");
            if (File.Exists(file)) 
            {
                var content = File.ReadAllText(file);
                return JsonConvert.DeserializeObject<Dictionary<string, DataLabels>>(
                    content
                );
            }
            else {
                return new Dictionary<string, DataLabels>();
            }            
        }

        public Task<List<ImageGroup>> GetGroupsAsync() 
            => Task.FromResult(_groups);

        public Task<ImageGroup> GetGroupAsync(string id) 
            => Task.FromResult(_groups.Single(i => i.Id == id));
            
        public async Task SetImageGroupLabels(ImageGroup group, Dictionary<string, DataLabels> labels)
        {
            var groupLabels = new Dictionary<string, DataLabels>(labels);
            foreach(var pair in group.Labels) 
            {
                groupLabels[pair.Key] = pair.Value;
            }
            var file = Path.Combine(_rootDataPath, group.Id, "labels.json");            
            var content = JsonConvert.SerializeObject(groupLabels);
            await File.WriteAllTextAsync(file, content);
        }
    }
}