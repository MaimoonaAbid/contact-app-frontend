// import {FETCH_DATA_LOADING} from '../actions/'
  
//   const initalState = {
//     loading: false,
//     data: [],
//     error: "",
//   };
  
//   export default function getUsers(state = initalState, action) {
//     switch (action.type) {
//       case FETCH_DATA_LOADING:
//         return { ...state, loading: true };
//       case FETCH_DATA_SUCCESS:
//         return { ...state, loading: false, data: action.payload };
//       case FETCH_DATA_FAILURE:
//         return { ...state, loading: false, error: action.payload };
//       default:
//         return state;
//     }
//   }