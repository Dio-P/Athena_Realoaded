import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useCreateNewUnit = ({
  name,
  type,
  newLink,
  teamsResponsible,
  leader,
  mainLinks,
  briefDescription,
  docs,
  tags,
  technologies
}) => {
  const ERRORS = {
    newLink: 'Invalid Link',
  };

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
  const [newEntityToBe, setNewEntityToBe] = useState(newEntityConstructor);

  // const [errors] = useState(ERRORS);

  const addNewTeamResponsible = (newTeam) => {
    set
  };

  const addNewLink = (newLink) => {
    setMainLinks([...mainLinks, newLink]) 
  }

  return {
    // errors,
    addNewLink,
    addNewTeamResponsible,
  };
};

export default useCreateNewUnit;

// create useAddNewEntity query,
// send the new object to this and then have the id of the new object returned
// in order to be added as child to the parent
// with an update query
// do this with the id returned from the first query async

// find a way to render the errors and the warning for each component
