import { useEffect, useRef, useState } from 'react'

export default function useIsInViewport() {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isInViewPort, setIsInViewPort] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const isInViewPort = Boolean(entries[0]?.isIntersecting)

      setIsInViewPort(isInViewPort)
    })

    observer.observe(elementRef.current!)

    return () => observer.disconnect()
  }, [])

  return { elementRef, isInViewPort }
}
