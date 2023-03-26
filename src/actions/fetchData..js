 const FETCH_DATA_LOADING = 'FETCH_DATA_LOADING';
 const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
 const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'


export function fetchDataAsync() {
  return dispatch => {
    dispatch({type: FETCH_DATA_LOADING})
    fetch('http://localhost:8001/users')
      .then(res => res.json())
      .then(jsonData => {
        console.log(jsonData)
        dispatch({ type: FETCH_DATA_SUCCESS, payload: jsonData })
      })
      .catch(err => dispatch({type: FETCH_DATA_FAILURE}))
  };
}

 export {FETCH_DATA_LOADING, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE}