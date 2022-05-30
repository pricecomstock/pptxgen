function titleCase(string) {
  return string.replace(/\b[a-z]/g, match => match.toUpperCase());
}

module.exports = {
  titleCase
};
