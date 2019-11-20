/**
 * 实现resolveAll方法，它接受一个对象或数组作为参数，返回将promise替换为其value的plain object or array
 * @param {*} input 
 */

const isPromise = input => input instanceof Promise
const isObject = input => {
    let type = Object.prototype.toString.call(input)
    return type === "[object Object]"
}

const resolveArray = (array = []) => Promise.all(array.map(resolveAll))

const resolveObject = (object = {}) => {
    let entries = Object.entries(object).map(resolveAll)
    return resolveArray(entries).then(Object.fromEntries)
}
const resolveAll = input => {
    if (Array.isArray(input)) {
        return resolveArray(input)
    } else if (isObject(input)) {
        return resolveObject(input)
    } else {
        return input
    }
}

const test = async () => {
    let obj = await resolveAll({
        a: Promise.resolve("/api/a"),
        b: {
            c: [Promise.resolve("/api/c1"), Promise.resolve("/apic2")],
            d: Promise.resolve("/api/d"),
            e: 123
        },
        f: 456
    })
    console.log('obj', obj)
}
test()
