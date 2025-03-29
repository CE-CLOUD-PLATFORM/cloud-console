"use client";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { createTheme } from "./index";
import type { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = createTheme({
    colorPreset: "blue",
    paletteMode: "light",
  });

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
