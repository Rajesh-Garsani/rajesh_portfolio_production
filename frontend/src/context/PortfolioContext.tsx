import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getPortfolio } from "../api";
import { fallbackPortfolio } from "../data";
import type { PortfolioData } from "../types";
const PortfolioContext = createContext<{ data: PortfolioData; loading: boolean }>({ data: fallbackPortfolio, loading: false });
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(fallbackPortfolio);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getPortfolio().then(setData).catch(() => setData(fallbackPortfolio)).finally(() => setLoading(false)); }, []);
  return <PortfolioContext.Provider value={{ data, loading }}>{children}</PortfolioContext.Provider>;
}
export function usePortfolio() { return useContext(PortfolioContext); }
