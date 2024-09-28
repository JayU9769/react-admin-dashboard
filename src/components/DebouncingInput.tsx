import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";

export interface IProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

const Index: React.FC<IProps> = ({
  className = "",
  placeholder = "",
  value = "",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(inputValue), 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(() => {
    const timeout = setTimeout(() => setInputValue(value), 0);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      placeholder={placeholder}
      value={inputValue}
      onChange={(event) => setInputValue(String(event.target.value))}
      className={`${className}`}
    />
  );
};

export default Index;
