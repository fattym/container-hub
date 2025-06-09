// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { ContainerType } from "./containerTypes";
import Navbar2 from "./com/nvabar2";
import Footer from "./com/footer";

type QuoteProps = {
  quoteItem: { id: number, quantity: number }[];
  setQuoteItem: React.Dispatch<React.SetStateAction<{ id: number, quantity: number }[]>>;
};

const Product: React.FC<QuoteProps> = ({quoteItem,setQuoteItem}) => {
  // Price range state
  const [priceRange] = useState<[number, number]>([1000, 10000]);
  // Filter states
  const [containerTypeFilter, setContainerTypeFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("default");
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Comparison state
  const [compareItems, setCompareItems] = useState<number[]>([]);
  const [showCompareBar, setShowCompareBar] = useState<boolean>(false);
  // Quick view modal state
  const [quickViewItem, setQuickViewItem] = useState<number | null>(null);
  // Filter dropdowns state
  const [showTypeDropdown, setShowTypeDropdown] = useState<boolean>(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState<boolean>(false);
  const [showConditionDropdown, setShowConditionDropdown] =
    useState<boolean>(false);
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  // Mobile filters state
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  // Quote state
  const [quoteItems, setQuoteItems] = useState<number[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Set quote items to local storage
  useEffect(() => {
    localStorage.setItem("addToQuote", JSON.stringify(quoteItem));
  }, [quoteItem]);

  // Update compare bar visibility when items are added/removed
  useEffect(() => {
    setShowCompareBar(compareItems.length > 0);
  }, [compareItems]);

  // Handle adding/removing items from comparison
  const toggleCompare = (id: number) => {
    if (compareItems.includes(id)) {
      setCompareItems(compareItems.filter((item) => item !== id));
    } else {
      if (compareItems.length < 3) {
        setCompareItems([...compareItems, id]);
      } else {
        alert("You can compare up to 3 items at a time");
      }
    }
  };

  // Handle clearing all comparison items
  const clearCompare = () => {
    setCompareItems([]);
  };

  // Handle opening quick view modal
  const openQuickView = (id: number) => {
    setQuickViewItem(id);
  };

  // Handle closing quick view modal
  const closeQuickView = () => {
    setQuickViewItem(null);
  };

  // Reset all filters
  const resetFilters = () => {
    setContainerTypeFilter("all");
    setSizeFilter("all");
    setConditionFilter("all");
    setSortOption("default");
    setSearchTerm("");
  };

  // Add to quote
  useEffect(() => {
    if (quoteItems.length > 0) {
      localStorage.setItem("quoteItems", JSON.stringify(quoteItems));
    }
  }, [quoteItems]);

  const addToQuote = (id: number) => {
    if (!quoteItems.includes(id)) {
      setQuoteItems([...quoteItems, id]);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  // Filter and sort containers
  const filteredContainers = ContainerType.filter((container) => {
    // Filter by price range
    if (
      Number(container.price) < priceRange[0] ||
      Number(container.price) > priceRange[1]
    ) {
      return false;
    }
    // Filter by container type
    if (
      containerTypeFilter !== "all" &&
      !container.type.toLowerCase().includes(containerTypeFilter.toLowerCase())
    ) {
      return false;
    }
    // Filter by size
    if (
      sizeFilter !== "all" &&
      (!container.size ||
        container.size.toLowerCase() !== sizeFilter.toLowerCase())
    ) {
      return false;
    }
    // Filter by condition
    if (conditionFilter !== "all" && container.condition !== conditionFilter) {
      return false;
    }
    // Filter by search term
    if (
      searchTerm &&
      !container.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !container.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    // Sort by selected option
    switch (sortOption) {
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Get container by ID
  const getContainerById = (id: number) => {
    return ContainerType.find((container) => container.id === id);
  };

  // Handle navigation to quick view modal

  // Handle navigation to comparison page with selected items


const handleAddToQuote = (productId: number, quantity: number = 1) => {
    setQuoteItem((prev) => [...prev, { id: productId, quantity: quantity }]);
    // Write the item details to localStorage.
    // The QuoteSummary page is listening for this 'addToQuote' key.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <Navbar2 quoteItem={quoteItem} setQuoteItem={setQuoteItem} />
      {/* Toast Notification */}
      {/* Toast Notification */}

      {/* Page Title */}
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Shipping Containers
          </h1>
          <div className="flex items-center mt-2 text-sm">
            <Link
              to={"/"}
              data-readdy="true"
              className="text-blue-100 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </Link>
            <i className="fas fa-chevron-right mx-2 text-xs text-blue-200"></i>
            <span>Products</span>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm flex items-center justify-between !rounded-button whitespace-nowrap cursor-pointer"
            >
              <span className="font-medium">Filters & Sorting</span>
              <i
                className={`fas ${
                  showMobileFilters ? "fa-chevron-up" : "fa-chevron-down"
                }`}
              ></i>
            </button>
          </div>
          {/* Filters - Desktop and Mobile */}
          <div
            className={`${
              showMobileFilters ? "block" : "hidden"
            } lg:block lg:w-1/4`}
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                >
                  Reset All
                </button>
              </div>
              {/* Price Range Filter */}

              {/* Container Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Container Type</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {containerTypeFilter === "all"
                        ? "All Types"
                        : containerTypeFilter}
                    </span>
                    <i
                      className={`fas ${
                        showTypeDropdown ? "fa-chevron-up" : "fa-chevron-down"
                      }`}
                    ></i>
                  </button>
                  {showTypeDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <ul>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            containerTypeFilter === "all"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setContainerTypeFilter("all");
                            setShowTypeDropdown(false);
                          }}
                        >
                          All Types
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            containerTypeFilter === "standard"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setContainerTypeFilter("standard");
                            setShowTypeDropdown(false);
                          }}
                        >
                          Standard
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            containerTypeFilter === "high cube"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setContainerTypeFilter("high cube");
                            setShowTypeDropdown(false);
                          }}
                        >
                          High Cube
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            containerTypeFilter === "refrigerated"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setContainerTypeFilter("refrigerated");
                            setShowTypeDropdown(false);
                          }}
                        >
                          Refrigerated
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            containerTypeFilter === "open top"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setContainerTypeFilter("open top");
                            setShowTypeDropdown(false);
                          }}
                        >
                          Open Top
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            containerTypeFilter === "flat rack"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setContainerTypeFilter("flat rack");
                            setShowTypeDropdown(false);
                          }}
                        >
                          Flat Rack
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            containerTypeFilter === "tank"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setContainerTypeFilter("tank");
                            setShowTypeDropdown(false);
                          }}
                        >
                          Tank
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Container Size</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {sizeFilter === "all" ? "All Sizes" : sizeFilter}
                    </span>
                    <i
                      className={`fas ${
                        showSizeDropdown ? "fa-chevron-up" : "fa-chevron-down"
                      }`}
                    ></i>
                  </button>
                  {showSizeDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <ul>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            sizeFilter === "all"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setSizeFilter("all");
                            setShowSizeDropdown(false);
                          }}
                        >
                          All Sizes
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            sizeFilter === "20ft"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setSizeFilter("20ft");
                            setShowSizeDropdown(false);
                          }}
                        >
                          20ft
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            sizeFilter === "40ft"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setSizeFilter("40ft");
                            setShowSizeDropdown(false);
                          }}
                        >
                          40ft
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            sizeFilter === "45ft"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setSizeFilter("45ft");
                            setShowSizeDropdown(false);
                          }}
                        >
                          45ft
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Condition Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Condition</h3>
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowConditionDropdown(!showConditionDropdown)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {conditionFilter === "all"
                        ? "All Conditions"
                        : conditionFilter}
                    </span>
                    <i
                      className={`fas ${
                        showConditionDropdown
                          ? "fa-chevron-up"
                          : "fa-chevron-down"
                      }`}
                    ></i>
                  </button>
                  {showConditionDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <ul>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            conditionFilter === "all"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setConditionFilter("all");
                            setShowConditionDropdown(false);
                          }}
                        >
                          All Conditions
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            conditionFilter === "New"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setConditionFilter("New");
                            setShowConditionDropdown(false);
                          }}
                        >
                          New
                        </li>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            conditionFilter === "Used"
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setConditionFilter("Used");
                            setShowConditionDropdown(false);
                          }}
                        >
                          Used
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Availability Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Product Listing */}
          <div className="lg:w-3/4">
            {/* Sort and Results Count */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-medium">
                    {filteredContainers.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="px-4 py-2 border border-gray-300 rounded-lg flex items-center !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <span className="mr-2">Sort By</span>
                  <span className="font-medium">
                    {sortOption === "default" && "Default"}
                    {sortOption === "price-asc" && "Price: Low to High"}
                    {sortOption === "price-desc" && "Price: High to Low"}
                    {sortOption === "newest" && "Newest First"}
                  </span>
                  <i
                    className={`fas ${
                      showSortDropdown ? "fa-chevron-up" : "fa-chevron-down"
                    } ml-2`}
                  ></i>
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul>
                      <li
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          sortOption === "default"
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                        onClick={() => {
                          setSortOption("default");
                          setShowSortDropdown(false);
                        }}
                      >
                        Default
                      </li>
                      <li
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          sortOption === "price-asc"
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                        onClick={() => {
                          setSortOption("price-asc");
                          setShowSortDropdown(false);
                        }}
                      >
                        Price: Low to High
                      </li>
                      <li
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          sortOption === "price-desc"
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                        onClick={() => {
                          setSortOption("price-desc");
                          setShowSortDropdown(false);
                        }}
                      >
                        Price: High to Low
                      </li>
                      <li
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          sortOption === "newest"
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                        onClick={() => {
                          setSortOption("newest");
                          setShowSortDropdown(false);
                        }}
                      >
                        Newest First
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* Product Grid */}
            {filteredContainers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContainers.map((container) => (
                  <div
                    key={container.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={container.image}
                        alt={container.type}
                        className="w-full h-full object-cover object-top transition-transform hover:scale-105"
                      />
                      {/* Availability Badge */}
                      <div
                        className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                          container.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {container.inStock ? "In Stock" : "Pre order"}
                      </div>
                      {/* Quick View Button */}
                      <button
                        onClick={() => openQuickView(container.id)}
                        className="absolute bottom-3 right-3 bg-white bg-opacity-90 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all cursor-pointer"
                      >
                        <i className="fas fa-eye text-gray-700"></i>
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {container.type}
                        </h3>
                        <span className="text-blue-600 font-bold">
                          {container.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {container.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <div className="mr-4 flex items-center">
                          <i className="fas fa-ruler-combined mr-1"></i>
                          <span>{container.size}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-tag mr-1"></i>
                          <span>{container.condition}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600"
                            checked={compareItems.includes(container.id)}
                            onChange={() => toggleCompare(container.id)}
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            Compare
                          </span>
                        </label>
                      </div>
                      <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                        onClick={() => handleAddToQuote(container.id)}
                      >
                        Add to Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-5xl text-gray-300 mb-4">
                  <i className="fas fa-search"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No containers found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      <div
        className={`fixed bottom-5 right-5 bg-white rounded-lg shadow-lg p-4 flex items-center transition-all duration-300 transform ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } z-50`}
      >
        <div className="bg-green-100 text-green-800 rounded-full p-2 mr-3">
          <i className="fas fa-check"></i>
        </div>
        <div>
          <p className="font-medium">Container added to quote</p>
        </div>
        <button
          onClick={() => setShowToast(false)}
          className="ml-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      {/* Comparison Floating Bar */}
      {showCompareBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-30">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4">
                  <span className="font-medium">Compare</span>
                  <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
                    {compareItems.length}
                  </span>
                </div>
                <div className="flex space-x-4">
                  {compareItems.map((itemId) => {
                    const container = getContainerById(itemId);
                    return container ? (
                      <div key={itemId} className="relative">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={container.image}
                            alt={container.type}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <button
                          onClick={() => toggleCompare(itemId)}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm cursor-pointer"
                        >
                          <i className="fas fa-times text-xs text-gray-500"></i>
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={clearCompare}
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Clear All
                </button>
             
                {/* Compare Selected Button */}
                <Link
                  to={{
                    pathname: "/compare",
                  }}
                  state={{
                    compareItems: compareItems.map((id) => getContainerById(id)),
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer inline-block"
                >
                  Compare Items
                </Link>
           
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick View Modal */}
      {quickViewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {getContainerById(quickViewItem)?.type}
              </h2>
              <button
                onClick={closeQuickView}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Product Images */}
                <div className="md:w-1/2">
                  <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <img
                      src={getContainerById(quickViewItem)?.image}
                      alt={getContainerById(quickViewItem)?.type}
                      className="w-full h-64 object-cover object-top"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {getContainerById(quickViewItem)?.additionalImages}
                  </div>
                </div>
                {/* Product Details */}
                <div className="md:w-1/2">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                          getContainerById(quickViewItem)?.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {getContainerById(quickViewItem)?.inStock
                          ? "In Stock"
                          : "Pre order"}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {getContainerById(quickViewItem)?.price}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={compareItems.includes(quickViewItem)}
                          onChange={() => toggleCompare(quickViewItem)}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          Add to Compare
                        </span>
                      </label>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {getContainerById(quickViewItem)?.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Specifications
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            External Dimensions
                          </p>
                          <p className="font-medium">
                            {getContainerById(quickViewItem)?.external}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Internal Dimensions
                          </p>
                          <p className="font-medium">
                            {getContainerById(quickViewItem)?.internal}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Door Opening</p>
                          <p className="font-medium">
                            {getContainerById(quickViewItem)?.doorOpening}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Max Payload</p>
                          <p className="font-medium">
                            {getContainerById(quickViewItem)?.maxPayload}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Cubic Capacity
                          </p>
                          <p className="font-medium">
                            {getContainerById(quickViewItem)?.cubicCapacity}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tare Weight</p>
                          <p className="font-medium">
                            {getContainerById(quickViewItem)?.tare}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Features</h4>
                    <ul className="list-disc pl-5 text-gray-600">
                      {getContainerById(quickViewItem)?.features1},
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Delivery Options
                    </h4>
                    <ul className="space-y-2">
                      {getContainerById(quickViewItem)?.deliveryOptions?.map(
                        (option, index) => (
                          <li key={index} className="flex items-center">
                            <i className="fas fa-truck text-blue-600 mr-2"></i>
                            <span>{option}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                    disabled={!getContainerById(quickViewItem)?.inStock}
                    onClick={() => {
                      addToQuote(quickViewItem);
                      closeQuickView();
                    }}
                  >
                    Add to Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Product;
