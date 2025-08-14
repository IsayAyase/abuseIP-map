import type { StoreValueType } from "../types";

const values: StoreValueType = {
    status: null,
};

const getStoreValueFor = (key: keyof StoreValueType) => values[key];

const setStoreValueFor = (
    key: keyof StoreValueType,
    value: StoreValueType[keyof StoreValueType]
) => {
    values[key] = value as any;
};

const store = {
    values,
    getStoreValueFor,
    setStoreValueFor,
};

export default store;
