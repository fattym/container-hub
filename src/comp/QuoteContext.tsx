import React, { createContext, useState } from "react";

// Define the type for quote items
interface QuoteItem {
  id: number;
  quantity: number;
}

// Define the context type
interface QuoteContextType {
  quoteItems: QuoteItem[];
  setQuoteItems: React.Dispatch<React.SetStateAction<QuoteItem[]>>;
}

// Create the context with a default value
const QuoteContext = createContext<QuoteContextType>({
  quoteItems: [],
  setQuoteItems: () => {},
});

// Create a provider component
const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  return (
    <QuoteContext.Provider value={{ quoteItems, setQuoteItems }}>
      {children}
    </QuoteContext.Provider>
  );
};

export { QuoteContext, QuoteProvider };
