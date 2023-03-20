# Update Manager

This is sort of biased project, based on updating servers with similar map structure and update it with help of SFTP.

-   [Usage](#usage)
    -   [Installing & Building](#installing--building)
    -   [Running](#running)
-   [Tools](#tools)
-   [Requirements](#requirements)
-   [Platforms](#platforms)

# Usage

Instructions on building and running

### Installing & Building

1. `npm i`
2. Build the project using typescript and run the following: `npm run build`

### Running

Now when you've built the project you can run it using the following: `npm run start`
Is config based so you'll either manually add servers in the config or use the CLI. Once you have servers you can make an update to the servers

When starting the process of updating the servers you can either update specific ones or all. You'll be prompted the which folder you want to update, use the full path by copying it.
It will check if the path is correct so an example can look like: `C:\dev\testing_upload`

You will also be prompted which directory on the servers you want to update to.

Once done it will start updating each server and log once done for each server.

# Tools

-   Possible to add servers in a config
-   Possible to edit servers in the config
-   Send updates to servers with help of folders for multiple servers
-   Replace a keyword in a whole file for multiple servers
-   Add a new line to a file for multiple servers

# Requirements

-   Node.JS >= 16
-   TypeScript

# Platforms

| Platform | Tested |
| -------- | ------ |
| Windows  | ✅     |
| Ubuntu   | ❌     |
| Debian   | ❌     |
| Arch     | ❌     |
