import SuccessContent from "@/components/successContent";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Stripe from "stripe";

type Props = {
  searchParams: { session_id: string }
}

async function getSuccessProductCheckout({ searchParams }: Props) {
  if (!searchParams.session_id) {
    return redirect('/')
  }

  const sessionId = String(searchParams.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const costumerName = session?.customer_details?.name;
  const product = session?.line_items?.data[0]?.price?.product as Stripe.Product;

  return {
    props: {
      costumerName: costumerName || '',
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}

export const metadata: Metadata = {
  title: 'Compra efetuada | Ignite Shop',
}

export default async function Success({ searchParams }: Props) {
  const successData = await getSuccessProductCheckout({ searchParams: searchParams })

  return (
    <SuccessContent costumerName={successData.props.costumerName} product={successData.props.product} />
  );
}
