import {useEffect} from 'react'

export const useSetupScrollRestoration = () => {
  return ({uri, position, forceTopScroll} = {uri: '/', position: 0}) => {
    window.forceTopScroll = forceTopScroll
    window.scrollCaches = window.scrollCaches || {}
    window.scrollCaches[uri] = position
  }
}
export const useScrollRestoration = () => {
  useEffect(() => {
    window.scrollCaches = window.scrollCaches || {}
    const URI = `${window.location.pathname}${window.location.search}`

    if (window.forceTopScroll && URI.match(window.forceTopScroll)) {
      window.scrollCaches[URI] = 0
      window.forceTopScroll = undefined
    }

    const scrollYByURI = window.scrollCaches[URI] || 0
    const onScroll = () => {
      if (window.scrollY !== 0) {
        window.scrollCaches[URI] = window.scrollY
      }
    }

    document.addEventListener('scroll', onScroll, {passive: true})
    window.scroll(0, scrollYByURI)

    return () => document.removeEventListener('scroll', onScroll)
  })
}
