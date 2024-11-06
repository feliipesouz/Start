"use client";

import useMercadoPago from "../hooks/useMercadoPago";

export default function MercadoPagoButton({
  testeId,
  email,
  payment,
  confirmaPix,
  children,
  ...props
}: {
  testeId: string;
  email: string | undefined;
  payment: string;
  confirmaPix: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  
  const { createMercadoPagoCheckout } = useMercadoPago();

  function handleCheckout() {
    if (confirmaPix && payment === "pix") {
      return createMercadoPagoCheckout({
        testeId,
        email,
      });
    }
  }

  return (
    <button
      {...props}
    >
      {children}
    </button>
  );
}
