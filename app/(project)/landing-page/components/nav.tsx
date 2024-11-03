import Image from "next/image";
import NavMobile from "./nav-mobile";
import Link from "next/link";
import TutorialModal from "./tutorial";

interface NavProps {
  isModalTutorialOpen: boolean,
  setIsModalTutorialOpen: (isOpen: boolean) => void
  onCloseModal: () => void
}
export default function Nav({ isModalTutorialOpen, setIsModalTutorialOpen, onCloseModal }: NavProps) {

  return (
    <nav className="relative w-full z-10 md:mt-0 py-4 md:py-5 bg-white">
      <div className="flex items-center justify-center text-[#223645] gap-3 md:gap-9 mx-4 md:mx-[10vw]">
        <div className="relative">
          <Link href={"/landing-page"} className="flex items-center gap-2">
            <div className="relative size-7 md:size-9">
              <Image
                src="/landing-page/logo.png"
                fill
                alt="Template Logo"
                className="object-fit object-center"
                priority
              />
            </div>
            <span className="text-base md:text-lg">
              Você é <span className={"text-[#EF5DA8]"}>Especial</span>
            </span>
          </Link>
        </div>
        <div className="ml-auto hidden md:block">
          <Link href={"/landing-page"} passHref>
            <button className="flex gap-2 items-center">
              <div className="relative w-5 h-5">
                <Image
                  src="/landing-page/ic-login.svg"
                  fill
                  alt="Ícone de Login"
                  className="object-cover object-left"
                />
              </div>
              <span className="text-[#EF5DA8] text-sm">Home</span>
            </button>
          </Link>
        </div>
        <div className="ml-auto md:ml-0">
          <button onClick={() => setIsModalTutorialOpen(true)} className="text-sm font-medium text-white bg-[#EF5DA8] rounded-full px-4 py-2">
            Ver tutorial
          </button>
        </div>
      </div>
      <TutorialModal isOpen={isModalTutorialOpen} onClose={onCloseModal} />
    </nav>
  );
}
