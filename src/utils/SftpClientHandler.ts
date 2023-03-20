import sftp from 'ssh2-sftp-client';
import { Server } from './Config.js';

export default class SftpClientHandler {
  static async updateFile(server: Server, file: string, fileContent: string) {
    const sftpClient = new sftp();
    const config = {
      host: server.ip,
      port: server.port,
      username: server.username,
      password: server.password
    };

    try {
      await sftpClient.connect(config);
      await sftpClient.append(Buffer.from(fileContent), file);
    } catch (err) {
      console.error(err);
    } finally {
      sftpClient.end();
    }
  }

  static async getFileContent(server: Server, file: string) {
    const sftpClient = new sftp();
    const config = {
      host: server.ip,
      port: server.port,
      username: server.username,
      password: server.password
    };

    try {
      await sftpClient.connect(config);
      return await sftpClient.get(file);
    } catch (err) {
      console.error(err);
    } finally {
      console.log(`Got file from ${server.name}`);
      sftpClient.end();
    }
  }

  static async uploadFolder(server: Server, from: string, to: string) {
    const sftpClient = new sftp();
    const config = {
      host: server.ip,
      port: server.port,
      username: server.username,
      password: server.password
    };

    try {
      await sftpClient.connect(config);
      await sftpClient.uploadDir(from, to);
    } catch (err) {
      console.error(err);
    } finally {
      console.log('Successfully updated server: ' + server.name);
      sftpClient.end();
    }
  }
}
