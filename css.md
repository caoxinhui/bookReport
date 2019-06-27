适配 iPhoneX 底部， 添加一个固定高度，其余内容还是按照原先的定义
  ```css
  .class_name_for_ios{
    padding-bottom: constant(safe-area-inset-bottom)
    padding-bottom: env(safe-area-inset-bottom)
  }
  ```