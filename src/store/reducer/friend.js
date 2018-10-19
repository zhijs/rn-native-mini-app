import actionType from "../action/actionType";

const initFriend = {
  all: {},
  likeMe: [],
  new: [],
  match: []
};

export default function friend(state = initFriend, action) {
  console.log('friend........');
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actionType.SET_FRIEND_ALL:
      let all = newState.all;
      Object.assign(all, action.data);
      newState.all = all;
      return newState;

    case actionType.SET_NEW_FRIEND:
      newState.new  = [...newState.new, ...action.data]
      return newState;

    case actionType.SET_NEW_LINKE_ME:
      newState.likeMe  = [...newState.likeMe, ...action.data]
      return newState;

    case actionType.SET_MATCH_FRIEND:
      newState.match  = [...newState.match, ...action.data]
      return newState;
    default:
      return state;
  }
}
