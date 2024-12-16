import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  classNames?: string;
};

const Button = ({ children, classNames }: ButtonProps) => {
  return (
    <button
      className={`text-black text-[12px] uppercase rounded-full font-general font-semibold py-2 px-6 ${classNames}`}
    >
      {children}
    </button>
  );
};

export default Button;
