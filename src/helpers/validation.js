const validateLink = (link) => {
  // const LINK_REGEX =
  // /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]
  // {1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  const LINK_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
  const isValid = LINK_REGEX.test(link);
  return isValid;
};

export const linkIsValid = (newLink) => {
  const newLinkIsValid = validateLink(newLink);
  return !!newLinkIsValid;
};

export const substituteWithAnotherFunction = () => true;
