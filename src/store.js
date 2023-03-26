import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import getUsers from './reducer/fetchData.reducer'


const initialState1 = {
    allUsers: [],
    isFormOpen: false,
   
};

function reducer1(state = initialState1, action) {
    let newId = state.allUsers.length > 0 ? state.allUsers[state.allUsers.length - 1].id + 1 : 1;
  
    switch (action.type) {
        case "setAllUsers":
            return { ...state, allUsers: action.payload };
        case "deleteUsers":
            console.log('I am heree')
            return{...state, allUsers: action.payload};
        case "createUsers":
            const newUser = { ...action.payload, id: newId };
            return { ...state, allUsers: [...state.allUsers, newUser] };
        case "editUser":
            const updatedUsers = state.allUsers.map(user => {
                if (user.id === action.payload.id) {
                    return action.payload;
                }
                
                return user; 
            });
            return { ...state, allUsers: updatedUsers };
            
        default:
            return state;
    }
}

export const store = createStore(combineReducers({ reducer1, getUsers },   applyMiddleware(thunk)));


