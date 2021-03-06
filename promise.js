new Promise(resolve => {
  console.log(1);
  resolve(3);
}).then(num => {
  console.log(num);
});
console.log(2); //1 2 3

new Promise(resolve => {
  console.log(1);
  resolve(3);
  Promise.resolve().then(() => console.log(4));
}).then(num => {
  console.log(num);
});
console.log(2); //1 2 4 3

// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次，意思就是3秒，执行一次 red 函数，2秒执行一次 green 函数，
// 1秒执行一次 yellow 函数，不断交替重复亮灯，意思就是按照这个顺序一直执行这3个函数，这步可以就利用递归来实现。

const Promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});
Promise.then(res => {
  console.log("then:", res);
}).catch(err => {
  console.log("catch:", err);
});

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}
var step = function() {
  Promise.resolve()
    .then(function() {
      return light(3000, red);
    })
    .then(function() {
      return light(2000, green);
    })
    .then(function() {
      return light(1000, yellow);
    })
    .then(function() {
      step();
    });
};
var light = function(timer, color) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      color();
      resolve();
    }, timer);
  });
};
step();

// 有 8 个图片资源的 url，已经存储在数组 urls 中（即urls = ['http://example.com/1.jpg', ...., 'http://example.com/8.jpg']），而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。
// 但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。
// 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

var urls = [
  "https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg",
  "https://www.kkkk1000.com/images/getImgData/gray.gif",
  "https://www.kkkk1000.com/images/getImgData/Particle.gif",
  "https://www.kkkk1000.com/images/getImgData/arithmetic.png",
  "https://www.kkkk1000.com/images/getImgData/arithmetic2.gif",
  "https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg",
  "https://www.kkkk1000.com/images/getImgData/arithmetic.gif",
  "https://user-gold-cdn.xitu.io/2018/10/29/166be40ccc434be0?w=600&h=342&f=png&s=122185"
];
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log("一张图片加载完成");
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}
function limitLoad(urls, handler, limit) {
  const sequence = [].concat(urls);
  let promises = [];
  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });
  return sequence
    .reduce((last, url, currentIndex) => {
      return last
        .then(() => {
          return Promise.race(promises);
        })
        .catch(err => {
          console.log(err);
        })
        .then(res => {
          promises[res] = handler(sequence[currentIndex]).then(() => {
            return res;
          });
        });
    }, Promise.resolve())
    .then(() => {
      return Promise.all(promises);
    });
}
limitLoad(urls, loadImg, 3);

function Find(target, array) {
  // write code here
  for (var i = 0; i < array.length; i++) {
    if (target === array[i][0]) {
      console.log(true);
    }
    if (target > array[i][0] && array[i + 1][0] && target < array[i + 1][0]) {
      for (var j = 0; j < array[i][0].length; j++) {
        if (target === array[i][j]) {
          console.log(true);
        }
        if (
          target > array[i][j] &&
          array[i][j + 1] &&
          target < array[i][j + 1]
        ) {
          console.log(false);
        }
      }
    }
  }
}
Find(5, [[1, 2, 8, 9], [2, 4, 9, 12], [4, 7, 10, 13], [6, 8, 11, 15]]);

function test() {
  return new Defer(function(res, rej) {
    setTimeout(function() {
      res(1);
    }, 1000);
  });
}

test()
  .then(function(value) {
    console.log("resolve then 1", value);
    return 1;
  })
  .then(function(value) {
    console.log("resolve then 2", value);
    throw 2;
  })
  .catch(function(e) {
    console.log("error", e);
  });
//结果:
//resolve then 1 1
//resolve then 2 1
//error 2

function test2() {
  return new Defer(function(res, rej) {
    setTimeout(function() {
      rej(1);
    }, 1000);
  });
}

test2()
  .then(null, function(value) {
    console.log("reject then 1", value);
    throw "error 1";
  })
  .then(null, function(value) {
    console.log("reject then 2", value);
    throw "error 2";
  })
  .catch(function(e) {
    console.log("error", e);
  });
//结果:
//reject then 1 1
//reject then 2 error 2
//error erro 2

test2()
  .then(null, function(value) {
    console.log("reject then 1", value);
    throw "throw error from then 1";
  })
  .then(function(value) {
    console.log("resolve then 2", value);
  })
  .catch(function(e) {
    console.log("error", e);
  });
//结果:
//reject then 1 1
//error throw error from then 1

