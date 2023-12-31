import { Command, Option } from 'commander';

import { env } from './commands/env/index.js';
import { collect } from './utils/collect.js';
import { logger } from './utils/logger.js';
import { metadata } from './utils/metadata.js';

try {
  const program = new Command();

  program.name(metadata.name).description(metadata.description).version(metadata.version);

  program
    .command('env')
    .action(env)
    .description('generate a .env file in the current directory.')
    .argument('[keyval...]', 'optional list of env vars with syntax KEY=VALUE', collect, [])
    .option('-s, --sql [sql]', 'create an sql database')
    .option('-u, --user <user>', 'specify mysql username')
    .option('-p, --password [password]', 'specify mysql password')
    .option('-d, --debug [debug]', 'log debugging data')
    .addOption(
      // use constructor to declare allowed choices
      new Option('-m, --module <module>', 'specify module env setup').choices(['12', '13', '14']),
    );

  program.parse();
} catch (error) {
  logger.error(error);
}
