import React from "react";
import {motion} from 'framer-motion';
import {useLocation, useMatches} from "react-router-dom";


interface IProps {
  children: React.ReactNode;
  id?: string;
}

const Index: React.FC<IProps> = ({children, id}) => {
  const {pathname} = useLocation();
  const matches = useMatches()
  console.log(matches[matches.length - 1]?.id, "User");
  return (
    <motion.div
      key={id || pathname}
      initial={{opacity: 0, x: -50}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, x: 50}}
    >
      {children}
    </motion.div>
  )
    ;
};

export default Index;
