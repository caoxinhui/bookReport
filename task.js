/**
 * 编程面试题之最大并行任务池：
 * 1）给定一个 taskList 和 poolSize；
 * 2）task 是异步的，返回 promise；
 * 3）task 不会失败。
 * 要求：
 * 1）同时不能有超过 poolSize 的 task 在执行；
 * 2）所有 taskList 里的 task 最终都执行完毕
 */
const sequence = async getNextTask => {
    let task = getNextTask()
    if (!task) return
    await task()
    await sequence(getNextTask)
}
const parallel = async (getNextTask, size) => {
    let taskList = Array.from({ length: size }, getNextTask)
    return Promise.all(taskList.filter(Boolean).map(task => task()))
}
const buffer = async (taskList, size = 1) => {
    let count = 0
    let getNextTask = () => taskList[count++]
    return parallel(() => () => sequence(getNextTask), size)
}

const buffer = (data, size) => {
    let runtasks = [...data]
    let run = async () => {
        if (runtasks.length > 0) {
            let task = runtasks.shift()
            await task()
            run()
        }
    }
    for (let i = 0; i < size; i++) {
        run()
    }
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const data = Array.from({ length: 100 }, (_, i) => async () => {
    console.log('enter', i)
    await delay(Math.random() * 10)
    console.log('leave', i)
})
buffer(data, 10)