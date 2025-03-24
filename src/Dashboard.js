import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [totalSavings, setTotalSavings] = useState(500000); // Default savings in INR
    const [totalExpenses, setTotalExpenses] = useState(0); // Default expenses in INR

    const addExpense = () => {
        if (amount) {
            const newExpense = { id: Date.now(), amount: parseFloat(amount), category };
            setExpenses([...expenses, newExpense]);
            setTotalExpenses(totalExpenses + newExpense.amount);
            setTotalSavings(totalSavings - newExpense.amount);
            setAmount('');
        }
    };

    const deleteExpense = (id) => {
        const expenseToDelete = expenses.find(expense => expense.id === id);
        if (expenseToDelete) {
            setExpenses(expenses.filter(expense => expense.id !== id));
            setTotalExpenses(totalExpenses - expenseToDelete.amount);
            setTotalSavings(totalSavings + expenseToDelete.amount);
        }
    };

    const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF4560'];
    const expenseData = expenses.reduce((acc, expense) => {
        const existingCategory = acc.find(e => e.name === expense.category);
        if (existingCategory) {
            existingCategory.value += expense.amount;
        } else {
            acc.push({ name: expense.category, value: expense.amount });
        }
        return acc;
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="bg-green-700 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">FinPulse Dashboard</h1>
                <button 
                    onClick={() => navigate("/")}
                    className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </nav>

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Welcome, Samyak & Ayushi !</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-green-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Total Savings</h3>
                        <p className="text-2xl font-bold text-green-400">
                            ₹{totalSavings.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-green-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Monthly Expenses</h3>
                        <p className="text-2xl font-bold text-red-400">
                            ₹{totalExpenses.toLocaleString()}
                        </p>
                    </div>
                </div>
                
                {/* Pie Chart Section */}
                <div className="mt-6 bg-green-900 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>
                    {expenseData.length > 0 ? (
                        <PieChart width={400} height={300}>
                            <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    ) : (
                        <p className="text-gray-300">No expenses to display.</p>
                    )}
                </div>
                
                {/* Expense Section */}
                <div className="mt-6 bg-green-900 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            placeholder="Amount in INR"
                            className="p-2 border rounded w-full text-black"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <select
                            className="p-2 border rounded text-black"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Food</option>
                            <option>Transport</option>
                            <option>Grocery</option>
                            <option>Personal</option>
                            <option>Others</option>
                        </select>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={addExpense}
                        >
                            Add
                        </button>
                    </div>
                </div>
                
                {/* Expense List */}
                <div className="mt-6 bg-green-900 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Expense List</h3>
                    {expenses.length === 0 ? (
                        <p className="text-gray-300">No expenses added yet.</p>
                    ) : (
                        <ul>
                            {expenses.map(expense => (
                                <li key={expense.id} className="flex justify-between border-b py-2">
                                    <span>{expense.category}: ₹{expense.amount.toLocaleString()}</span>
                                    <button
                                        className="text-red-400 hover:text-red-600"
                                        onClick={() => deleteExpense(expense.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
