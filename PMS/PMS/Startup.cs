using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using PMS.Configs;
using PMS.Filters;
using PMS.Loggers;

namespace PMS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddLogging();
            services.AddCors();
            services.AddTransient<IStartupFilter, DatabaseInitFilter>();
            services.AddTransient<DbLogger<DatabaseInitFilter>>();

            services.Configure<DatabaseConfig>(Configuration.GetSection("DatabaseConfig"));
            services.AddSingleton(provider =>
            {
                var configValue = provider.GetRequiredService<IOptions<DatabaseConfig>>().Value;
                return configValue;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseCors(builder => builder.WithOrigins("http://localhost:4200"));
        }
    }
}
