const useSearchComboBoxHelper = () => {
  const createAdvanceValuesUpdate = (ofType, chosenValues, option) => {
    console.log('chosenValues!!!', chosenValues);
    console.log(' ofType!!!', ofType);
    console.log('option!!!', option);
    return {
      ...chosenValues,
      [ofType]: chosenValues[ofType] ? [...chosenValues[ofType], option] : [option],
    };
  };

  const createUpdatePayload = (ofType, chosenValues, option) => {
    console.log('option!!', option);
    switch (ofType) {
      case 'entity': return option;
      default: return createAdvanceValuesUpdate(ofType, chosenValues, option);
    }
  };

  return [createUpdatePayload];
};

export default useSearchComboBoxHelper;
