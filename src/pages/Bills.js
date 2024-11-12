import React, { useState, useEffect } from "react";

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [totalBills, setTotalBills] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [activeTab, setActiveTab] = useState("bills");

    useEffect(() => {
        // Fetch bills data from an API or database
        const fetchBills = async () => {
            // Example data for fruit bills
            const data = [
                { no: 1, recept_id: 'R001', total: 30 },
                { no: 2, recept_id: 'R002', total: 20 },
                { no: 3, recept_id: 'R003', total: 50 },
            ];
            setBills(data);
            setTotalBills(data.length);
            setTotalAmount(data.reduce((acc, bill) => acc + bill.total, 0));
        };

        fetchBills();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Fruit Bill Management</h1>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "bills" ? "active" : ""}`} onClick={() => setActiveTab("bills")}>
                        Bills
                    </a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "summary" ? "active" : ""}`} onClick={() => setActiveTab("summary")}>
                        Summary
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === "bills" && (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>No</th>
                                    <th>Recept ID</th>
                                    <th>Total (Money)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map(bill => (
                                    <tr key={bill.no}>
                                        <td>{bill.no}</td>
                                        <td>{bill.recept_id}</td>
                                        <td>{bill.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "summary" && (
                    <div>
                        <p>Total Bills: {totalBills}</p>
                        <p>Total Amount: ${totalAmount}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bills;