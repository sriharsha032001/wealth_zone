import React, { useState } from "react";
import AddTransactionForm from "./components/AddTransactionForm";
import DailyReport from "./components/Dailyreport";
import { Toaster } from "react-hot-toast";

<Toaster position="top-right" reverseOrder={false} />


const App = () => {
  const [reload, setReload] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <AddTransactionForm onAdd={() => setReload(!reload)} />
        <DailyReport reload={reload} />
      </div>
    </div>
  );
};

export default App;
