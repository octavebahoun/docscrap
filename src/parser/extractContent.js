/**
 * Extrait les balises utiles du HTML
 */


// src/parser/extractContent.js


const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const extractContent = () => {
  const inputPath = path.join(
    process.cwd(),
    "data",
    "raw",
    "laravel-eloquent.html"
  );

  const html = fs.readFileSync(inputPath, "utf-8");
  const $ = cheerio.load(html);

  const course = {
    language: "React",
    course: "Hooks",
    title: $("h1").first().text().trim(),
    sections: [],
    source: "https://react.dev"
  };

  $("main h2").each((_, h2) => {
    const section = {
      title: $(h2).text().trim(),
      content: []
    };

    let element = $(h2).next();

    while (element.length && element[0].tagName !== "h2") {
      if (element.is("p")) {
        section.content.push({
          type: "text",
          value: element.text().trim()
        });
      }

      if (element.is("pre")) {
        section.content.push({
          type: "code",
          value: element.find("code").text()
        });
      }
      
      if (element.is("ul")) {
        section.content.push({
          type: "list",
          value: element.text().trim()
        });
      }


      element = element.next();
    }

    course.sections.push(section);
  });

  const outputPath = path.join(
    process.cwd(),
    "data",
    "processed",
    "laravel-eloquent.json"
  );

  fs.writeFileSync(outputPath, JSON.stringify(course, null, 2), "utf-8");

  console.log("Contenu extrait et structuré avec succès ✅");
};

extractContent();
