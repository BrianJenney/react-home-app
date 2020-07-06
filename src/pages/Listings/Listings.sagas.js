import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { ADD_MARKERS, addMapMarkerSucceeded } from './Listings.ducks';
import API from '../../api/helpers';

function* addMapMarkers(action) {
	try {
		const result = yield API.searchForHomes(action.searchObj);
		yield put(addMapMarkerSucceeded(result));
	} catch (e) {
		yield console.log(e);
	}
}

const listingsSaga = function*() {
	yield takeLatest(ADD_MARKERS, addMapMarkers);
};

const sagas = function*() {
	yield all([ fork(listingsSaga) ]);
};

export default sagas;
export { addMapMarkers, listingsSaga };
