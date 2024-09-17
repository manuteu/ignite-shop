import { useRouter } from "next/router";

export default function Product({ params }: { params: { id: string } }) {

  // const { query } = useRouter()
  return (
    <h1 className="flex flex-1">
      Product: {params.id}
    </h1>
  );
}
