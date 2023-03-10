import inquirer from 'inquirer';
import { addServerToConfigFile } from '../utils/Config.js';

export default class UpdateConfig {
  public static async run() {
    // We need gather information on what we want to do.
    // We assume we want to add a new server so let's ask the server details
    const { name, ip, port, username, password } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the server?',
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
        validate: (value: string) => {
          if (value.length > 0) {
            return true;
          }

          return 'Please enter a password';
        }
      }
    ]);

    addServerToConfigFile({
      name,
      ip,
      port: parseInt(port),
      username,
      password
    });

    console.log('Server added to config file');
  }
}
