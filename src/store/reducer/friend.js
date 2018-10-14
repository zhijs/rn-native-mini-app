
import actionType from '../action/actionType';

const initFriend = {
  all: {},
  likeMe: [],
  new: [],
}

export default function friend(state = initFriend, action) {
   switch(action.type){
     case actionType.SET_NEW_FRIEND:
       return Object.assign(all, action.data)
     case actionType.SET_NEW_LINKE_ME:
       return [...initFriend.likeMe, action.data]
     default :
       return state
   }
}