// import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useGetAllDocs from './queries/useGetAllDocs';
import getSourceDetails from './getSourceDetails';

const useCreateNewUnit = (
  nameOnInput,
  typeOnInput,
  teamsResponsibleOnInput,
  // leaderOnInput,
  mainLinks,
  briefDescriptionOnInput,
  allDocsOfEntity,
  allTagsOfEntity,
  allTechnologiesOfEntity,
) => {
  const [allUnitsOfTypeDoc] = useGetAllDocs();
  const [linksSourcesArray] = getSourceDetails(allDocsOfEntity);
  // here the doc source will be gotten

  const allDocsEntityIdsArray = () => {
    const allDocLinks = allUnitsOfTypeDoc.map((doc) => (doc.mainLinks)).flat();
    const linksExistingAsDocEntities = [];
    const linksNotExistingInDB = [];
    const docIdsArray = [];

    allDocsOfEntity.forEach((docLink) => (
      allDocLinks.includes(docLink)
        ? linksExistingAsDocEntities.push(docLink)
        : linksNotExistingInDB.push(docLink)
    ));

    if (linksExistingAsDocEntities.length > 0) {
      linksExistingAsDocEntities.forEach((link) => {
        const thisDocumentEntity = allUnitsOfTypeDoc.find((entity) => (
          entity.mainLinks.includes(link)));
        if (thisDocumentEntity) {
          docIdsArray.push(thisDocumentEntity.id);
        } else {
          throw new Error('entity with the right doc link not found');
        }
      });
    }

    if (linksNotExistingInDB.length > 0) {
      linksNotExistingInDB.forEach((link) => (
        console.log('link', link)
        // here we need to populate the array with the ids gotten
        // from the newly created entities
        // but first I need to find a way to populate the entities with data

      // id: uuidv4(),
      // name: // from title
      // type: // here I need to pull from the db the doc type id
      // mainLinks: [`${link}`],
      // properties: {
      //   docs: allDocsEntityIdsArray(),
      //   tags: allTagsOfEntity,
      //   technologies: allTechnologiesOfEntity,
      // },
      ));
    }
  };

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
      docs: allDocsEntityIdsArray(),
      tags: allTagsOfEntity,
      technologies: allTechnologiesOfEntity,
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
