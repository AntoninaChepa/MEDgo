import { env } from "@/lib/env.mjs";
import "@/styles/globals.css";
import { createClient } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
export const supabaseClient = createClient(
  env.NEXT_PUBLIC_BACKEND_API_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Toaster position="top-right" closeButton />
      <QueryClientProvider client={queryClient}>
        <main className={`${inter.className} subpixel-antialiased`}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  );
}
