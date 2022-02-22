export const createPriorityQueue = () => {
    return [];
}

export const enqueue = (pqueue, element, price) => {
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

export const dequeue = (pqueue) => {
    if(!pqueue.length) throw "Is Empty!"

    return pqueue.shift()
}

// export default {
//     createPriorityQueue,
//     enqueue,
//     dequeue
// }

