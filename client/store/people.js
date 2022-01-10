const ADD_PERSON = "ADD_PERSON";
const GET_PERSON = "GET_PERSON";

export const addPerson = (person) => {
  return {
    type: ADD_PERSON,
    person,
  };
};

function addPriorityQueue(queue, person) {
  //Redefine queue to not mutate input
  const newQueue = [...queue, person];

  let idx = newQueue.length - 1;
  let parentIdx = Math.floor((idx - 1) / 2);
  let temp;
  while (
    newQueue[parentIdx] &&
    person.priority < newQueue[parentIdx].priority
  ) {
    temp = newQueue[parentIdx];
    newQueue[parentIdx] = person;
    newQueue[idx] = temp;

    idx = parentIdx;
    parentIdx = Math.floor((idx - 1) / 2);
  }
  return newQueue;
}

function removePriorityQueue(queue) {
  //Redefine queue to not mutate input
  const newQueue = queue;

  let idx = 0;
  let leftChild = 1;
  let rightChild = 2;
  let temp = newQueue[newQueue.length - 1];
  newQueue[newQueue.length - 1] = newQueue[idx];
  newQueue[idx] = temp;

  //Bubble down the swapped person by priority, while also ordering by time if two children have the same priority
  while (
    (newQueue[leftChild] && newQueue[idx].priority > newQueue[leftChild]) ||
    (newQueue[rightChild] && newQueue[idx].priority > newQueue[rightChild])
  ) {
    if (newQueue[rightChild]) {
      if (newQueue[leftChild].priority < newQueue[rightChild].priority) {
        temp = newQueue[leftChild];
        newQueue[leftChild] = newQueue[idx];
        newQueue[idx] = temp;
        idx = leftChild;
      } else if (newQueue[rightChild].priority < newQueue[leftChild].priority) {
        temp = newQueue[rightChild];
        newQueue[rightChild] = newQueue[idx];
        newQueue[idx] = temp;
        idx = rightChild;
      } else {
        if (newQueue[leftChild].time < newQueue[rightChild].time) {
          temp = newQueue[leftChild];
          newQueue[leftChild] = newQueue[idx];
          newQueue[idx] = temp;
          idx = leftChild;
        } else {
          temp = newQueue[rightChild];
          newQueue[rightChild] = newQueue[idx];
          newQueue[idx] = temp;
          idx = rightChild;
        }
      }
      idx = rightChild;
    } else {
      temp = newQueue[leftChild];
      newQueue[leftChild] = newQueue[idx];
      newQueue[idx] = temp;
      idx = leftChild;
    }

    leftChild = idx * 2 + 1;
    rightChild = idx * 2 + 2;
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case ADD_PERSON:
      return addPriorityQueue(state, action.person);
    case GET_PERSON:
      return;
    default:
      return state;
  }
}
