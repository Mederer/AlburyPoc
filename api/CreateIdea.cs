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

namespace Albury.Function
{
    public static class CreateIdea
    {
        [FunctionName("CreateIdea")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            CosmosClient client = new CosmosClient(connectionString: Environment.GetEnvironmentVariable("CosmosDbConnectionSetting"));
            Database database = client.GetDatabase("AlburyPoc");
            Container container = database.GetContainer("Ideas");

            var response = await container.CreateItemAsync<Idea>(new Idea { id = Guid.NewGuid().ToString(), title = "New Idea", stage = "New" });

            return new OkObjectResult(response.Resource);
        }
    }
}
