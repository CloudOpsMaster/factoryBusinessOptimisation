using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using DbUp;
using System;
using PMS.Configs;
using PMS.Loggers;

namespace PMS.Filters
{
    public class DatabaseInitFilter : IStartupFilter
    {
        private readonly DatabaseConfig _config;
        private readonly DbLogger<DatabaseInitFilter> _logger;

        public DatabaseInitFilter(DatabaseConfig config, DbLogger<DatabaseInitFilter> logger)
        {
            _config = config;
            _logger = logger;
        }

        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
        {
            var connectionString = _config.ConnectionString;

            EnsureDatabase.For.PostgresqlDatabase(connectionString);

            var dbUpgradeEngineBuilder = DeployChanges.To
                .PostgresqlDatabase(connectionString)
                .WithScriptsEmbeddedInAssembly(typeof(Program).Assembly)
                .WithTransaction()
                .LogTo(_logger);

            var dbUpgradeEngine = dbUpgradeEngineBuilder.Build();
            if (dbUpgradeEngine.IsUpgradeRequired())
            {
                _logger.WriteInformation("Upgrades have been detected. Upgrading database now...");
                var operation = dbUpgradeEngine.PerformUpgrade();
                if (operation.Successful)
                {
                    _logger.WriteInformation("Upgrade completed successfully");
                }

                _logger.WriteInformation("Error happened in the upgrade. Please check the logs");
            }

            return next;
        }
    }
}
