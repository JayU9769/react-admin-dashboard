import React from "react";
import {AnimatePresence, motion} from 'framer-motion';
import {useLocation} from "react-router-dom";


interface IProps {
  children: React.ReactNode;
}

const Index: React.FC<IProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
