import fs from 'fs';

export interface Server {
  // We want to have mostly information on the server
  name: string;
  ip: string;
  port: number;
  username: string;
  password: string;
}

export interface Config {
  servers: Server[];
}

export function getConfigFilePath() {
  // Assuming is in the root of the project
  return './config.json';
}

export function hasConfigFile() {
  return fs.existsSync(getConfigFilePath());
}

export function generateConfigFile() {
  const config = {
    servers: []
  };

  fs.writeFileSync(getConfigFilePath(), JSON.stringify(config, null, 2));
}

export function createConfigFile() {
  if (!hasConfigFile()) {
    generateConfigFile();
  }
}

export function getConfigFile(): Config {
  return JSON.parse(fs.readFileSync(getConfigFilePath(), 'utf-8'));
}

export function addServerToConfigFile(server: Server) {
  const config = getConfigFile();

  // Check if name is already in use
  const serverExists = config.servers.some((s) => s.name === server.name);
  if (serverExists) {
    throw new Error('Server name already exists');
  }

  config.servers.push(server);

  fs.writeFileSync(getConfigFilePath(), JSON.stringify(config, null, 2));
}

export function updateServerInConfigFile(name: string, server: Server) {
  const config = getConfigFile();

  const index = config.servers.findIndex((s) => s.name === name);

  config.servers[index] = server;

  fs.writeFileSync(getConfigFilePath(), JSON.stringify(config, null, 2));
}
