// src/contexts/GlobalContext.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [scoreData, setScoreData] = useState(Array(10).fill(0));
  const [qchatRespuestas, setQchatRespuestas] = useState([]);
  const [resumenTotal, setResumenTotal] = useState([]);
  const [evolComunicativas, setEvolComunicativas] = useState([]);
  const [evolSociales, setEvolSociales] = useState([]);
  const [porcentajeComunicativas, setPorcentajeComunicativas] = useState(0);
    const [porcentajeSociales, setPorcentajeSociales] = useState(0);
    const [acumComunicativas, setAcumComunicativas] = useState([]);
    const [acumSociales, setAcumSociales] = useState([]);


  return (
    <GlobalContext.Provider
      value={{
        scoreData,
        setScoreData,
        qchatRespuestas,
        setQchatRespuestas,
        resumenTotal,
        setResumenTotal,
        evolComunicativas,
        setEvolComunicativas,
        evolSociales,
        setEvolSociales,
        porcentajeComunicativas,
        setPorcentajeComunicativas,
        porcentajeSociales,
        setPorcentajeSociales,
        acumComunicativas,
        setAcumComunicativas,
        acumSociales,
        setAcumSociales
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
