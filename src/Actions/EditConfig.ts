import inquirer from 'inquirer';
import { getConfigFile, updateServerInConfigFile } from '../utils/Config.js';

export default class EditConfig {
  public static async run() {
    // We first get our config and list all servers
    // Then make them pick and update it
    // Then save it

    const config = getConfigFile();
    const servers = config.servers;
    // if it's empty then just return
    if (servers.length === 0) {
      console.log('No servers to edit');
      return;
    }

    const { server } = await inquirer.prompt([
      {
        type: 'list',
        name: 'server',
        message: 'Which server would you like to edit?',
        choices: servers.map((server) => {
          return {
            name: server.name,
            value: server
          };
        })
      }
    ]);

    // Get config for the server
    const serverConfig = servers.find((s) => s.name === server.name);

    if (!serverConfig) {
      console.log('Server not found');
      return;
    }

    const { name, ip, port, username, password } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the server?',
        default: serverConfig.name,
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }

          return 'Please enter a name';
        }
      },
      {
        type: 'input',
        name: 'ip',
        message: 'What is the IP of the SFTP server?',
        default: serverConfig.ip,
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }

          return 'Please enter an IP';
        }
      },
      {
        type: 'input',
        name: 'port',
        message: 'What is the port of the SFTP server?',
        default: serverConfig.port,
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }

          return 'Please enter a port';
        }
      },
      {
        type: 'input',
        name: 'username',
        message: 'What is the username of the SFTP server?',
        default: serverConfig.username,
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }

          return 'Please enter a username';
        }
      },
      {
        type: 'input',
        name: 'password',
        message: 'What is the password of the SFTP server?',
        default: serverConfig.password,
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }

          return 'Please enter a password';
        }
      }
    ]);

    // Update it now
    updateServerInConfigFile(serverConfig.name, {
      name,
      ip,
      port,
      username,
      password
    });
  }
}
