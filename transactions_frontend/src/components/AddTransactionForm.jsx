import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8080/api/expenses";

const AddTransactionForm = ({ setReload }) => {
  const [form, setForm] = useState({
    userId: "",
    description: "",
    type: "Debit",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    source: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [showUserTransactions, setShowUserTransactions] = useState(false);

  useEffect(() => {
    if (searchUserId && showUserTransactions) {
      fetch(`${API_URL}/all`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((tx) => tx.userId === searchUserId);
          setTransactions(filtered);
        });
    } else {
      setTransactions([]);
    }
  }, [searchUserId, showUserTransactions]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");

      await res.json();
      toast.success("Transaction added successfully ✅");

      setForm({ ...form, description: "", amount: "", category: "", source: "" });

      setReload((prev) => !prev);
    } catch (error) {
      toast.error("Failed to add transaction ❌");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white px-4 py-6 md:px-8">
      <nav className="bg-[#1a1a1a] p-5 mb-6 rounded-xl shadow-md text-center w-full">
        <h1 className="text-3xl font-bold tracking-wide">Wealth Zone Bank</h1>
      </nav>

      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg mb-8 w-full max-w-full">
        <h2 className="text-xl font-bold mb-5">Add Transaction</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <input name="userId" placeholder="Enter User ID" required value={form.userId} onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="description" placeholder="Enter Description" required value={form.description} onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select name="type" value={form.type} onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
          <input name="amount" type="number" placeholder="Amount (₹)" required value={form.amount} onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="date" type="date" value={form.date} onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="category" placeholder="E.g. Food, Travel" value={form.category} onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="source" placeholder="E.g. UPI, HDFC" value={form.source} onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2 lg:col-span-3" />
        </div>
        <div className="text-right mt-6">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">
            Add Transaction
          </button>
        </div>
      </form>

      <div className="w-full mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search by User ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[250px]"
          />
          <button
            onClick={() => setShowUserTransactions(true)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {showUserTransactions && transactions.length > 0 && (
        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg w-full overflow-x-auto">
          <h3 className="text-lg font-bold mb-4">Transactions for User ID: {searchUserId}</h3>
          <table className="w-full text-left text-sm">
            <thead className="bg-[#2f2f2f] text-gray-300">
              <tr>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2 text-right">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-t border-gray-700 hover:bg-[#242424] transition">
                  <td className="px-4 py-2">{tx.description}</td>
                  <td className="px-4 py-2">{tx.type}</td>
                  <td className="px-4 py-2 text-right">₹{tx.amount?.toLocaleString()}</td>
                  <td className="px-4 py-2">{tx.date}</td>
                  <td className="px-4 py-2">{tx.category}</td>
                  <td className="px-4 py-2">{tx.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddTransactionForm;