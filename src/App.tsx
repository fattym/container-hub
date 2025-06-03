import React from "react";
import AppRouter from "./comp/routing";
import { QuoteProvider } from "./comp/QuoteContext"; // Import QuoteProvider

function App() {
  return (
    <QuoteProvider>
      <AppRouter />
    </QuoteProvider>
  );
}

export default App;
