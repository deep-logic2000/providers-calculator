import {
  SET_COMPANIES_DATA,
  SET_RADIO_ACTIVE,
  SET_STORAGE_VALUE,
  SET_TRANSFER_VALUE,
} from "../actions/priceActions";

const initialValues = {
  companiesData: [],
  storageValue: 0,
  transferValue: 0,
};

const priceReducer = (state = initialValues, { type, payload } = {}) => {
  switch (type) {
    case SET_COMPANIES_DATA: {
      return { ...state, companiesData: payload };
    }
    case SET_RADIO_ACTIVE: {
      const { id, nameOfOption } = payload;
      const index = state.companiesData.findIndex((item) => item.id === id);
      const indexOfOption = state.companiesData[index].options.findIndex(
          (item) => item.name === nameOfOption
          );
          
      const tempState = { ...state };
      tempState.companiesData[index].options.forEach(
        (element) => (element.isActive = false)
      );
      tempState.companiesData[index].options[indexOfOption].isActive = true;

      return { ...tempState };
    }
    case SET_STORAGE_VALUE: {
      return { ...state, storageValue: payload };
    }

    case SET_TRANSFER_VALUE: {
      return { ...state, transferValue: payload };
    }

    default:
      return state;
  }
};

export default priceReducer;
