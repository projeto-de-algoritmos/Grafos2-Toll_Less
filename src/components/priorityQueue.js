const createPriorityQueue = () => {
    return [];
}

const enqueue = (pqueue, element, price) => {
    let exists = false;

    for (let i = 0; i < pqueue.length; i++) {
        if (pqueue[i].price > price){
            pqueue.splice(i, 0, {element, price})
            exists = true;
            break;
        }
    }

    if(!exists) pqueue.push({element, price})

}

const dequeue = (pqueue) => {
    if(!pqueue.length) throw "Is Empty!"

    return pqueue.shift()
}

// const queue = createPriorityQueue();
// 
// enqueue(queue, 1, 10);
// enqueue(queue, 2, 1);
// enqueue(queue, 3, 20);
// 
// console.log(queue)
// 
// dequeue(queue)
// console.log(queue)
// dequeue(queue)
// console.log(queue)
// dequeue(queue)
// console.log(queue)
// dequeue(queue)

