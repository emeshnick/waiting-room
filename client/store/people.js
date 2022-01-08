const ADD_PERSON = "ADD_PERSON";

export const addPerson = (person) => {
  return {
    type: ADD_PERSON,
    person,
  };
};

const priorityQueue = (queue, person) => {
  const newQueue = [...queue, person];
  let idx = newQueue.length - 1;
  let parentIdx = Math.floor((idx - 1) / 2);
  let temp;
  console.log("new priority ", person.priority);
  console.log("parent object:", newQueue[parentIdx]);
  while (
    newQueue[parentIdx] &&
    person.priority < newQueue[parentIdx].priority
  ) {
    console.log("is less than parent");
    temp = newQueue[parentIdx];
    newQueue[parentIdx] = person;
    newQueue[idx] = temp;

    idx = parentIdx;
    parentIdx = Math.floor((idx - 1) / 2);
  }
  return newQueue;
};

export default function (state = [], action) {
  switch (action.type) {
    case ADD_PERSON:
      return priorityQueue(state, action.person);
    default:
      return state;
  }
}
