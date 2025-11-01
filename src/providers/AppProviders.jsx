import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return <>{children}</>;
}

// function ThemeProvider({ children }) {
//   useEffect(() => {
//     const isDarkMode = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }

//     // Listen for theme changes
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = (e) => {
//       if (e.matches) {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     };

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   return <>{children}</>;
// }

function AuthProvider({ children }) {
  // TODO: Implement auth context with user role, login/logout, etc.
  // For now, just pass through children
  return <>{children}</>;
}

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider delayDuration={0}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
