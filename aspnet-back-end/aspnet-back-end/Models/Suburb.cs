using System.Text.Json.Serialization;

namespace aspnet_back_end.Models
{
    public class Suburb
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("suburbName")]
        public string SuburbName { get; set; } = "";

        [JsonPropertyName("latitude")]
        public double Latitude { get; set; }

        [JsonPropertyName("longitude")]
        public double Longitude { get; set; }
    }
}