// Dashboard.jsx
import React, { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";
import DailyReport from "./Dailyreport";

const Dashboard = () => {
  const [reload, setReload] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white px-4 py-6">
      <AddTransactionForm setReload={setReload} />
      <div className="mt-12">
        <DailyReport reload={reload} />
      </div>
    </div>
  );
};

export default Dashboard;