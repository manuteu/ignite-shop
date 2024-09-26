import ProductContent from "@/components/productContent";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";
import Head from "next/head";
import Stripe from "stripe";

type Props = {
  params: { id: string }
}

async function getDetailProduct({ params }: Props) {
  const productId = params.id

  if (!productId) {
    throw new Error('O ID do produto não foi fornecido.');
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    product: {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount as number / 100),
      description: product.description,
      defaultPriceId: price.id
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await getDetailProduct({ params });

  return {
    title: `${product.name} | Ignite Shop`,
    description: product.description || 'Detalhes do produto da loja Ignite Shop',
  };
}

export default async function Product({ params }: Props) {
  const product = await getDetailProduct({ params: params })

  return (
    <>
      <Head>
        <title>{product.product.name} | Ignite Shop</title>
      </Head>
      <ProductContent product={product.product} />
    </>
  );
}
