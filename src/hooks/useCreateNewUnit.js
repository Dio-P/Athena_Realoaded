// import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useCreateNewUnit = (
  nameOnInput,
  typeOnInput,
  teamsResponsibleOnInput,
  // leaderOnInput,
  mainLinks,
  briefDescriptionOnInput,
  allDocsOfUnit,
  allTagsOfUnit,
  allTechnologiesOfUnit,
) => {
  const newEntityConstructor = () => ({
    id: uuidv4(),
    children: [],
    name: nameOnInput,
    type: typeOnInput,
    teamsResponsible: teamsResponsibleOnInput,
    // leader: leaderOnInput,
    mainLinks,
    briefDescription: briefDescriptionOnInput,
    properties: {
      docs: allDocsOfUnit,
      tags: allTagsOfUnit,
      technologies: allTechnologiesOfUnit,
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
  });

  const handleCreateNewUnit = () => {
    console.log('handle handleCreateNewUnit');
    console.log('newEntityConstructor', newEntityConstructor());
  };

  // .....................!!!!!!!!!!!!!!
  // we need some logic that will:
  //  check if the strings for the document exist as units in the database
  //  if there already are se the existing id in the array
  //  if not create a new unit and put that id in the docs array
  // .....................!!!!!!!!!!!!!!

  // const [newEntityToBe, setNewEntityToBe] = useState(newEntityConstructor);

  // const [errors] = useState(ERRORS);

  return [handleCreateNewUnit]; // delete me.
};

export default useCreateNewUnit;

// create useAddNewEntity query,
// send the new object to this and then have the id of the new object returned
// in order to be added as child to the parent
// with an update query
// do this with the id returned from the first query async

// find a way to render the errors and the warning for each component
