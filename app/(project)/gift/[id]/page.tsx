"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDisplay from "../components/ProductDisplay";

export default function ProductPage() {
  const { id } = useParams() || {};
  console.log('ID do Produto:', id);

  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log(productData)

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/get-gift-data/${id}`);
        const data = await res.json();
        console.log(data)
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

    fetchData();
  }, [id]);

  if (loading || !id) {
    return <div>Carregando...</div>;
  }


  if (!productData) {
    return <div>Produto não encontrado</div>;
  }

  return <ProductDisplay data={productData} />;
}
