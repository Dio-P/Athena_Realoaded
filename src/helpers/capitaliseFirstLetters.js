const capitaliseFirstLetters = (string) => {
  if (string) {
    const countWords = string.split(' ');
    if (countWords.length === 1) {
      return (countWords[0].charAt(0).toUpperCase()
        + string.slice(1));
    }
    if (countWords.length > 1) {
      return countWords.map((word) => (
        word.charAt(0).toUpperCase()
        + word.slice(1)
      )).join(' ');
    }
  }

  return '...';
};

export default capitaliseFirstLetters;
