import { readFileSync, readdirSync } from "node:fs";

const contentDirectory = new URL("../content/", import.meta.url);
let failed = false;

for (const file of readdirSync(contentDirectory).filter((file) => file.endsWith(".json"))) {
  try {
    JSON.parse(readFileSync(new URL(file, contentDirectory), "utf8"));
    console.log(`Valid JSON: content/${file}`);
  } catch (error) {
    failed = true;
    console.error(`Invalid JSON: content/${file}\n${error.message}`);
  }
}

if (failed) process.exitCode = 1;
