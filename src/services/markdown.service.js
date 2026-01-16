/**
 * Service de conversion HTML → Markdown
 * À implémenter ultérieurement
 */

// src/services/markdown.service.js

const fs = require('fs')
const path = require('path')

const generateMarkdown = () => {
  const inputPath = path.join(
    process.cwd(),
    "data",
    "processed",
    "laravel-eloquent.json"
  );

  const course = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

  let markdown = `# ${course.title}\n\n`;

  course.sections.forEach(section => {
    markdown += `## ${section.title}\n\n`;

    section.content.forEach(item => {
      if (item.type === "text") {
        markdown += `${item.value}\n\n`;
      }

      if (item.type === "code") {
        markdown += "```js\n";
        markdown += `${item.value}\n`;
        markdown += "```\n\n";
      }

      if (item.type === "list") {
        const lines = item.value.split("\n");
        lines.forEach(line => {
          if (line.trim()) {
            markdown += `- ${line.trim()}\n`;
          }
        });
        markdown += "\n";
      }
    });
  });

  const outputPath = path.join(
    process.cwd(),
    "data",
    "processed",
    "laravel-eloquent.md"
  );

  fs.writeFileSync(outputPath, markdown, "utf-8");

  console.log("Markdown généré avec succès ✅");
};

generateMarkdown();
