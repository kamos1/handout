const userCleaner = (string) => {
  return string.replace(/['",<>]+/g, '');
}

module.exports = userCleaner;
