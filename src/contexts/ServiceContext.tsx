import { createContext, useContext } from "react";
import {TitleService} from "../services/TitleService.ts";

const titleService = new TitleService();

const ServiceContext = createContext<TitleService | null>(null);

export const ServiceProvider = ({children}: {
  children: React.ReactNode
}) => {
  return (
    <ServiceContext.Provider value={titleService}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useTitleService = () => {
  const service = useContext(ServiceContext);

  if (!service) {
    throw new Error("ServiceProvider manquant");
  }

  return service;
};