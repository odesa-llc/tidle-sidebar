import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFiles = [
  path.resolve(__dirname, "../dist/main.js"),
  path.resolve(__dirname, "../manifest.json"),
  path.resolve(__dirname, "../styles.css"),
];

const destDir = path.resolve(
  __dirname,
  "C:/Users/Ramsey/Documents/Obsidian Vault/.obsidian/plugins/tidle-obsidian-app"
);

// Ensure the destination folder exists
fs.ensureDirSync(destDir);

// Copy files
sourceFiles.forEach((file) => {
  const fileName = path.basename(file);
  fs.copySync(file, path.join(destDir, fileName), { overwrite: true });
  console.log(`Copied ${fileName} to ${destDir}`);
});

console.log("All files copied to Obsidian plugins folder!");