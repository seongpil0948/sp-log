'use client'

import {Image} from '@nextui-org/image'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
export interface BasicCarouselProps {
  urls: string[]
}
export function BasicCarousel(props: BasicCarouselProps) {
  return (
    <Carousel showThumbs={false} showArrows={true} autoPlay infiniteLoop>
      {props.urls.map((url, idx) => (
        <div key={idx}>
          <Image src={url} alt="image" />
        </div>
      ))}
    </Carousel>
  )
}
