'use client'

import { useState } from "react";
import CallToAction from "./components/call-to-action";
import FAQ from "./components/faq";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Nav from "./components/nav";
import Plans from "./components/plans";
import SubHero from "./components/sub-hero";

export default function LandingPage() {

  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleFormSubmit = (data: any) => {
    console.log(data)
    setFormData(data);
    setIsModalOpen(true); // Abre o modal de pagamento após o envio do formulário
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Hero onSelectPlan={handlePlanSelect} selectedPlan={selectedPlan} />
        <SubHero onSubmitForm={handleFormSubmit} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onCloseModal={closeModal} formData={formData} selectedPlan={selectedPlan} />
        {/* <Features isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onCloseModal={closeModal} formData={formData} selectedPlan={selectedPlan} /> */}
        {/* <Plans />
        <CallToAction />
        <FAQ /> */}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
