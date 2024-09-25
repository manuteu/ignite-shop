'use client'
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import Image from "next/image"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string | null;
    defaultPriceId: string
  }
}

export default function ProductContent({ product }: ProductProps) {

  function handleBuyButton() {
    console.log(product.defaultPriceId);
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button onClick={handleBuyButton}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}
