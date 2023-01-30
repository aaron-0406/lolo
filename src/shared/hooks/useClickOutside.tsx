/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  callback: Function;
}

const ClickOutSideComponent = ({ children, className, callback }: Props) => {
  const useClickOutside = (
    action: Function,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    useEffect(() => {
      const handleMouseDown = (e: MouseEvent) => {
        if (ref.current && !ref.current?.contains(e.target as Node)) action();
      };

      document.addEventListener("mousedown", handleMouseDown);
      return () => {
        document.removeEventListener("mousedown", handleMouseDown);
      };
    }, [ref]);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(callback, wrapperRef);

  return (
    <div className={`${className}`}  ref={wrapperRef}>
      {children}
    </div>
  );
};

ClickOutSideComponent.defaultProps = {
  className: "",
};

export default ClickOutSideComponent;
