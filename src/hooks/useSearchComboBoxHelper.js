const useSearchComboBoxHelper = () => {
  const createAdvanceValuesUpdate = (ofType, chosenValues, option) => ({
    ...chosenValues,
    [ofType]: chosenValues[ofType] ? [...chosenValues[ofType], option] : [option],
  });

  const createUpdatePayload = (ofType, chosenValues, option) => {
    switch (ofType) {
      case 'entity': return option.id;
      default: return createAdvanceValuesUpdate(ofType, chosenValues, option);
    }
  };

  return [createUpdatePayload];
};

export default useSearchComboBoxHelper;
