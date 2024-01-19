import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const validateLink = (link) => {
  const linkRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  const isValid = linkRegex.test(link);
  return isValid;
};

const useCreateNewUnit = () => {
  const ERRORS = {
    newLink: 'Invalid Link',
  };

  const INIT_NEW_ENTITY_TO_BE = {
    id: uuidv4(),
    name: '',
    type: '',
    leader: '',
    mainLinks: [],
    briefDescription: 'Content Publishing',
  };
  const [newEntityToBe, setNewEntityToBe] = useState(INIT_NEW_ENTITY_TO_BE);
  const [mainLinks, setMainLinks] = useState('');
  const [newLink, setNewLink] = useState('');
  const [errors] = useState(ERRORS);

  const addNewLink = () => {
    const newLinkIsValid = validateLink(newLink);
    if (newLinkIsValid) {
      setMainLinks([...mainLinks, newLink]);
      setNewLink('');
    }
  };

  return {
    errors,
    setNewLink,
    addNewLink,
  };
};

export default useCreateNewUnit;
