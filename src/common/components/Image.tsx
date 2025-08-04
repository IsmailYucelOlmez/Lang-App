import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Image = ({src, className}: {src: string, className: string}) => {
  return (
    <LazyLoadImage 
      src={src} 
      className={className || ""} 
      effect="blur"
      threshold={100}
      
    />
  )
}

export default Image