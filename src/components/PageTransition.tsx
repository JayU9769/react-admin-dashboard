import React from "react";
import {motion} from 'framer-motion';


interface IProps {
  children: React.ReactNode;
}

const Index: React.FC<IProps> = ({children}) => {
  return (
    <motion.div
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
