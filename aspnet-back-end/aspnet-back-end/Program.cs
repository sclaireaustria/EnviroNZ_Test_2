using System.Text.Json;
using aspnet_back_end.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowLocalhost3000");

app.MapControllers();

// Test endpoint
app.MapGet("/", () => "Hello world!");

// Load the suburb data
var suburbs = JsonSerializer.Deserialize<List<Suburb>>(
    File.ReadAllText("suburbs.json")
);

// API /api/suburbs: Get all suburbs from list
app.MapGet("/api/suburbs", () =>
{
    return Results.Ok(suburbs); 
});

// API /api/closest-suburb: Find the closest suburb
app.MapPost("/api/closest-suburb", (LatLng input) =>
{
    var closest = suburbs!
        .OrderBy(s => Haversine(input.Latitude, input.Longitude, s.Latitude, s.Longitude))
        .FirstOrDefault();

    return Results.Ok(closest);
});

double Haversine(double lat1, double lon1, double lat2, double lon2)
{
    const double R = 6371; // km
    var dLat = Math.PI / 180 * (lat2 - lat1);
    var dLon = Math.PI / 180 * (lon2 - lon1);

    var a = Math.Sin(dLat/2) * Math.Sin(dLat/2) +
            Math.Cos(Math.PI/180*lat1) * Math.Cos(Math.PI/180*lat2) *
            Math.Sin(dLon/2) * Math.Sin(dLon/2);

    var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1-a));
    return R * c;
}

app.Run();

// Model 
record LatLng (double Latitude, double Longitude);

//record Suburb(int Id, string Name, double Latitude, double Longitude);
