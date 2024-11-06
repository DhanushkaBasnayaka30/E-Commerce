import React, { useState } from "react";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";


const initialOrders = [
  { id: 1, name: "John Doe", mobile: "123-456-7890", location: "New York", status: "Pending", price: "$120.00" },
  { id: 2, name: "Jane Smith", mobile: "234-567-8901", location: "Los Angeles", status: "Pending", price: "$150.00" },
  { id: 3, name: "Alice Johnson", mobile: "345-678-9012", location: "Chicago", status: "Pending", price: "$200.00" },
  { id: 4, name: "Mike Brown", mobile: "456-789-0123", location: "Houston", status: "Pending", price: "$95.00" },
];

function Dashboard() {

  const [orders, setOrders] = useState(initialOrders);

  // Handler to change the status of an order
  const changeStatus = (id, newStatus) => {
      setOrders((prevOrders) =>
          prevOrders.map((order) =>
              order.id === id ? { ...order, status: newStatus } : order
          )
      );
  };
	return (
		<div className=" w-full h-full p-2 flex flex-col">
			<div className="w-full h-40 flex justify-center gap-x-12 mt-8  items-center">
				<div className="w-72 h-28 bg-white rounded-md shadow-md shadow-gray-400 items-center flex flex-col justify-center gap-y-2">
					<p className="text-gray-700 font-semibold text-lg">Today Orders</p>
					<p className="text-4xl text-gray-800 font-bold">10</p>
				</div>
				<div className="w-72 h-28 bg-white rounded-md shadow-md shadow-gray-400 items-center flex flex-col justify-center gap-y-2">
					<p className="text-gray-700 font-semibold text-lg">Weekly Orders</p>
					<p className="text-4xl text-gray-800 font-bold">10</p>
				</div>
				<div className="w-72 h-28 bg-white rounded-md shadow-md shadow-gray-400 items-center flex flex-col justify-center gap-y-2">
					<p className="text-gray-700 font-semibold text-lg">Monthly Orders</p>
					<p className="text-4xl text-gray-800 font-bold">10</p>
				</div>
				<div className="w-72 h-28 bg-white rounded-md shadow-md shadow-gray-400 items-center flex flex-col justify-center gap-y-2">
					<p className="text-red-700 font-semibold text-lg">Cancel Orders</p>
					<p className="text-4xl text-red-600 font-bold">10</p>
				</div>
			</div>

      <div className="w-[90%] mx-auto h-screen mt-12  top-40 flex items-center justify-center bg-red-400">
      <div className="w-full  bg-gray-100 min-h-screen flex flex-col items-start">
            <h1 className="text-2xl font-semibold mb-6 text-gray-700">Customer Orders</h1>
            <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-300 text-gray-900 text-left">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer Name</th>
                        <th className="p-4">Mobile Number</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Order Status</th>
                        <th className="p-4">Total Price</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-t hover:bg-gray-50">
                            <td className="p-4">{order.id}</td>
                            <td className="p-4">{order.name}</td>
                            <td className="p-4">{order.mobile}</td>
                            <td className="p-4">{order.location}</td>
                            <td className="p-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-white text-sm ${
                                        order.status === "Pending" ? "bg-yellow-500" : order.status === "Accepted" ? "bg-green-500" : "bg-red-500"
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-4">{order.price}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => changeStatus(order.id, "Accepted")}
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => changeStatus(order.id, "Cancelled")}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
		</div>
	);
}

export default Dashboard;
