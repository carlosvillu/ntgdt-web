import {useRef, useEffect} from 'react'

export const useImages = ({blurImg, fullImage}) => {
  const imgRef = useRef(null)

  useEffect(() => {
    imgRef.current.src = blurImg
    imgRef.current.classList.add('is-loading')
  }, [blurImg])

  useEffect(() => {
    const imgInMemory = new window.Image()
    const sizes =
      '(max-width: 20em) 30vw, (max-width: 30em) 100%, (max-width: 40em) 90vw'
    imgInMemory.src = fullImage
    imgInMemory.sizes = sizes
    imgInMemory.onload = () => {
      imgRef.current.setAttribute('src', fullImage)
      imgRef.current.setAttribute('sizes', sizes)
      imgRef.current.classList.remove('is-loading')
    }
  }, [fullImage])

  return imgRef
}
