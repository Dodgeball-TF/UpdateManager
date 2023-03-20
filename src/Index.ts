// Goal:
// We want to prompt options to the user what sort of action they want to take
// 1. Update the config file
// 2. Edit the config file
// 3. Start the process of updating the servers

import inquirer from 'inquirer';
import { createConfigFile, hasConfigFile } from './utils/Config.js';
import UpdateConfig from './Actions/UpdateConfig.js';
import EditConfig from './Actions/EditConfig.js';
import UpdateServers from './Actions/UpdateServers.js';
import UpdateSingleLine from './Actions/UpdateSingleLine.js';
import AddNewLine from './Actions/AddNewLine.js';

const run = async () => {
  // On initial bootstrap here we should check if have a config file
  // If not we should create one

  if (!hasConfigFile()) {
    createConfigFile();
    console.log('Config file created');
  }

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'Add server to the config file',
          value: 'addServer'
        },
        {
          name: 'Edit a server in the config file',
          value: 'editConfig'
        },
        {
          name: 'Start the process of updating the servers',
          value: 'updateServers'
        },
        {
          name: 'Update singe line in a file',
          value: 'updateSingleLine'
        },
        {
          name: 'Add new line in a file',
          value: 'addNewLine'
        }
      ]
    }
  ]);

  switch (action) {
    case 'addServer':
      await UpdateConfig.run();
      break;
    case 'editConfig':
      await EditConfig.run();
      break;
    case 'updateServers':
      await UpdateServers.run();
      break;
    case 'updateSingleLine':
      await UpdateSingleLine.run();
      break;
    case 'addNewLine':
      await AddNewLine.run();
      break;
  }
};

run();
