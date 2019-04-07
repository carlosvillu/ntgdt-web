import {useRef, useEffect} from 'react'

const imgWith = url => width =>
  `https://res.cloudinary.com/carlosvillu/image/fetch/w_${width},f_auto/${url}`

export const useImages = ({blurImg, fullImage}) => {
  const imgRef = useRef(null)

  useEffect(
    () => {
      imgRef.current.src = blurImg
      imgRef.current.classList.add('is-loading')
    },
    [blurImg]
  )

  useEffect(
    () => {
      const imgURLWith = imgWith(fullImage)
      const imgInMemory = new window.Image()
      const srcSet = `
    ${imgURLWith(320)} 320w,
    ${imgURLWith(480)} 480w,
    ${imgURLWith(768)} 768w,
    ${imgURLWith(1024)} 1024w,
    ${imgURLWith(1280)} 1280w`
      const sizes =
        '(max-width: 20em) 30vw, (max-width: 30em) 100%, (max-width: 40em) 90vw'
      imgInMemory.src = fullImage
      imgInMemory.srcSet = srcSet
      imgInMemory.sizes = sizes
      imgInMemory.onload = () => {
        imgRef.current.setAttribute('src', fullImage)
        imgRef.current.setAttribute('srcSet', srcSet)
        imgRef.current.setAttribute('sizes', sizes)
        imgRef.current.classList.remove('is-loading')
      }
    },
    [fullImage]
  )

  return imgRef
}
