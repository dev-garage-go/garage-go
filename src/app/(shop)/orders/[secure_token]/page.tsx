import { getOrderBySecureToken } from "@/backend/actions";
import { ErrorMessage } from "@/components";

interface Props {
  params: {
    secure_token: string
  }
}

export default async function OrderSecureTokenPage({ params }: Props) {
  const secureToken = params.secure_token

  const response = await getOrderBySecureToken(secureToken)
  if (!response.success || !response.data) {
    return (
      <div className="new-page max-w-page padding-central-page w-full">
        <ErrorMessage message="No se pueden obtener los datos de su orden" />
      </div>
    )
  }

  const order = response.data

  return (
    <section className="new-page max-w-page padding-central-page w-full">
      <div>
        <h1>Orden: #{order._id.slice(0, 10)}</h1>
        <pre>
          {JSON.stringify(order, null, 2)}
        </pre>
      </div>
    </section>
  );
}