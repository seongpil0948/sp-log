"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import CommonProvider from "./common";
import { AnimatePresence, motion } from "framer-motion";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider
        {...{
          defaultTheme: "light",
        }}
        {...themeProps}
      >
        <CommonProvider>
          <AnimatePresence
            mode="wait"
            // initial={true}
            // onExitComplete={() => window.scrollTo(0, 0)}
          >
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </CommonProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