//请求某个图片资源
function requestImg() {
  var p = new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() {
      resolve(img);
    };
    img.src = "xxxxxx";
  });
  return p;
}

//延时函数，用于给请求计时
function timeout() {
  var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject("图片请求超时");
    }, 5000);
  });
  return p;
}

Promise.race([requestImg(), timeout()])
  .then(function(results) {
    console.log(results);
  })
  .catch(function(reason) {
    console.log(reason);
  });

// promise实现并行
const datum = [];
for (let i = 0; i < 10; i++) {
  datum.push(i);
}

Promise.all(
  datum.map(i => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(i * 200 + " ms后执行结束");
        resolve("第 " + (i + 1) + " 个promise执行结束");
      }, i * 200);
    });
  })
).then(data => {
  console.log(data);
});

const asyncFun = async () => {
  const datum = [];
  for (let i = 0; i < 10; i++) {
    datum.push(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(i * 200 + "ms 后执行结束");
          resolve("第 " + (i + 1) + " 个 Promise 执行结束");
        }, i * 200);
      })
    );
  }
  const result = [];
  for (let promise in datum) {
    result.push(await promise);
  }
  console.log(result);
};
asyncFun();

// promise实现串行
const datum = [];
for (let i = 0; i < 10; i++) {
  datum.push(i);
}

let serial = Promise.resolve();
for (let i of datum) {
  serial = serial.then(data => {
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(i * 200 + " ms 后执行结束");
        resolve("第 " + (i + 1) + " 个 Promise 执行结束");
      }, i * 200);
    });
  });
}

const datum = [];
for (let i = 0; i < 10; i++) {
  datum.push(i);
}
datum.reduce((prev, cur) => {
  return prev.then(data => {
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(cur * 200 + " ms 后执行结束");
        resolve("第 " + (cur + 1) + " 个 Promise 执行结束");
      }, cur * 200);
    });
  });
}, Promise.resolve(true));

// 值穿透
// 当你给 then() 传递一个非函数（比如一个 promise ）值的时候，
// 它实际上会解释为 then(null) ，这会导致之前的 promise 的结果丢失
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello world");
  }, 1000);
});
promise.then(() => {
  promise
    .then()
    .then(null)
    .then("some code")
    .then(res => {
      console.log(res);
    });
  promise
    .catch()
    .catch(null)
    .then("some code")
    .then(res => {
      console.log(res);
    });
});

// 永远不要在回调队列中抛出异常，因为回调队列脱离了运行上下文环境，异常无法被当前作用域捕获。
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw Error("This is an error");
  });
});

promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log("handle error: ", error); // Error: This is an error
  });

/**
 * https://mp.weixin.qq.com/s/hdvPdTUR7lfnoWl2aO2Cig 
 * JS引擎是浏览器渲染进程中的一个线程（单线程）,所谓的JS异步并不是交由JS引擎去完成的，而是交给浏览器的其他线程去完成。
 * JS异步操作还会涉及到JS事件循环机制。
 * JS 事件循环 : 
 * 如果是setTimeout/setInterval定时异步任务，浏览器的渲染进程就会开一个定时器触发线程去执行，当定时时间一到，
 * 就会通知事件触发线程将定时器的回调方法推送至事件任务队列的一个宏任务队列的列尾，
 * 等待JS引擎执行完同步任务后，再从事件任务队列中从头取出要执行的回调方法。其他异步任务也是这么一个流程。
 * 这就是所谓的JS事件循环。
 */


 /**
  * promise是一个容器，它里面装的是一个异步操作（某个未来才会结束的事件）的结果
  */

  
  function createPromise(p,arg) {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        if(arg === 0) {
          reject(p + ' fail')
        } else {
          resolve(p + ' ok')
        }
      }, 200)
    })
  }

  createPromise("p1",1).then((success1) => {
    console.log(success1)
    return createPromise("p2", 0)
  }, (reject) => {
    console.log(reject)
  })

  //如果没有return的话是不会被catch住的 *** 
  createPromise("p1",1).then((success1) => {
    console.log(success1)
    return createPromise("p2",0)
  }).catch(error => {
    console.log(error)
  })


  createPromise("p1",0).then((success1) => {
    console.log(success1)
    return createPromise("p2",0)
  })

createPromise("p1",1).then(function(success1){
  console.log("正在执行 "+success1)
  return createPromise("p2",1)
})