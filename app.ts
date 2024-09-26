import dotenv from "dotenv";
dotenv.config(); // .env 파일 로드
import { WebClient } from "@slack/web-api";
import * as chokidar from "chokidar";
import * as fs from "fs";
import * as path from "path";

// Slack 토큰과 채널 ID 설정
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

console.log("check SLACK_TOKEN: ", SLACK_TOKEN);
console.log("check CHANNEL_ID: ", CHANNEL_ID);

// 감시할 디렉토리 설정
const WATCH_DIRECTORY = path.join(__dirname, "uploadFiles");

const client = new WebClient(SLACK_TOKEN);

async function uploadFile(filePath: string): Promise<void> {
  try {
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    const result = await client.files.uploadV2({
      channel_id: CHANNEL_ID,
      file: fileBuffer,
      filename: fileName,
      title: fileName,
    });

    console.log(`File uploaded successfully: ${fileName}`);
  } catch (error) {
    console.error(`Error uploading file: ${error}`);
  }
}

if (!fs.existsSync(WATCH_DIRECTORY)) {
  fs.mkdirSync(WATCH_DIRECTORY);
  console.log(`Created directory: ${WATCH_DIRECTORY}`);
}

const watcher = chokidar.watch(WATCH_DIRECTORY, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

watcher
  .on("add", (filePath) => {
    console.log(`File ${filePath} has been added`);
    uploadFile(filePath);
  })
  .on("error", (error) => console.error(`Watcher error: ${error}`));

console.log(`Watching for files in ${WATCH_DIRECTORY}`);
