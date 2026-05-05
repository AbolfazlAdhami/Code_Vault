"use client";
import type { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

export const CookiesProviderHOC = ({ children }: { children: ReactNode }) => <CookiesProvider>{children}</CookiesProvider>;
