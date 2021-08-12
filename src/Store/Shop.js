import { BehaviorSubject } from "rxjs";
const initialState = {
  dataList: [],
  dataOriginalList: [],
  searchFilter: "",
  dataTemp: [],
  maxPriceAdjust: null,
  minPriceAdjust: null,
  keySearch: null,
  tabIndex: null,
  maxPage: null,
  isLoading: true,
  categoryQuery: null,
};
const behaviorSubject = new BehaviorSubject(initialState);

let state = initialState;

const shopStore = {
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

export default shopStore;
