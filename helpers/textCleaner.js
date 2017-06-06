const textCleaner = (string) => {
  return string.replace(/['",]+/g, '');
}

module.exports = textCleaner;
