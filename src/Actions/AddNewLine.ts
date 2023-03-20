import inquirer from 'inquirer';
import { getConfigFile } from '../utils/Config.js';
import SftpClientHandler from '../utils/SftpClientHandler.js';

export default class AddNewLine {
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
    const { file, newLine } = await inquirer.prompt([
      {
        type: 'input',
        name: 'file',
        message: 'What is the file you want to update from?'
      },
      {
        type: 'input',
        name: 'newLine',
        message: 'What is the new line?'
      }
    ]);

    // Now we want to update all the servers
    for (const server of serversToUpdate) {
      const fileContent = (await SftpClientHandler.getFileContent(server, file)) as string;
      if (!fileContent) {
        console.log(`Could not get file from ${server.name}`);
        continue;
      }
      const updatedFileContent = await this.addNewLine(newLine, fileContent.toString());
      await SftpClientHandler.updateFile(server, file, updatedFileContent);
      console.log(`Successfully updated ${server.name} with the following: ${updatedFileContent}`);
    }
  }

  private static async addNewLine(newLine: string, fileContent: string) {
    // Want to break a new line and add it
    const newFileContent = fileContent + '\n' + newLine;
    return newFileContent;
  }
}
