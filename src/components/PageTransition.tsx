import React from "react";
import {AnimatePresence, motion} from 'framer-motion';


interface IProps {
  children: React.ReactNode;
}

const Index: React.FC<IProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={window.location.pathname}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
