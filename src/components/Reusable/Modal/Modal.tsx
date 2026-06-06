import { RxCross1 } from "react-icons/rx";

type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: string;
};
const Modal: React.FC<TModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  children,
  width = "w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%]",
}) => {
  return (
    <div
      className={`${
        isModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-200000000 bg-neutral-5/60 backdrop-blur-xs flex items-center justify-center font-Nunito transition-all duration-500`}
    >
      <div
        className={`${
          isModalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } ${width} h-fit max-h-[70vh] overflow-y-auto bg-white rounded-lg p-3 md:p-6 transition-all duration-300 relative`}
      >
        <RxCross1
          className="text-lg cursor-pointer absolute top-3 right-3"
          onClick={() => setIsModalOpen(false)}
        />

        {children}
      </div>
    </div>
  );
};

export default Modal;
