import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const validateLink = (link) => {
  const LINK_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  const isValid = LINK_REGEX.test(link);
  return isValid;
};

const useCreateNewUnit = ({
  name,
  type,
  
}) => {
  const ERRORS = {
    newLink: 'Invalid Link',
  };

  const [newEntityToBe, setNewEntityToBe] = useState(undefined);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [teamsResponsible, setTeamsResponsible] = useState(['']);
  const [leader, setLeader] = useState('');
  const [mainLinks, setMainLinks] = useState([]);
  const [briefDescription, setBriefDescription] = useState('');

  const [docs, setDocs] = useState([]);
  const [tags, setTags] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  const [errors] = useState(ERRORS);

  const newEntityConstructor = {
    id: uuidv4(),
    children: [],
    name,
    type,
    teamsResponsible,
    leader,
    mainLinks,
    briefDescription,
    properties: {
      docs,
      tags,
      technologies,
    },
    // connections: {
    // audienceFacing: false,
    // receivesDataFrom: undefined,
    // givesDataTo: undefined,
    // },
    //   interactions: {
    //     isLinkUpToDate: true,
    //     comments: [
    //       {
    //         timeStamp: "some date and time",
    //         userId: "some user Id or name",
    //         text: "some text"
    //       }
    //     ],
    //     requestedActions: [
    //       {
    //         timeStamp: "some date and time",
    //         typeOfAction: "some action type",
    //         description: "some coments",
    //         requestingUserId: "some user Id or name"
    //       }
    //     ]
    //   },
  };

  const addNewLink = (newLink) => {
    const newLinkIsValid = validateLink(newLink);
    if (newLinkIsValid) {
      setMainLinks([...mainLinks, newLink]);
      return true;
    } else if (!newLinkIsValid) {
      // set new error to display
      console.log('link not valid');
      return false;
    }
  };

  const addNewTeamResponsible = (newLink) => {
    const newLinkIsValid = validateLink(newLink);
    if (newLinkIsValid) {
      setMainLinks([...mainLinks, newLink]);
      setNewLink('');
    }
  };

  return {
    errors,
    addNewLink,
  };
};

export default useCreateNewUnit;

// create useAddNewEntity query,
// send the new object to this and then have the id of the new object returned
// in order to be added as child to the parent
// with an update query
// do this with the id returned from the first query async

// find a way to render the errors and the warning for each component
