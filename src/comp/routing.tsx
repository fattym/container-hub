import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Ship-Containers-for-Sale";
import Detail from "./Container-Detail-Page";
import Products from "./Advanced-Container-Products-Page";
import QuoteSummary from "./Quote-Summary-Page";
import Compare from "./Shipping-Container-Comparison";
import ShippingQuoteForm from "./getQuote";
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/getQuote" element={<ShippingQuoteForm />} />
        <Route path="/quote-summary" element={<QuoteSummary />} />
        <Route path="/detail/:id" element={<Detail />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
