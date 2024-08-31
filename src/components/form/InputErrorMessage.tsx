import React from "react";

interface IProps {
  message: string;
}

const Index: React.FC<IProps> = ({ message }) => <p className={`text-[0.8rem] text-destructive`}>{message}</p>

export default Index;