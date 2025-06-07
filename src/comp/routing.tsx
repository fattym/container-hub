import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Ship-Containers-for-Sale";
import Detail from "./Container-Detail-Page";
import Products from "./Advanced-Container-Products-Page";
import QuoteSummary from "./Quote-Summary-Page";
import Compare from "./Shipping-Container-Comparison";
import ShippingQuoteForm from "./getQuote";
import ServicePage from "./Service-Page";
import ContactPage from "./contuct";
import { useEffect, useState } from "react";
function AppRouter() {

  const [quoteItem, setQuoteItem] = useState<{ id: number, quantity: number }[]
  >([]);

  useEffect(()=>{
const quoteItems = localStorage.getItem("addToQuote");
if (quoteItems) {
  setQuoteItem(JSON.parse(quoteItems));
}
  },[])
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products quoteItem={quoteItem} setQuoteItem={setQuoteItem} />
          }
        />
        <Route path="/compare" element={<Compare />} />
        <Route path="/getQuote" element={<ShippingQuoteForm />} />
        <Route path="/quote-summary" element={<QuoteSummary quoteItem={quoteItem} setQuoteItem={setQuoteItem}/>} />
        <Route path="/detail/:id" element={<Detail quoteItem={quoteItem} setQuoteItem={setQuoteItem}/>} />
        <Route path="/services" element={<ServicePage quoteItem={quoteItem} setQuoteItem={setQuoteItem}/>} />
        <Route path="/contact" element={<ContactPage quoteItem={quoteItem} setQuoteItem={setQuoteItem} />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
