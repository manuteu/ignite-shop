import { styled } from "@/styles";
import { useRouter } from "next/router";

const Button = styled('button', {
  backgroundColor: '$rocketseat',
  borderRadius: 4,
  border: 0,
  padding: '4px 8px',

  span: {
    fontWeight: 'bold'
  },

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})

export default function Product({ params }: { params: { id: string } }) {

  // const { query } = useRouter()
  return (
    <Button>
      <span>Testedassd</span>
      Product: {params.id}
    </Button>
  );
}
