import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import KPICards from "../components/KPICards";
import OrdersTable from "../components/OrdersTable";
import AISummaryCard from "../components/AISummaryCard";
import { customerApi } from "../services/customerApi";
import AllCustomers from "../pages/AllCustomers";

export default function Dashboard() {
  const [customer, setCustomer] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (customerId) => {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const data = await customerApi.getCustomerDetails(customerId);
      setCustomer(data);
      fetchSummary(customerId);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch customer details. Please check the customer ID and try again.",
      );
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSummary = async (customerId) => {
    setSummaryLoading(true);
    try {
      const data = await customerApi.getCustomerSummary(customerId);
      setSummary(data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-primary-dark to-accent text-white py-12 px-4 sm:px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Customer Data Consolidation Dashboard
              </h1>
              <p className="text-white/80 mt-2">Unified Customer View</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Search Section */}
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          error={error}
        />

        {!customer ? (
  <>
    

    {/* All Customers Table */}
    <AllCustomers />
  </>
) : (
          <>
            {/* Profile Card */}
            <ProfileCard customer={customer} />

            {/* KPI Cards */}
            <KPICards customer={customer} />

            {/* Orders Section */}
            <OrdersTable orders={customer.orders} customer={customer} />

            {/* AI Summary */}
            <AISummaryCard summary={summary} isLoading={summaryLoading} />

            {/* Preferences Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Membership Tier
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {customer.membership}
                </p>
                <p className="text-text-muted text-sm mt-2">
                  Premium customer benefits active
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Preferred Communication
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {customer.preferredChannel}
                </p>
                <p className="text-text-muted text-sm mt-2">
                  Primary contact method
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-text-muted">
          <p>
            &copy; 2024 Customer Data Consolidation Dashboard. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
