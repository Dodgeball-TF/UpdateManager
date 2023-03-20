import inquirer from 'inquirer';
import fs from 'fs';
import { getConfigFile } from '../utils/Config.js';
import SftpClientHandler from '../utils/SftpClientHandler.js';

export default class UpdateServers {
  public static async run() {
    // We first want to make a select of all the servers, either select all or select specific ones
    // Once we selected the servers we want to prompt where we want to update from, aka a folder in our machine
    // Then we want to ask where on the server folder we want to update to

    const config = getConfigFile();
    const servers = config.servers;
    // if it's empty then just return
    if (servers.length === 0) {
      console.log('No servers to update');
      return;
    }

    const { server } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'server',
        message: 'Which server(s) would you like to update?',
        choices: [
          'All Servers',
          ...servers.map((server) => {
            return {
              name: server.name,
              value: server
            };
          })
        ]
      }
    ]);

    const serversToUpdate = server.includes('All Servers') ? servers : server;

    // Get the paths we want to update from and to
    const { from, to } = await inquirer.prompt([
      {
        type: 'input',
        name: 'from',
        message: 'What is the path you want to update from?',
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }

          // Check if this path exists
          if (!fs.existsSync(value)) {
            return 'Please enter a valid path';
          }

          return 'Please enter a path';
        }
      },
      {
        type: 'input',
        name: 'to',
        message: 'What is the path you want to update to?',
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }

          return 'Please enter a path';
        }
      }
    ]);

    // Now we want to update all the servers
    for (const server of serversToUpdate) {
      await SftpClientHandler.uploadFolder(server, from, to);
    }
  }
}
