import { REHYDRATE } from 'redux-persist/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case 'DISLIKE_ING': {
      const newValues = {}
      if (!state.dislikes) newValues.dislikes = [action.dislike]
      else if (state.dislikes[action.id]) {
        state.dislikes[action.id] = Object.assign({}, action.dislike)
      } else {
          newValues.dislikes = [...state.dislikes, action.dislike]
        }
      return Object.assign({}, state, newValues)
    }
    case 'USER_SERVINGS':
      return Object.assign({}, state, {
        servings: action.value
      });
    case 'USER_ALLERGIES': {
      const newValues = {}
      if (!state.allergies) {
        newValues.allergies = [action.allergy]
      } else {
        if (!state.allergies.includes(action.allergy)) {
          newValues.allergies = [...state.allergies, action.allergy]
        } else {
          newValues.allergies = [...state.allergies]
          newValues.allergies.splice(newValues.allergies.indexOf(action.allergy), 1)
        }
      }
      return Object.assign({}, state, newValues);
    }
    case 'USER_DIET': {
      const newValues = {}
      if (!state.diets) {
        newValues.diets = [action.diet]
      } else {
        if (!state.diets.includes(action.diet)) {
          newValues.diets = [...state.diets, action.diet]
        } else {
          newValues.diets = [...state.diets]
          newValues.diets.splice(newValues.diets.indexOf(action.diet), 1)
        }
      }
      return Object.assign({}, state, newValues);
    }
    case 'USER_SURVEY':
      return Object.assign({}, state, { survey: true })
    case REHYDRATE:
      const incoming = action.payload.user
      if (incoming) return Object.assign({}, incoming)
      return state
    default:
      return state
  }
}
