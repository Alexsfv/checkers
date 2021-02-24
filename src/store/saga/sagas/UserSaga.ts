import { userActions } from '../../actions/UserActions';
import { UserInfoResp } from '../../../types/responseTypes';
import { Api } from '../../../Api';
import { SAGA_INITIAL_USER } from '../sagasTypes';
import { call, put, takeEvery } from 'redux-saga/effects'

function* initialUserWorker() {
    const userInfo: UserInfoResp = yield call(Api.userInfo)
    if (typeof userInfo === 'object') {
        yield put(userActions.initial(userInfo))
    }
}

export function* userSaga() {
    yield takeEvery(SAGA_INITIAL_USER, initialUserWorker)
}