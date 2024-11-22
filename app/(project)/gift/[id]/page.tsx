"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDisplay from "../components/ProductDisplay";

export default function ProductPage() {
  const { id } = useParams();
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!productData) {
    return <div>Produto não encontrado</div>;
  }

  return <ProductDisplay data={productData} />;
}
