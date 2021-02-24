import { SAGA_LOGOUT } from './../sagasTypes';
import { AccessTokenName, RefreshTokenName } from '../../../config';
import { userActions } from '../../actions/UserActions';
import { UserInfoResp, Tokens } from '../../../types/responseTypes';
import { deleteCookie, getCookie, updateCookieTokens } from '../../../utils/cookie';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { SAGA_INITIAL_APP } from '../sagasTypes';
import { Api } from '../../../Api';

function* initialAppWorker() {
    let userInfo: UserInfoResp | string = ''
    const access = getCookie(AccessTokenName)
    const refresh = getCookie(RefreshTokenName)
    if (access) userInfo = yield call(Api.userInfo)
    if (refresh && !access) {
        const tokens: Tokens | null = yield call(Api.updateTokens, refresh)
        if (tokens) {
            updateCookieTokens(tokens)
            userInfo = yield call(Api.userInfo)
        }
    }
    if (typeof userInfo === 'object') {
        return yield put(userActions.initial(userInfo))
    }
    yield fork(logoutWorker)
    console.log('initial err')
}

function* logoutWorker() {
    yield call(Api.logout)
    deleteCookie(AccessTokenName)
    deleteCookie(RefreshTokenName)
    yield put(userActions.logout())
}

export default function* appSaga() {
    yield takeEvery(SAGA_INITIAL_APP, initialAppWorker)
    yield takeEvery(SAGA_LOGOUT, logoutWorker)
}