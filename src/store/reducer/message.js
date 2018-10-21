import actionType from "../action/actionType";

const initMessage = {
  all: {}
};

export default function message(state = initMessage, action) {
  console.log('message........');
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionType.SET_MSG_ALL:
      let all = newState.all;
      Object.assign(all, action.data);
      newState.all = all;
      return newState;
    default:
      return state;
  }
}