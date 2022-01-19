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

  //Loop until the parent is less than the new person, or new person is at 0th index
  while (queue[parentIdx] && queue[idx].priority < queue[parentIdx].priority) {
    swapHelper(queue, idx, parentIdx);

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
  swapHelper(queue, queue.length - 1, 0);
  const root = queue.pop();

  //Bubble down the swapped person by priority, while also ordering by time if two children have the same priority
  //While the priority of the current node is less than either of its children
  while (
    (queue[leftChild] && queue[idx].priority > queue[leftChild].priority) ||
    (queue[rightChild] && queue[idx].priority > queue[rightChild].priority)
  ) {
    //If the current node has a right child
    if (queue[rightChild]) {
      //Check if left child has higher priority than right child
      if (queue[leftChild].priority < queue[rightChild].priority) {
        swapHelper(queue, idx, leftChild);
        idx = leftChild;
      }

      //Check if right child has higher priority than left child
      else if (queue[rightChild].priority < queue[leftChild].priority) {
        swapHelper(queue, idx, rightChild);
        idx = rightChild;
      }

      //If neither is less than or greater than, children have equal priority
      else {
        //Check if left child has earlier time
        if (queue[leftChild].time < queue[rightChild].time) {
          swapHelper(queue, idx, leftChild);
          idx = leftChild;
        }

        //If right child has earlier time
        else {
          swapHelper(queue, idx, rightChild);
          idx = rightChild;
        }
      }
    }

    //If there is no right child
    else {
      swapHelper(queue, idx, leftChild);
      idx = leftChild;
    }

    //Get right and left child of new node
    leftChild = idx * 2 + 1;
    rightChild = idx * 2 + 2;
  }
  return root;
}

function swapHelper(queue, idx1, idx2) {
  let temp = queue[idx1];
  queue[idx1] = queue[idx2];
  queue[idx2] = temp;
}

export default function (state = [], action) {
  switch (action.type) {
    case ADD_PERSON:
      const queueToAdd = [...state];
      return addPriorityQueue(queueToAdd, action.person);
    case REMOVE_PERSON:
      const queueToRemove = [...state];
      removePriorityQueue(queueToRemove);
      return queueToRemove;
    default:
      return state;
  }
}
