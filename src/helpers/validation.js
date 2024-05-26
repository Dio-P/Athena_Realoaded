const validateLink = () => {
  // const LINK_REGEX =
  // /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]
  // {1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  // const LINK_REGEX = /^https?:\/\/(www\.)?
  // [-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
  // const LINK_REGEX = /\bwww\b/;
  // const isValid = LINK_REGEX.test(link);
  const isValid = true;
  return isValid;
};

export const linkIsValid = (newLink) => {
  const newLinkIsValid = validateLink(newLink);
  return !!newLinkIsValid;
};

export const substituteWithAnotherFunction = () => true;
