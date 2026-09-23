import { readFileSync, readdirSync } from "node:fs";

const contentDirectory = new URL("../content/", import.meta.url);
let failed = false;

for (const file of readdirSync(contentDirectory).filter((file) => file.endsWith(".json"))) {
  try {
    const content = JSON.parse(readFileSync(new URL(file, contentDirectory), "utf8"));

    if (file === "publications.json") {
      for (const publication of content.publications ?? []) {
        if (
          publication.status === "under_review" &&
          ("venue" in publication || "venue_type" in publication)
        ) {
          throw new Error(
            `Under-review publication ${publication.id} must not expose venue or venue_type`,
          );
        }
      }
    }

    console.log(`Valid JSON: content/${file}`);
  } catch (error) {
    failed = true;
    console.error(`Invalid JSON: content/${file}\n${error.message}`);
  }
}

if (failed) process.exitCode = 1;
