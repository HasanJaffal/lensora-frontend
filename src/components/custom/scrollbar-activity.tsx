import { useEffect } from 'react'

export function ScrollbarActivity() {
  useEffect(() => {
    const root = window.document.documentElement
    let scrollEndTimeout: ReturnType<typeof window.setTimeout>

    function handleScroll() {
      root.classList.add('is-scrolling')
      window.clearTimeout(scrollEndTimeout)

      scrollEndTimeout = window.setTimeout(() => {
        root.classList.remove('is-scrolling')
      }, 900)
    }

    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.clearTimeout(scrollEndTimeout)
      window.removeEventListener('scroll', handleScroll, true)
      root.classList.remove('is-scrolling')
    }
  }, [])

  return null
}
