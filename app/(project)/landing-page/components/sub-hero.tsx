"use client"
import Image from "next/image";
import { useForm } from "react-hook-form";

import { AiOutlineGift } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import { LuUser2 } from "react-icons/lu";
import PaymentModal from "./payment";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiLink, FiUpload } from "react-icons/fi";
import { compressFiles } from "@/app/lib/utils";
import toast from "react-hot-toast";
import { saveImagesOnFirebase } from "@/app/actions/save-images-firebase";
import { v4 as uuidv4 } from "uuid";
import ProductDisplay from "../../gift/components/ProductDisplay";

export interface FormInputs {
  id?: string;
  email: string;
  nome: string;
  destinatario: string;
  data: string;
  proximidade: string;
  mensagem: string;
  videoLink?: string;
  plano: string;
}

interface SubHeroProps {
  onSubmitForm: (data: FormInputs) => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
  formData: FormInputs | null;
  selectedPlan: string;
  setIsModalOpen: (isOpen: boolean) => void
}

export default function SubHero({ onSubmitForm, isModalOpen, onCloseModal, selectedPlan, setIsModalOpen }: SubHeroProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormInputs>();

  const [value, setValue] = useState('')
  const [videoLink, setVideoLink] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [savingImages, setSavingImages] = useState(false);
  const [completeData, setCompleteData] = useState<FormInputs | null>(null);
  const [fieldsComplete, setFieldsComplete] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);


  const nome = watch('nome');
  const destinatario = watch('destinatario');
  const data = watch('data');
  const email = watch('email');
  const proximidade = watch('proximidade');

  const validateInputs = () => {
    const numImages = images.length;
    const hasMusic = !!videoLink; // True se houver um link de música
    const areRequiredFieldsFilled = nome && destinatario && data && email && proximidade && value;

    if (!areRequiredFieldsFilled) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (selectedPlan === 'basico' && numImages > 3) {
      setErrorMessage('No plano Basico, você pode enviar no máximo 3 imagens.');
      return false;
    }
    if (selectedPlan === 'pro' && numImages > 5) {
      setErrorMessage('No plano Médio, você pode enviar no máximo 5 imagens.');
      return false;
    }
    if (selectedPlan === 'lifetime' && numImages > 8) {
      setErrorMessage('No plano Vitalício, você pode enviar no máximo 8 imagens.');
      return false;
    }
    if ((selectedPlan === 'pro' || selectedPlan === 'lifetime') && !hasMusic) {
      setErrorMessage('Nos planos Médio e Vitalício, é necessário adicionar uma música.\n Insira o link do youtube da musica que deseja.');
      return false;
    }
    if (numImages === 0) {
      setErrorMessage('Você precisa adicionar as imagens.');
      return false;
    }

    // Se todos os checks passarem, limpa a mensagem de erro
    setErrorMessage(null);
    return true;
  };

  const updateFieldsComplete = () => {
    setFieldsComplete(validateInputs());
  };

  useEffect(() => {
    updateFieldsComplete(); // Valida sempre que os campos mudam ou o plano é alterado
  }, [images, videoLink, selectedPlan, nome, destinatario, data, email, proximidade, value]);

  function removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  const onSubmit = (data: FormInputs) => {
    const isValid = validateInputs();

    if (!isValid) {
      setShowErrorModal(true);
      return;
    }

    const completeData = {
      ...data,
      plano: selectedPlan,
      mensagem: value,
      videoLink: videoLink,
      id: `${removeAccents(nome.toLowerCase().replace(' ', '').trim())}-e-${removeAccents(destinatario.toLowerCase().replace(' ', '').trim())}${uuidv4()}`
    }
    setCompleteData(completeData);
    onSubmitForm(completeData)
  };


  // Simula o clique no input de arquivos de imagem.
  function triggerImageInput() {
    document.getElementById("imagesInput")?.click();
  }

  // Manipula a seleção das imagens e armazena as URLs temporárias localmente (usando URL.createObjectURL).
  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  // Comprime as imagens e as envia para o Firebase, junto com o nome do usuário.
  async function handleUploadImages(data: FormInputs) {
    setSavingImages(true);
    const imagesInput = document.getElementById(
      "imagesInput"
    ) as HTMLInputElement;

    if (!imagesInput || !imagesInput.files || imagesInput.files.length === 0) {
      setSavingImages(false);
      return;
    }

    const compressedFiles = await compressFiles(Array.from(imagesInput.files));
    const formData = createFormData(compressedFiles, data);

    const documentId = await saveImagesOnFirebase(formData, data.id!);
    // handleUploadResponse(documentId);
    setSavingImages(false);
  }

  const createFormData = (compressedFiles: File[], data: any) => {
    const formData = new FormData();
    compressedFiles.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });

    formData.append("nome", data.nome);
    formData.append("email", data.email);
    formData.append("destinatario", data.destinatario);
    formData.append("data", data.data);
    formData.append("proximidade", data.proximidade);
    formData.append("mensagem", data.mensagem);
    formData.append("videoLink", data.videoLink);
    formData.append("plano", data.plano);
    return formData;
  };

  // const handleUploadResponse = (documentId: string | null) => {
  //   if (documentId) {
  //     toast.success(`Documento criado com sucesso!`);
  //   } else {
  //     toast.error("Erro ao criar o documento");
  //   }
  // };

  const handlePreview = () => {
    const isValid = validateInputs();
    if (!isValid) {
      setShowErrorModal(true)
      return
    }
    if (isValid) {
      const previewData: FormInputs = {
        id: `${removeAccents(nome?.toLowerCase()?.replace(" ", "").trim())}&${removeAccents(
          destinatario?.toLowerCase()?.replace(" ", "").trim()
        )}${uuidv4()}`,
        email: email || "",
        nome: nome || "",
        destinatario: destinatario || "",
        data: data || "",
        proximidade: proximidade || "",
        mensagem: value || "",
        videoLink: videoLink || "",
        plano: selectedPlan,
      };

      setCompleteData(previewData);
      setShowPreview(true);
    }
  };


  const handleRemoveImage = (imageUrl: string) => {
    setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
  };




  return (
    <>
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#070707] rounded-x p-6 rounded shadow-lg relative overflow-hidden text-white flex flex-col justify-center">
            <div className="absolute top-0 left-0 right-0 h-0 bg-gradient-to-b from-[#ff007a] via-[#ff1493] to-transparent z-30 shadow-[0px_15px_100px_30px_rgba(255,20,147,0.8)]" />
            <h2 className="text-xl font-bold mb-4">Erro</h2>
            <p>{errorMessage}</p>
            <div className="w-full flex justify-center">
              <button
                onClick={() => setShowErrorModal(false)}
                className="mt-4 text-white px-4 py-2 rounded border w-20"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <ProductDisplay
          data={completeData}
          images={images}
          onClose={() => setShowPreview(false)}
          isModal={true}
        />

      )}


      <div
        id="vantagens"
        className="mx-auto mt-[130px] md:mt-10 md:pt-0"
      >
        <div className="w-full flex flex-col items-center">
          <div className="relative text-center w-full mb-6 md:mb-20 px-9 md:px-0">
            <h2 className=" text-[#223645] font-bold relative text-sm md:text-[27px] md:text-4xl mb-4">
              Agora, vamos criar o <span className={"text-[#EF5DA8]"}>presente perfeito </span>
              <br />
              que você deseja oferecer!
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <div className="flex flex-col md:flex-row justify-around items-start md:w-full p-6 md:p-10 mb:mb-0">
              <Image src={'/landing-page/girl.png'} width={281} height={345} className="w-auto h-auto hidden md:block" alt={'Moça em pé apoiada na frente do notebook'} />

              <div className="md:w-3/5">
                <div className="flex flex-col md:flex-row mb-12 md:mb-[69px] gap-3 md:gap-8 items-center">
                  <label className="text-[#223645] text-xs text-left w-full md:w-auto font-bold whitespace-nowrap mb-[8px] md:mb-0">
                    Escolha o grau de proximidade:
                  </label>
                  <div className="flex flex-wrap gap-4 md:gap-10 text-xs text-[#223645B2]">
                    <label className="inline-flex items-center gap-1">
                      <input
                        {...register("proximidade", { required: true })}
                        type="radio"
                        value="familia"
                        className="form-radio"
                      />
                      <span>Pais</span>
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input
                        {...register("proximidade", { required: true })}
                        type="radio"
                        value="namorado"
                        className="form-radio"
                      />
                      <span>Namorado(a)</span>
                    </label>

                    <label className="inline-flex items-center gap-1">
                      <input
                        {...register("proximidade", { required: true })}
                        type="radio"
                        value="avo"
                        className="form-radio"
                      />
                      <span>Avós</span>
                    </label>

                    <label className="inline-flex items-center gap-1">
                      <input
                        {...register("proximidade", { required: true })}
                        type="radio"
                        value="amigo"
                        className="form-radio"
                      />
                      <span>Amigo(a)</span>
                    </label>

                    <label className="inline-flex items-center gap-1">
                      <input
                        {...register("proximidade", { required: true })}
                        type="radio"
                        value="pet"
                        className="form-radio"
                      />
                      <span>Pet</span>
                    </label>

                    <label className="inline-flex items-center gap-1">
                      <input
                        {...register("proximidade", { required: true })}
                        type="radio"
                        value="Jesus Cristo"
                        className="form-radio"
                      />
                      <span>Jesus Cristo</span>
                    </label>
                  </div>
                  {errors.proximidade && (
                    <p className="text-red-500 text-sm mt-1">
                      Selecione o grau de proximidade.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[#223645] text-xs md:text-base font-bold mb-2">
                      Seu nome <span className="text-[#EF5DA8]">*</span>
                    </label>
                    <div className="relative flex justify-between border gap-2 border-[#0000008C] rounded-full py-[8px] md:py-[10px] px-4 md:px-[21px]">
                      <input
                        {...register("nome", { required: "Nome é obrigatório" })}
                        type="text"
                        placeholder="Digite aqui seu nome"
                        className="w-full text-[10px] md:text-xs outline-none"
                      >
                      </input>
                      <LuUser2 />

                    </div>
                    {errors.nome && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nome.message?.toString()}
                      </p>
                    )}

                  </div>
                  <div>
                    <label className="block text-[#223645] text-xs md:text-base font-bold mb-2">
                      Nome do destinatário <span className="text-[#EF5DA8]">*</span>
                    </label>
                    <div className="relative flex justify-between border gap-2 border-[#0000008C] rounded-full py-[8px] md:py-[10px] px-4 md:px-[21px]">

                      <input
                        {...register("destinatario", {
                          required: "Nome do destinatário é obrigatório",
                        })}
                        type="text"
                        placeholder="Digite aqui o nome do destinatário"
                        className="w-full text-[10px] md:text-xs outline-none"
                      >
                      </input>
                      <div className="flex">
                        <LuUser2 />

                        <AiOutlineGift />

                      </div>
                    </div>
                    {errors.destinatario && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.destinatario.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:mb-6">
                    <label className="block text-[#223645] text-xs md:text-base font-bold mb-2" >
                      Data comemorativa <span className="text-[#EF5DA8]">*</span>
                    </label>
                    <input
                      {...register("data", { required: "Data de quando vocês se conheceram" })}
                      type="datetime-local"
                      className="w-full text-xs py-2 md:py-[10px] px-4 md:px-[21px] border border-[#0000008C] rounded-full"
                    />
                    {errors.data && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.data.message?.toString()}
                      </p>
                    )}
                  </div>

                  <div className="md:mb-6">
                    <label className="block text-[#223645] text-xs md:text-base font-bold mb-2">
                      Seu melhor email <span className="text-[#EF5DA8]">*</span>
                    </label>
                    <input
                      {...register("email", { required: "Email é obrigatório" })}
                      type="email"
                      placeholder="Digite aqui seu email"
                      className="w-full text-[10px] md:text-xs py-[10px] px-[21px] border border-[#0000008C] rounded-full"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="z-1000">
                  <label className="block text-[#223645] text-xs md:text-base font-bold mb-2">
                    {'O que faz ele(a) ser tão especial?'} <span className="text-[#EF5DA8]">*</span>
                  </label>
                  <textarea
                    {...register("mensagem", { required: "Mensagem é obrigatória" })}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Use esse campo para expressar tudo que quiser!"
                    className="w-full p-2 border text-[10px] md:text-xs border-[#0000008C] rounded"
                    style={{ height: "160px" }}
                  />
                  {errors.mensagem && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mensagem?.message?.toString()}
                    </p>
                  )}
                </div>

              </div>
            </div>

            <div className="relative z-10 w-full opacity-100 h-[30px] -bottom-3 md:-bottom-2">
              <Image
                src="/landing-page/divisor.png"
                alt="Divisor de topo"
                layout="fill"
                objectFit="contain"
                priority={true}
              />
            </div>
            <div className="relative w-full flex flex-col items-center mx-auto py-8 md:py-16 bg-[#FCEEFD] rounded-lg shadow-lg">
              <div className="absolute left-0 top-0 z-0 w-auto h-auto md:w-[400px] md:h-[500px] opacity-100 transform rotate-45">
                <Image
                  src="/landing-page/decorationLeft.png"
                  alt="Ícones de fundo à esquerda"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </div>
              <div className="absolute right-0 bottom-0 md:-top-10 z-0 w-auto h-auto md:w-[400px] md:h-[500px] opacity-100">
                <Image
                  src="/landing-page/decorationRight.png"
                  alt="Ícones de fundo à direita"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </div>

              <div className="w-full flex flex-col items-center relative z-10 px-8 mx:px-0">
                <h2 className="text-center text-sm md:text-3xl font-bold mb-11 md:mb-24 text-[#223645]">
                  <span className="text-[#EF5DA8]">Personalize o presente:</span> adicione músicas,
                  <br className="hidden md:block" />
                  {' '}fotos e finalize sua surpresa
                </h2>

                <div className="flex flex-col md:w-[56%] justify-start md:justify-between items-center gap-8 px-4 mb-12 md:mb-0">
                  <div className="w-full flex flex-col md:flex-row md:gap-6 mb-8 md:mb-16">
                    <label className="block text-[#223645] text-xs font-bold mb-7 md:mb-2 whitespace-nowrap">
                      Upload de arquivos:
                    </label>
                    <div className="w-full border border-dashed border-[#00000040] p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">
                      <div className="flex flex-wrap items-center gap-3">
                        {images.length === 0 ? (
                          <>
                            <FiUpload className="text-[#EF5DA8] text-4xl mr-2" />
                            <div className="flex flex-col gap-2">
                              <p className="text-xs md:text-sm text-black">
                                {!images || "Escolher arquivo para personalizar seu presente"}
                              </p>
                              <p className="text-[10px] md:text-xs text-[#6F6F6F]">
                                {images && "Nenhum arquivo selecionado"}
                              </p>
                            </div>
                          </>
                        ) : (
                          images.map((image) => (
                            <div key={image} className="relative">
                              <img
                                src={image}
                                alt="image"
                                className="w-16 object-cover rounded"
                              />
                              <button
                                onClick={() => handleRemoveImage(image)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-[2px] text-xs"
                              >
                                ✕
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                      <input
                        id="imagesInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageInput}
                        className="hidden"
                        multiple
                      />
                      <label
                        htmlFor="file-upload"
                        onClick={triggerImageInput}
                        className="cursor-pointer text-[10px] md:text-xs text-[#EF5DA8] bg-white py-2 px-4 border border-[#EF5DA8] rounded-md inline-block"
                      >
                        SELECIONAR
                      </label>
                    </div>
                  </div>

                  {selectedPlan !== 'basico' && (
                    <div className="w-full flex flex-col md:flex-row md:gap-6 md:mb-24">
                      <label className="block text-[#223645] text-xs font-bold mb-4 md:mb-2 whitespace-nowrap">
                        Selecione a trilha
                        <br className="hidden md:block" />
                        sonora do presente:
                      </label>
                      <div className="border border-dashed border-[#00000040] p-4 rounded-lg flex items-center w-full justify-between">
                        <FiLink className="text-[#EF5DA8] text-4xl mr-2" />
                        <input
                          type="text"
                          placeholder="Cole o Link do vídeo da música desejada do YouTube"
                          className="w-full p-3 text-sm border-none outline-none bg-transparent text-[#6F6F6F]"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 md:mt-8">
                  <button type="button" onClick={handlePreview} className="flex items-center text-xs text-[#EF5DA8] border border-[#EF5DA8] px-6 py-3 rounded-full md:font-medium hover:bg-[#f8e6ef] transition">
                    Ver como ficou
                    <span className="ml-2">
                      <MdKeyboardArrowRight />
                    </span>
                  </button>

                  <div className="relative">
                    <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-[-1] w-[57px] md:w-[60px] h-[57px] md:h-[60px]">
                      <Image
                        src="/landing-page/before.png"
                        alt="Decorator"
                        layout="fill"
                        objectFit="contain"
                        className="opacity-100"
                      />
                    </div>

                    <button
                      onClick={() => fieldsComplete && setIsModalOpen(true)}
                      className={`bg-[#EF5DA8] z-10 text-white px-6 py-3 text-xs rounded-full font-bold transition flex items-center`}
                    >
                      Criar meu presente
                      <span className="ml-2">
                        <Image
                          src="/landing-page/arrow-right.png"
                          alt="Arrow Right"
                          width={18}
                          height={18}
                        />
                      </span>
                    </button>

                    <PaymentModal
                      isOpen={isModalOpen}
                      onClose={onCloseModal}
                      formData={completeData}
                      selectedPlan={selectedPlan}
                      handleUploadImages={handleUploadImages}
                      images={images[0]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    </>
  );
}

