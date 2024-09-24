import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import Image from "next/image"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string | null
  }
}

export default function ProductContent({ product }: ProductProps) {

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}
