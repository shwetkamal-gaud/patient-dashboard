import { takeEvery } from "redux-saga/effects";
import { GET_DATA } from "../actions/actions";
import { fetchDataSaga } from "./getHandler";

export function* rootSaga() {
    yield takeEvery(GET_DATA, fetchDataSaga);
}