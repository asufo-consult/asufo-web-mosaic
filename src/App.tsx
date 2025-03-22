
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Cookies from "./pages/Cookies";
import Admin from "./pages/Admin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import SolutionsAdmin from "./pages/admin/SolutionsAdmin";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ContactMessagesAdmin from "./pages/admin/ContactMessagesAdmin";
import SubscribersAdmin from "./pages/admin/SubscribersAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/services" element={<ServicesAdmin />} />
              <Route path="/admin/solutions" element={<SolutionsAdmin />} />
              <Route path="/admin/projects" element={<ProjectsAdmin />} />
              <Route path="/admin/contact-messages" element={<ContactMessagesAdmin />} />
              <Route path="/admin/subscribers" element={<SubscribersAdmin />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
