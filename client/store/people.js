const ADD_PERSON = "ADD_PERSON";

export const addPerson = (person) => {
  return {
    type: ADD_PERSON,
    person,
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case ADD_PERSON:
      const newQueue = [...state, action.person];
      return newQueue;
    default:
      return state;
  }
}
