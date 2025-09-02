import { createContext, useContext, useEffect, useState } from "react";

const BillsContext = createContext();

export function BillsProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [roommates, setRoommates] = useState([]);

  // Load initial data from db.json
  useEffect(() => {
    fetch("http://localhost:3000/expenses")
      .then((res) => res.json())
      .then(setExpenses);

    fetch("http://localhost:3000/roommates")
      .then((res) => res.json())
      .then(setRoommates);
  }, []);

  // Function to add expense
  function addExpense(expense) {
    // 1. Update local state immediately
    setExpenses((prev) => [...prev, expense]);

    // 2. Save to json-server
    fetch("http://localhost:3000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
  }

  return (
    <BillsContext.Provider value={{ roommates, expenses, addExpense }}>
      {children}
    </BillsContext.Provider>
  );
}

export function useBills() {
  return useContext(BillsContext);
}
