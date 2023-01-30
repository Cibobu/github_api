import { FC, useRef, PropsWithChildren, useState, CSSProperties, useEffect, HTMLAttributes } from "react";

export interface LazyComponentProps extends HTMLAttributes<HTMLDivElement> {
  
}

const LazyComponent: FC<PropsWithChildren<LazyComponentProps>> = (props) => {
  const [isRender, setIsRender] = useState<boolean>(true)
  const [parentStyle, setParentStyle] = useState<CSSProperties>({})
  const intersectionRef = useRef<HTMLDivElement>(null)

  const intersectHandler = () => {
    if(intersectionRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setIsRender(entry.isIntersecting))
      })

      observer.observe(intersectionRef.current)

      if(intersectionRef.current.offsetWidth) setParentStyle({
        ...parentStyle,
        width: intersectionRef.current.offsetWidth
      })
      if(intersectionRef.current.offsetHeight) setParentStyle({
        ...parentStyle,
        height: intersectionRef.current.offsetHeight
      })
    }
  }

  useEffect(intersectHandler, [intersectionRef])

  const { style, ...anotherProps } = props

  return (
    <div ref={intersectionRef} style={{...style, ...(isRender ? {} : parentStyle)}} {...anotherProps}>
      {isRender ? props.children : null}
    </div>
  )
}

export default LazyComponent