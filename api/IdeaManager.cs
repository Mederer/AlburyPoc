using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos;
using System.Collections.Generic;

namespace Albury.Function
{
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
                case "POST":
                    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                    CreateIdeaRequest idea = JsonConvert.DeserializeObject<CreateIdeaRequest>(requestBody);
                    return await CreateIdea(container, idea);
                default:
                    return new BadRequestResult();
            }

        }

        public static async Task<IActionResult> GetIdeas(Container container)
        {
            QueryDefinition query = new QueryDefinition("SELECT * FROM c");
            FeedIterator<Idea> resultSet = container.GetItemQueryIterator<Idea>(query);
            List<Idea> ideas = new List<Idea>();

            while (resultSet.HasMoreResults)
            {
                FeedResponse<Idea> response = await resultSet.ReadNextAsync();
                ideas.AddRange(response);
            }

            return new OkObjectResult(ideas);
        }

        public static async Task<IActionResult> CreateIdea(Container container, CreateIdeaRequest idea)
        {
            var response = await container.CreateItemAsync<Idea>(new Idea { id = Guid.NewGuid().ToString(), title = idea.title, stage = idea.stage });

            return new OkObjectResult(response.Resource);
        }
    }
}
