"use client"
import { useForm } from "react-hook-form";
export default function SubHero() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div
      id="vantagens"
      className="max-w-[90%] md:max-w-[1200px] mx-auto pt-10 md:pt-0"
    >
      <div className="relative text-center mt-10 w-full md:w-[800px] mx-auto">
        <h2 className="block md:hidden text-[#223645] font-bold relative text-3xl md:text-4xl  mb-4">
          Agora, vamos criar o <span className={"text-[#EF5DA8]"}>presente perfeito</span>
          <br className="hidden md:block" />
          que você deseja oferecer!
        </h2>
        <h2 className="hidden md:block text-[#223645] font-bold relative text-3xl md:text-4xl  mb-4">
          Agora, vamos criar o <span className={"text-[#EF5DA8]"}>presente perfeito</span>
          <br className="hidden md:block" />
          que você deseja oferecer!
        </h2>
      </div>

      <div className="w-full md:w-3/4 bg-white p-6 md:p-10 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex mb-6">
            <label className="block text-[#223645] font-bold mb-2">
              Escolha o grau de proximidade:
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="familia"
                  className="form-radio"
                />
                <span className="ml-2">Família (pai/mãe)</span>
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
                  value="conjuge"
                  className="form-radio"
                />
                <span className="ml-2">Cônjuge</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="pet"
                  className="form-radio"
                />
                <span className="ml-2">Pet</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="avo"
                  className="form-radio"
                />
                <span className="ml-2">Avô/Avó</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("proximidade", { required: true })}
                  type="radio"
                  value="parceiro"
                  className="form-radio"
                />
                <span className="ml-2">Parceiro(a)</span>
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
                <span className="ml-2">Outros</span>
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
              <label className="block text-[#223645] font-bold mb-2">
                Seu nome <span className="text-[#EF5DA8]">*</span>
              </label>
              <input
                {...register("nome", { required: "Nome é obrigatório" })}
                type="text"
                placeholder="Digite aqui seu nome"
                className="w-full p-3 border border-[#E4E4E4] rounded-full"
              />
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
              <input
                {...register("destinatario", {
                  required: "Nome do destinatário é obrigatório",
                })}
                type="text"
                placeholder="Digite aqui o nome do destinatário"
                className="w-full p-3 border border-[#E4E4E4] rounded-full"
              />
              {errors.destinatario && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.destinatario.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[#223645] font-bold mb-2" >
              Data comemorativa
            </label>
            <input
              {...register("data")}
              type="date"
              className="w-full p-3 border border-[#E4E4E4] rounded-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#223645] font-bold mb-2">
              Escreva sua mensagem personalizada
            </label>
            <textarea
              {...register("mensagem")}
              className="w-full p-3 border border-[#E4E4E4] rounded-lg"
              rows={6}
              placeholder="Use esse campo para expressar tudo que quiser!"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EF5DA8] text-white p-3 rounded-lg font-medium"
          >
            Enviar Presente
          </button>
        </form>
      </div>

    </div>
  );
}
