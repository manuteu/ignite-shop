// app/(home)/page.tsx (Server Component)

import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import Home from '../components/home'

// Server-side fetching
async function getProducts() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount as number / 100),
    }
  })

  return products
}
export const revalidate = 100;

export default async function Page() {
  const products = await getProducts()

  // Render client component and pass products as props
  return <Home products={products} />
}