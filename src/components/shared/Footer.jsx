import React from 'react';

const Footer = ({ year = new Date().getFullYear(), authors = "LEON ALEXIS - CASTRO ERNESTO" }) => {
  return (
    <footer className="text-center text-gray-500 text-sm mt-10 w-full">
      <p>© {year} TESIS I • {authors}</p>
    </footer>
  );
};

export default Footer;
