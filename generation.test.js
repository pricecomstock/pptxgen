const grammar = require("./slidegen/sources/grammar/grammar");
// console.log(Object.keys(grammar.raw));
test("All grammar templates are resolveable", () => {
  let keys = Object.keys(grammar.raw);
  let templates = keys.map(key => `#${key}#`);
  //   let unresovlveableTemplates = templates.filter((template) => {
  //       return grammar.flatten(template)
  //   })
  templates.forEach(template => {
    // console.log(template, grammar.flatten(template));
    expect(grammar.flatten(template)).not.toMatch(/\(\(/);
  });
});

// test("No grammars refer to a template that doesn't exist.", () => {
//   let keys = Object.keys(grammar.raw);
// });
