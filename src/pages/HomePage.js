import React, { useState, useEffect } from "react";
import { PriceFormat } from "../assets/scripts/ResultFormat";
import Card from "../components/Card";

const HomePage = () => {
    const [totalIncome, setTotalIncome] = useState("N/A");
    const [totalReceipts, setTotalReceipts] = useState("N/A");
    const [totalFruits, setTotalFruits] = useState("N/A");

    const [lastUpdate, setLastUpdate] = useState("N/A");
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <Card
                        title="Tổng giá trị hóa đơn"
                        description="Tổng giá trị các hóa đơn đã xuất"
                        value={PriceFormat(totalIncome, "VND")}
                        footer={"Cập nhật lần cuối: " + lastUpdate.toLocaleString()}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <Card
                        title="Số lượng hóa đơn"
                        description="Tổng số hóa đơn đã xuất"
                        value={totalReceipts}
                        footer={"Cập nhật lần cuối: " + lastUpdate.toLocaleString()}
                    />
                </div>
                <div className="col-md-6">
                    <Card
                        title="Số lượng trái cây"
                        description="Tổng số các loại trái cây"
                        value={totalFruits}
                        footer={"Cập nhật lần cuối: " + lastUpdate.toLocaleString()}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage;