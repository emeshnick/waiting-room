const ADD_PERSON = "ADD_PERSON";
const REMOVE_PERSON = "REMOVE_PERSON";

export const addPerson = (person) => {
  return {
    type: ADD_PERSON,
    person,
  };
};

export const removePerson = () => {
  return {
    type: REMOVE_PERSON,
  };
};

//Function takes the existing queue and the person to be added
//Min heap structure
function addPriorityQueue(queue, person) {
  //Add person to end of array
  queue.push(person);

  let idx = queue.length - 1;
  let parentIdx = Math.floor((idx - 1) / 2);
  let temp;

  //Loop until the parent is less than the new person, or new person is at 0th index
  while (queue[parentIdx] && person.priority < queue[parentIdx].priority) {
    temp = queue[parentIdx];
    queue[parentIdx] = person;
    queue[idx] = temp;

    idx = parentIdx;
    parentIdx = Math.floor((idx - 1) / 2);
  }

  return queue;
}

//Remove the first element but first swap elements to maintain structure
export function removePriorityQueue(queue) {
  let idx = 0;
  let leftChild = 1;
  let rightChild = 2;

  //Swap first and last elements
  let temp = queue[queue.length - 1];
  queue[queue.length - 1] = queue[idx];
  queue[idx] = temp;

  //Bubble down the swapped person by priority, while also ordering by time if two children have the same priority
  while (
    (queue[leftChild] && queue[idx].priority > queue[leftChild]) ||
    (queue[rightChild] && queue[idx].priority > queue[rightChild])
  ) {
    if (queue[rightChild]) {
      if (queue[leftChild].priority < queue[rightChild].priority) {
        temp = queue[leftChild];
        queue[leftChild] = queue[idx];
        queue[idx] = temp;
        idx = leftChild;
      } else if (queue[rightChild].priority < queue[leftChild].priority) {
        temp = queue[rightChild];
        queue[rightChild] = queue[idx];
        queue[idx] = temp;
        idx = rightChild;
      } else {
        if (queue[leftChild].time < queue[rightChild].time) {
          temp = queue[leftChild];
          queue[leftChild] = queue[idx];
          queue[idx] = temp;
          idx = leftChild;
        } else {
          temp = queue[rightChild];
          queue[rightChild] = queue[idx];
          queue[idx] = temp;
          idx = rightChild;
        }
      }
      idx = rightChild;
    } else {
      temp = queue[leftChild];
      queue[leftChild] = queue[idx];
      queue[idx] = temp;
      idx = leftChild;
    }

    leftChild = idx * 2 + 1;
    rightChild = idx * 2 + 2;
  }
  queue.pop();
  return queue;
}

export default function (state = [], action) {
  switch (action.type) {
    case ADD_PERSON:
      const queueToAdd = [...state];
      return addPriorityQueue(queueToAdd, action.person);
    case REMOVE_PERSON:
      const queueToRemove = [...state];
      return removePriorityQueue(queueToRemove);
    default:
      return state;
  }
}