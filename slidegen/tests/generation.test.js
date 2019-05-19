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
  const grammarRaw = grammar.raw;
  for (const key in grammarRaw) {
    if (grammarRaw.hasOwnProperty(key)) {
      const resolvedStringList = grammarRaw[key];
      expect(resolvedStringList.every(str => typeof str === "string"));
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

test("No unclosed ## in grammar", () => {
  const grammarRaw = grammar.raw;
  for (const key in grammarRaw) {
    if (grammarRaw.hasOwnProperty(key)) {
      const resolvedStringList = grammarRaw[key];
      expect(
        resolvedStringList.every(
          // No odd numbers of # in a template
          // This will break if I ever put an escaped # in
          resolvedString => {
            let withoutNumberSigns = resolvedString.replace(/#\d+/g, "");

            let exceptions = ["C#", "F#", /^#$/];
            if (exceptions.some(ex => withoutNumberSigns.match(ex))) {
              return true;
            } else {
              let justHashes = withoutNumberSigns.replace(/[^#]/g, "");
              let hasEvenNumberOfHashes = justHashes.length % 2 !== 1;
              if (hasEvenNumberOfHashes) {
                return true;
              } else {
                // console.log(resolvedString);
                return false;
              }
            }
          }
        )
      ).toBe(true);
    }
  }
});

test("Grammar correctly adds -ing", () => {
  grammar.pushRules("stepTest", ["step"]);
  expect(grammar.flatten("#stepTest.ing#")).toBe("stepping");

  grammar.pushRules("nameTest", ["name"]);
  expect(grammar.flatten("#nameTest.ing#")).toBe("naming");
});
