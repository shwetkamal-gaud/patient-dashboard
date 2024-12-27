import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {SET_DATA} from '../actions/actions'
import { getRequest } from './getRequest';
import { SagaIterator } from 'redux-saga';

export function* fetchDataSaga(action: any): SagaIterator {
    try {
        const response = yield call(getRequest, action.payload);
        console.log('response', response)
        yield put({type: SET_DATA, payload: response});
    } catch (error) {
        console.log(error);
    }
}