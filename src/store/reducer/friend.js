import actionType from "../action/actionType";

const initFriend = {
  all: {},
  likeMe: [],
  new: []
};

export default function friend(state = initFriend, action) {
  console.log("friend....", action);
  switch (action.type) {
    case actionType.SET_FRIEND_ALL:
      let allState = Object.assign({}, state);
      let all = allState.all;
      Object.assign(all, action.data);
      allState.all = all;
      return allState;

    case actionType.SET_NEW_FRIEND:
      let newState = Object.assign({}, state);
      let newFriends = newState.new;
      if (!newFriends.includes(action.data)) {
        newFriends.push(action.data);
        newState.new = newFriends;
      }
      return newState;

    case actionType.SET_NEW_LINKE_ME:
      let _newState = Object.assign({}, state);
      let likeMe = _newState.likeMe;
      if (!likeMe.includes(action.data)) {
        likeMe.push(action.data);
        _newState.likeMe = likeMe;
      }
      return _newState;

    default:
      return state;
  }
}
