// import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useGetAllDocs from './queries/useGetAllDocs';
import getDocSourceDetails from './getDocSourceDetails';
import useAddNewEntities from './queries/useAddNewEntities';
import useGetAllTypes from './queries/useGetAllTypes';

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
  const [addEntities] = useAddNewEntities();
  const [allTypes] = useGetAllTypes();
  console.log('allTypes!!!!!!!', allTypes);
  const documentTypeId = allTypes && allTypes.find((type) => type.title === 'document').id;

  // here the doc source will be gotten

  const allDocsEntityIdsArray = async () => { // this title is a bit unclear
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
      const allNewEntitiesForDb = linksNotExistingInDB.map((link) => {
        console.log('link', link);
        // when you are done put the bellow in a seperate function

        // create the doc unit, get the id to use it for the unit created after this
        // I think that this function needs to return an array of ids, which will enchance
        // the entities docs allong the ids of those docs that allready exist.
        const { source, name } = getDocSourceDetails(link);
        console.log('name for doc', name);
        console.log('documentType', documentTypeId);
        // here we need to populate the array with the ids gotten
        // from the newly created entities
        // but first I need to find a way to populate the entities with data

        return {
          id: uuidv4(),
          name, // from title
          type: documentTypeId, // here I need to pull from the db the doc type id
          mainLinks: [`${link}`],
          properties: {
            // docs: , // does a doc needs docs?
            tags: allTagsOfEntity,
            technologies: allTechnologiesOfEntity,
            source,
          },
        };

        // use the docEntityConstructor to make the api call to add the doc entity to the db
        // return from this hook the id and add it to an array.
      });
      const newlyAddedEntitesIds = await addEntities(allNewEntitiesForDb);
      newlyAddedEntitesIds.forEach((newEntity) => (
        docIdsArray.push(newEntity))); // instead of that I need to send this to db
      // and push only the entities ids
      // return allNewEntitiesForDb;
      console.log('newlyAddedEntitesIds***', newlyAddedEntitesIds);
    }
    console.log('docIdsArray', docIdsArray);
    return docIdsArray;
  };

  const newEntityConstructor = async () => {
    const standardKeys = {
      id: uuidv4(),
      name: nameOnInput,
      type: typeOnInput.id,
      teamsResponsible: teamsResponsibleOnInput.map((team) => (team.id)),
      // leader: leaderOnInput,
      mainLinks,
      briefDescription: briefDescriptionOnInput,
      properties: {
        tags: allTagsOfEntity,
        technologies: allTechnologiesOfEntity,
      },
    };

    const newEntity = { ...standardKeys };

    if (typeOnInput.title === 'document') {
      console.log('inside type document');
      const { source, name } = getDocSourceDetails(mainLinks[0]);
      newEntity.properties.source = source;
      newEntity.name = name;
    }

    if (typeOnInput.title !== 'document') {
      newEntity.children = [];
      newEntity.properties.docs = await allDocsEntityIdsArray();
    }

    console.log('newEntity(((())))', newEntity);
    return newEntity;
  };

  const handleCreateNewUnit = async () => {
    console.log('handle handleCreateNewUnit');
    console.log('newEntityConstructor', newEntityConstructor());
    const newEntity = await newEntityConstructor();
    addEntities(newEntity);
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
