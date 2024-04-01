using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Cosmos;
using System.Runtime.CompilerServices;
using System.Collections.Generic;

namespace Albury.Function
{

    public class Idea
    {
        public string id { get; set; }
        public string title { get; set; }

        public string stage {get;set;}
    }

    public static class IdeaManager
    {
        [FunctionName("IdeaManager")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {

            CosmosClient client = new CosmosClient(connectionString: Environment.GetEnvironmentVariable("CosmosDbConnectionSetting"));
            Database database = client.GetDatabase("AlburyPoc");
            Container container = database.GetContainer("Ideas");

            switch (req.Method)
            {
                case "GET":
                    return await GetIdeas(container);
                default:
                    return new BadRequestResult();
            }

        }

        public static async Task<IActionResult> GetIdeas(Container container)
        {
            QueryDefinition query = new QueryDefinition("SELECT * FROM c");
            FeedIterator<Idea> resultSet = container.GetItemQueryIterator<Idea>(query);
            List<Idea> ideas = new();

            while (resultSet.HasMoreResults)
            {
                FeedResponse<Idea> response = await resultSet.ReadNextAsync();
                ideas.AddRange(response);
            }

            return new OkObjectResult(ideas);
        }
    }
}
