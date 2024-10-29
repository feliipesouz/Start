"use client"
import Image from "next/image";
import { useForm } from "react-hook-form";

import { AiOutlineGift } from "react-icons/ai";


import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LuUser2 } from "react-icons/lu";


export default function SubHero() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState('');

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }, { 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color', 'background', 'align'
  ];

  return (
    <div
      id="vantagens"
      className="max-w-[90%] flex flex-col items-center md:max-w-[1200px] mx-auto mt-10 mb-4 md:pt-0"
    >
      <div className="relative text-center w-full md:w-[800px] mb-20">
        {/* <h2 className="block md:hidden text-[#223645] font-bold relative text-3xl md:text-4xl mb-4">
          Agora, vamos criar o <span className={"text-[#EF5DA8]"}>presente perfeito</span>
          <br className="hidden md:block" />
          que você deseja oferecer!
        </h2> */}
        <h2 className="hidden md:block text-[#223645] font-bold relative text-[27px] md:text-4xl mb-4">
          Agora, vamos criar o <span className={"text-[#EF5DA8]"}>presente perfeito</span>
          <br className="hidden md:block" />
          que você deseja oferecer!
        </h2>
      </div>

      <div className="w-full md:w-3/4 bg-white p-6 md:p-10 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mb-[69px] gap-8 items-center">
            <label className="text-[#223645] font-bold whitespace-nowrap">
              Escolha o grau de proximidade:
            </label>
            <div className="flex flex-wrap gap-10 text-xs text-[#223645B2]">
              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="familia"
                  className="form-radio"
                />
                <span className="ml-2">Pais</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="namorado"
                  className="form-radio"
                />
                <span className="ml-2">Namorado(a)</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="avo"
                  className="form-radio"
                />
                <span className="ml-2">Avós</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="amigo"
                  className="form-radio"
                />
                <span className="ml-2">Amigo(a)</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="outros"
                  className="form-radio"
                />
                <span className="ml-2">Pet</span>
              </label>
            </div>
            {errors.proximidade && (
              <p className="text-red-500 text-sm mt-1">
                Selecione o grau de proximidade.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div >
              <label className="block text-[#223645] font-bold mb-2">
                Seu nome <span className="text-[#EF5DA8]">*</span>
              </label>
              <div className="relative flex justify-between border gap-2 border-[#0000008C] rounded-full py-[10px] px-[21px]">
                <input
                  {...register("nome", { required: "Nome é obrigatório" })}
                  type="text"
                  placeholder="Digite aqui seu nome"
                  className="w-full text-xs outline-none"
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
              <label className="block text-[#223645] font-bold mb-2">
                Nome do destinatário <span className="text-[#EF5DA8]">*</span>
              </label>
              <div className="relative flex justify-between border gap-2 border-[#0000008C] rounded-full py-[10px] px-[21px]">

                <input
                  {...register("destinatario", {
                    required: "Nome do destinatário é obrigatório",
                  })}
                  type="text"
                  placeholder="Digite aqui o nome do destinatário"
                  className="w-full text-xs outline-none"
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

          <div className="mb-6 w-1/2 pr-3">
            <label className="block text-[#223645] font-bold mb-2" >
              Data comemorativa <span className="text-[#EF5DA8]">*</span>
            </label>
            <input
              {...register("data")}
              type="date"
              className="w-full text-xs py-[10px] px-[21px] border border-[#0000008C] rounded-full"
            />
          </div>

          <div>
            <label className="block text-[#223645] font-bold mb-2">Escreva sua mensagem personalizada <span className="text-[#EF5DA8]">*</span></label>
            {/* <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              placeholder="Use esse campo para expressar tudo que quiser!"
              style={{ height: '160px' }}
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
}
