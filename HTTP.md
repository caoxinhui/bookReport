视频组件 statusCode : 206

如果只包含一个数据区间，那么整个响应的 `Content-Type` 首部的值为所请求的文件的类型，同时包含  `Content-Range` 首部。

如果包含多个数据区间，那么整个响应的  `Content-Type`  首部的值为 `multipart/byteranges` ，其中一个片段对应一个数据区间，并提供  `Content-Range` 和 `Content-Type`  描述信息。
// TODO:  视频组件请求不完全，是否可以考虑分段请求？
