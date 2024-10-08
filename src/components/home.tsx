'use client'

import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from '@/styles/pages/home'
import Link from 'next/link'

import 'keen-slider/keen-slider.min.css'
import Head from 'next/head'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number | string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      {/* <Head>
        <title>Ignite Shop</title>
      </Head> */}

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}
