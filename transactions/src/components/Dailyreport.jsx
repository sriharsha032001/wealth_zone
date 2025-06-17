import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8080/api/expenses/date/";
const COLORS = ["#FF6384", "#36A2EB"];

const DailyReport = ({ reload }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch(`${API_URL}${today}`)
      .then((res) => res.json())
      .then(setTransactions)
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, [reload, today]);

  const totalCredit = transactions.filter((t) => t.type === "Credit").reduce((sum, tx) => sum + tx.amount, 0);
  const totalDebit = transactions.filter((t) => t.type === "Debit").reduce((sum, tx) => sum + tx.amount, 0);

  const pieData = [
    { name: "Debit", value: totalDebit },
    { name: "Credit", value: totalCredit },
  ];

  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened 🖨️");
  };

  const handlePDF = () => {
    if (!transactions.length) {
      toast.error("No transactions to generate PDF");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text(`Transactions Report - ${today}`, 14, 16);
      doc.autoTable({
        startY: 24,
        head: [["Description", "Type", "Amount", "Date", "Category", "Source"]],
        body: transactions.map((tx) => [
          tx.description || "-",
          tx.type || "-",
          `₹${tx.amount}`,
          tx.date || "-",
          tx.category || "-",
          tx.source || "-",
        ]),
      });
      doc.save(`transactions-${today}.pdf`);
      toast.success("PDF downloaded successfully ✅");
    } catch (err) {
      toast.error("Error generating PDF ❌");
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-[#0f0f0f] text-white px-4 py-6">
      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md w-full">
        <h2 className="text-xl font-bold mb-4">Today's Report - {today}</h2>

        {loading ? (
          <p>Loading...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found for today.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm mb-6">
                <thead className="bg-[#2f2f2f] text-gray-300">
                  <tr>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <tr key={i} className="border-t border-gray-700 hover:bg-[#242424] transition">
                      <td className="px-4 py-2">{t.description}</td>
                      <td className={`px-4 py-2 ${t.type === "Credit" ? "text-green-400" : "text-red-400"}`}>{t.type}</td>
                      <td className="px-4 py-2 text-right">₹{t.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full bg-[#121212] p-6 rounded-xl">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-wrap justify-end gap-4 mt-6">
                <button onClick={handlePrint} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold">
                  Print
                </button>
                <button onClick={handlePDF} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold">
                  Generate PDF
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyReport;
