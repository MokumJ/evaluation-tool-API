import ApiClient from '../../api/client'
export const FETCHED_RECIPES = 'FETCHED_RECIPES'


export default () => {
  return dispatch => {
  dispatch(loading(true)) // ???

    api.get('/recipes')
      .then(res => dispatch({ type: FETCHED_RECIPES, payload: res.body }))
      .catch(err => dispatch(loadError(err))) ???

   dispatch(loading(false)) // ???
  }
}
