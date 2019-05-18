const grammar = require("../sources/grammar/grammar");
// const fs = require("fs");
// console.log(Object.keys(grammar.raw));
test("No generations get ((unresolved))", () => {
  let keys = Object.keys(grammar.raw);
  let templates = keys.map(key => `#${key}#`);
  //   let unresovlveableTemplates = templates.filter((template) => {
  //       return grammar.flatten(template)
  //   })
  // TODO Don't test templates that call on other templates in this method maybe?
  templates.forEach(template => {
    // console.log(template, grammar.flatten(template));
    expect(grammar.flatten(template)).not.toMatch(/\(\(/);
  });
});

test("Every item in grammar is a string", () => {
  for (const key in grammar.raw) {
    if (grammar.raw.hasOwnProperty(key)) {
      const resolvedStringList = grammar.raw[key];
      resolvedStringList.forEach(str => {
        // if (typeof str !== "string") {
        //   console.log(str);
        // }
        expect(typeof str).toBe("string");
      });
    }
  }
});

test("Every #template# has a corresponding template in grammar", () => {
  const grammarRaw = grammar.raw;
  let keys = Object.keys(grammarRaw);
  for (const key in grammarRaw) {
    if (grammarRaw.hasOwnProperty(key)) {
      const resolvedStringList = grammarRaw[key];
      // console.log("resolvedStringList", resolvedStringList);
      resolvedStringList.forEach(resolvedString => {
        let matches = resolvedString.match(/#.+?#/g);
        if (matches) {
          matches.forEach(m => {
            let templateStripped = m.replace(/#/g, "").split(/\./g)[0];
            expect(keys).toContain(templateStripped);
            // console.log(templateStripped);
          });
        }
      });
    }
  }
  // fs.writeFileSync(
  //   "./slidegen/tests/output/grammar.json",
  //   JSON.stringify(grammarRaw),
  //   "utf8"
  // );
});
