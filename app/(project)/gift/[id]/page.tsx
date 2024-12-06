"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDisplay from "../components/ProductDisplay";
import { ClipLoader } from "react-spinners";
import * as gtag from "@/app/lib/gtag";

export default function ProductPage() {
  const { id } = useParams() || {};

  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/get-gift-data/${id}`);
        const data = await res.json();

        if (!data.error) {
          setProductData(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    gtag.event({
      action: "open_product_link",
      category: "Product Access",
      label: `Produto ID: ${id}`,
      value: 1,
    });

    fetchData();
  }, [id]);

  if (loading || !id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }


  if (!productData) {
    return <div className="flex items-center justify-center">Produto não encontrado</div>;
  }

  return <ProductDisplay data={productData} />;
}
