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
  const [isModalTutorialOpen, setIsModalTutorialOpen] = useState(false)

  console.log(isModalTutorialOpen)

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleFormSubmit = (data: any) => {
    console.log(data)
    setFormData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeTutorialModal = () => {
    setIsModalTutorialOpen(false)
  }

  return (
    <>
      <header>
        <Nav setIsModalTutorialOpen={setIsModalTutorialOpen} isModalTutorialOpen={isModalTutorialOpen} onCloseModal={closeTutorialModal} />
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
