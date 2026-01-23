import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import LinkCreated from "./pages/LinkCreated";
import Prank from "./pages/Prank";
import Result from "./pages/Result";
import Friendboard from "./pages/Friendboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Language-aware routes wrapper
const LanguageRoutes = () => (
  <Routes>
    {/* Japanese (default - no prefix) */}
    <Route path="/" element={<Index />} />
    <Route path="/link-created" element={<LinkCreated />} />
    <Route path="/love" element={<Prank />} />
    <Route path="/prank" element={<Prank />} />
    <Route path="/result" element={<Result />} />
    <Route path="/friendboard" element={<Friendboard />} />
    
    {/* Language-prefixed routes */}
    {['en', 'ar', 'es', 'fr'].map((lang) => (
      <Route key={lang} path={`/${lang}`}>
        <Route index element={<Index />} />
        <Route path="link-created" element={<LinkCreated />} />
        <Route path="love" element={<Prank />} />
        <Route path="prank" element={<Prank />} />
        <Route path="result" element={<Result />} />
        <Route path="friendboard" element={<Friendboard />} />
      </Route>
    ))}
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <LanguageRoutes />
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
