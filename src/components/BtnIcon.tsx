import React from "react";
import Btn from "./Btn";


type BtnIconProps = {
  className?: string;
  onClick: () => void;
  children?: React.ReactNode;
};

const BtnIcon: React.FC<BtnIconProps> = ({ className, onClick, children }) => {
  return (
    <Btn
      className={`ml-3 border px-1.5 py-0.5 rounded text-xs flex items-center text-color-grey-3 border-color-border ${className}`}
      onClick={onClick}
    >
      {children}
    </Btn>
  );
};

export default BtnIcon;