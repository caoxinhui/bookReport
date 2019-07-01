/**
 * 监听图片加载成功、失败事件
 */
import { useState, useEffect } from 'react'

export default function useImage(url) {
  const defaultStatus = { image: undefined, status: 'loading' }
  let [{ image, status }, setImageStatus] = useState(defaultStatus)


  useEffect(() => {
    if (!url) return
    let img = new Image()
    img.src = url

    function onLoad() {
      setImageStatus({ image: img, status: 'loaded' })
    }
    function onError() {
      setImageStatus({ image: undefined, status: 'failed' })
    }
    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)

    return () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', onError)
    }
  }, [url])

  return [image, status]
}