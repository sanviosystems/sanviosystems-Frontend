import { Routes, Route, useLocation } from "react-router-dom";

// Core Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import MyCart from "./pages/MyCart";
import BuyNow from "./pages/BuyNow";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import WhatsAppButton from "./components/WhatsAppButton";
import Login from "./components/Login";

// Policies
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactAndSupportPolicy from "./pages/ContactAndSupportPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundsANDReturnPolicy from "./pages/RefundsANDReturnPolicy";
import SustainabilityPolicy from "./pages/SustainabilityPolicy";

// Blog/Service Pages  (Mobile_Printers_That_Boost_Productivity_in_Retail)
import Thermalvsdotmatrixprinter from './pages/Thermalvsdotmatrixprinter';
import Bestposprinterretailshopindia from "./pages/Bestposprinterretailshopindia";
import Bestcashdrawerforretailstores from "./pages/Bestcashdrawerforretailstores"
import MatrixPrinter from "./pages/MatrixPrinter";
import Sanvio_systems_business_automation_efficiency_solutions from "./pages/Sanvio_systems_business_automation_efficiency_solutions";
import Revolutionizing_it_automation_ludhiana_sanvio from "./pages/Revolutionizing_it_automation_ludhiana_sanvio";
import Sanvio_systems_ludhiana_retail_technology from "./pages/Sanvio_systems_ludhiana_retail_technology";
import Sanvio_systems_tvs_authorized_partner from "./pages/Sanvio_systems_tvs_authorized_partner";
import Sanvio_office_automation_solutions from "./pages/Sanvio_office_automation_solutions";
import SanvioSystems_Trusted_Office_Automation from "./pages/SanvioSystems_Trusted_Office_Automation";
import Office_automation_pos_solutions_ludhiana from "./pages/Office_automation_pos_solutions_ludhiana";
import Why_every_retail_business_needs_modern_pos_solution from "./pages/Why_every_retail_business_needs_modern_pos_solution";
import Sanvio_systems_digital_retail from "./pages/Sanvio_systems_digital_retail";
import TVS_E_Label_Printers from "./pages/TVS_E_Label_Printers";
import Best_thermal_tvse_printers_sanviosystems from "./pages/Best_thermal_tvse_printers_sanviosystems";
import Mobile_Printers_That_Boost_Productivity_in_Retail from "./pages/Mobile_Printers_That_Boost_Productivity_in_Retail";
import Sanviosystemstvsesparesconsumables from "./pages/Sanviosystemstvsesparesconsumables";


// Admin
import AdminPanel from "./pages/Admin/AdminPanel";
import RequireAdmin from "./components/RequireAdmin";

// 404
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Navbar & WhatsApp - Only for public pages */}
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <WhatsAppButton />}
      {location.pathname === "/" && <Slider />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:id" element={<ProductDetails />} />
        <Route path="/my-cart" element={<MyCart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/buy-now" element={<BuyNow />} />

        {/* Policies */}
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/contactandsupportpolicy" element={<ContactAndSupportPolicy />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/refundsandreturnpolicy" element={<RefundsANDReturnPolicy />} />
        <Route path="/sustainabilitypolicy" element={<SustainabilityPolicy />} />

        {/* Blog/Service Pages */}
        <Route path="/thermalvsdotmatrixprinter" element={<Thermalvsdotmatrixprinter />} />
        <Route path="/bestposprinterretailshopindia" element={<Bestposprinterretailshopindia />} />
        <Route path="/sanvio_systems_business_automation_efficiency_solutions" element={<Sanvio_systems_business_automation_efficiency_solutions />} />
        <Route path="/revolutionizing_it_automation_ludhiana_sanvio" element={<Revolutionizing_it_automation_ludhiana_sanvio />} />
        <Route path="/sanvio_systems_ludhiana_retail_technology" element={<Sanvio_systems_ludhiana_retail_technology />} />
        <Route path="/sanvio_systems_tvs_authorized_partner" element={<Sanvio_systems_tvs_authorized_partner />} />
        <Route path="/sanvio_office_automation_solutions" element={<Sanvio_office_automation_solutions />} />
        <Route path="/sanviosystems_trusted_office_automation" element={<SanvioSystems_Trusted_Office_Automation />} />
        <Route path="/office_automation_pos_solutions_ludhiana" element={<Office_automation_pos_solutions_ludhiana />} />
        <Route path="/why_every_retail_business_needs_modern_pos_solution" element={<Why_every_retail_business_needs_modern_pos_solution />} />
        <Route path="/Sanvio_systems_digital_retail" element={<Sanvio_systems_digital_retail />} />
        <Route path="/TVS_E_Label_Printers" element={<TVS_E_Label_Printers />} />
        <Route path="/Best_thermal_tvse_printers_sanviosystems" element={<Best_thermal_tvse_printers_sanviosystems />} />
        <Route path="/Mobile_Printers_That_Boost_Productivity_in_Retail" element={<Mobile_Printers_That_Boost_Productivity_in_Retail />} />
        <Route path="/MatrixPrinter" element={<MatrixPrinter/>}/>
        <Route path="/Bestcashdrawerforretailstores" element={<Bestcashdrawerforretailstores/>}/>
        <Route path="/Sanviosystemstvsesparesconsumables" element={<Sanviosystemstvsesparesconsumables/>}/>

        {/* Login Route (Before admin) */}
        <Route path="/login" element={<Login />} />

        {/* Admin Route (Protected) */}
        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminPanel />
            </RequireAdmin>
          }
        />

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer - Not on admin pages */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
