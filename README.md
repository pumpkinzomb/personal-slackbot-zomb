# Slack File Sharing Bot Sample

This repository contains a sample Slack bot that demonstrates automated file sharing in a Slack channel.

## Features

- Monitors a specified local directory for new files
- Automatically uploads new files to a designated Slack channel
- Written in TypeScript for better type safety and developer experience

## Prerequisites

- Node.js (version 16 or higher recommended)
- A Slack workspace with permissions to add bots and upload files

## Setup

1. Clone this repository
2. Install dependencies: \`npm install\`
3. Configure your Slack bot token and channel ID in \`src/app.ts\`
4. Build the project: \`npm run build\`
5. Start the bot: \`npm start\`

## Usage

Once the bot is running, it will monitor the \`uploadFiles\` directory in the project root. Any new files added to this directory will be automatically uploaded to the specified Slack channel.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
