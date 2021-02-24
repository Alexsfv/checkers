import { all } from "redux-saga/effects";
import appSaga from "./sagas/AppSaga";
import { userSaga } from "./sagas/UserSaga";

export default function* rootSaga() {
    yield all([
        appSaga(),
        userSaga(),
    ])
}