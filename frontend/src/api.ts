import axios from "axios";
import type { PortfolioData } from "./types";
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const api = axios.create({ baseURL: API_BASE, headers: { "Content-Type": "application/json" }, timeout: 15000 });
export async function getPortfolio(): Promise<PortfolioData> { const { data } = await api.get<PortfolioData>("/portfolio/"); return data; }
export async function submitContact(payload: { name: string; company: string; email: string; message: string }) { return api.post("/contact/", payload); }
export async function sendChat(payload: { messages: Array<{ role: string; content: string }>; userMessage: string }) { const { data } = await api.post<{ reply: string }>("/chat/", payload); return data; }
