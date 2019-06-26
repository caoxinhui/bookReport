/**
 * 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
 */
const data = [
  {
    id: "1",
    name: "test1",
    children: [
      {
        id: "11",
        name: "test11",
        children: [
          {
            id: "111",
            name: "test111"
          },
          {
            id: "112",
            name: "test112"
          }
        ]
      },
      {
        id: "12",
        name: "test12",
        children: [
          {
            id: "121",
            name: "test121"
          },
          {
            id: "122",
            name: "test122"
          }
        ]
      }
    ]
  }
];


const fn = (data, value) => {
    let res = []
    const dfs = (arr, temp = []) => {
      for (const node of arr) {
        if (node.children) {
          dfs(node.children, temp.concat(node.id))
        } else {
          if (node.id === value) {
            res = temp
          }
          return
        }
      }
    }
    dfs(data)
    return res
  }