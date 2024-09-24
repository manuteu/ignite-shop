import ProductContent from "@/components/productContent";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

interface ProductParams {
  params: {
    id: string;
  }
}

async function getDetailProduct({ params }: ProductParams) {
  console.log('params => ', params)
  const productId = params.id

  if (!productId) {
    throw new Error('O ID do produto não foi fornecido.');
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount as number / 100),
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}

export default async function Product(params: { params: { id: string }, searchParams: {} }) {
  const product = await getDetailProduct(params)

  return (
    <ProductContent product={product.props.product} />
  );
}
