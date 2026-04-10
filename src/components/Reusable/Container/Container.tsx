import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-300 2xl:max-w-7xl w-full mx-auto px-5 2xl:px-0">
      {children}
    </div>
  );
};

export default Container;
