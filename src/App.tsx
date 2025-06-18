import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Homepage from "./pages/Homepage";
import PortfolioPage from "./pages/PortfolioPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/project-detail" element={<ProjectDetailPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
