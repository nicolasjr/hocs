import { fromJS } from 'immutable';
import { range } from 'ramda';

const initialState = fromJS(range(0, 100));

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MORE_ENTRIES':
      return state.concat(fromJS(range(state.size, state.size + 100)));
    default:
      return state;
  }
}

export default reducer;
