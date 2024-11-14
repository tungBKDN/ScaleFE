import React, { useState, useEffect } from "react";
import urls from "../URLs/urls";
import { PriceFormat } from "../assets/scripts/ResultFormat"

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [billsArr, setBillsArr] = useState([]);
    const [totalBills, setTotalBills] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [activeTab, setActiveTab] = useState("bills");

    const satistics = (data) => {
        let totalBillCount = 0;
        let totalBillAmount = 0;
        let billsArr = []
        for (const key in data) {
            if (data[key].receipt) {
                totalBillCount++;
                totalBillAmount += data[key].receipt.total_price;
                billsArr.push(data[key]["receipt"]);
            }
        }
        return { totalBillCount, totalBillAmount, billsArr };
    }

    useEffect(() => {
        // Fetch bills data from an API or database
        const fetchBills = async () => {
            const data = await fetch(urls.server + urls.getBills.path, {
                method: urls.getBills.method
            }).then(response => response.json());
            const _json = JSON.stringify(data);
            setBills(_json);
            const { totalBillCount, totalBillAmount, billsArr } = satistics(data);
            setTotalBills(totalBillCount);
            setTotalAmount(PriceFormat(totalBillAmount, "VND"));
            setBillsArr(billsArr);
        };

        fetchBills();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Hóa đơn đã xuất</h1>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "bills" ? "active" : ""}`} onClick={() => setActiveTab("bills")}>
                        Danh sách
                    </a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "summary" ? "active" : ""}`} onClick={() => setActiveTab("summary")}>
                        Tổng quan
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === "bills" && (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>STT</th>
                                    <th>ID</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billsArr.map((bill, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{bill.receipt_id}</td>
                                        <td class="text-end">{PriceFormat(bill.total_price ,"VND")}</td>
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