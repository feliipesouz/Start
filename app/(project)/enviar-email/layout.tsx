import { ReactNode } from "react";

// Rota protegida por autenticação. Somente acessível para usuários autenticados.
// Todas rotas /enviar-email/** são protegidas por essa autenticação.
export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {

  return <>{children}</>;
}
