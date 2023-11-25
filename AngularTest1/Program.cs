
using AngularTest1.Data;
using ElectronNET.API;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseElectron(args);

// Is optional, but you can use the Electron.NET API-Classes directly with DI (relevant if you wont more encoupled code)
builder.Services.AddElectron();
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<DataContext>(options =>
 options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;
await app.StartAsync();

// Open the Electron-Window here
await Electron.WindowManager.CreateWindowAsync();

app.WaitForShutdown();