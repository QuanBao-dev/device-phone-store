import { BehaviorSubject } from "rxjs";
const initialState = {
  widthItem: 385,
  numberOfProductPerPage: 3,
  currentPage: 0,
  maxPage: null,
  mode: "interval", 
  offsetLeft: 0,
  posX1: 0,
  posX2: 0,
  delta: 0,
  speed: 2,
  margin: 19,
  transition: "1s"
};
const behaviorSubject = new BehaviorSubject(initialState);

let state = initialState;

const popularNewsStore = {
  initialState,
  subscribe: (setState) => behaviorSubject.subscribe((v) => setState(v)),
  currentState: () => {
    let ans;
    behaviorSubject.subscribe((v) => {
      ans = v;
    });
    return ans || initialState;
  },
  init: () => {
    behaviorSubject.next(state);
  },
  updateData: (data = initialState) => {
    state = {
      ...state,
      ...data,
    };
    behaviorSubject.next(state);
  },
  updateDataQuick: (data = initialState) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      state[key] = data[key];
    });
  },
};


export default popularNewsStore;
