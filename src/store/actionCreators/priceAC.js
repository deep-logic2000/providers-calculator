import {
  SET_COMPANIES_DATA,
  SET_RADIO_ACTIVE,
  SET_STORAGE_VALUE,
  SET_TRANSFER_VALUE,
} from "../actions/priceActions";

export const setCompaniesData = (data) => ({
  type: SET_COMPANIES_DATA,
  payload: data,
});

export const setSelectedOption = (id, nameOfOption, value) => ({
  type: SET_RADIO_ACTIVE,
  payload: { id, nameOfOption, value },
});

export const setStorageValue = (value) => ({
  type: SET_STORAGE_VALUE,
  payload: value,
});

export const setTransferValue = (value) => ({
  type: SET_TRANSFER_VALUE,
  payload: value,
});

