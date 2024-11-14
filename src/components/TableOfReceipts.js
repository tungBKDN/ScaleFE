import React, { useEffect, useState } from "react";
import { PriceFormat } from "../assets/scripts/ResultFormat";
import TableItem from "./TableItem";


const TableOfReceipts = ({ receipt, referencing, total }) => {
    /*
    receipt: Eg: {"Apple" : {"time": "2024-11-09 08:58:59", "receipt_id": "12345", "weight": 2.5, "total_price": 55}, ...}
    referencing: Eg: {{
                    "product_id": "c3273eff-5a05-4514-9681-d5cda01d3bb4",
                    "product_name": "apple",
                    "price": 22,
                    "description": ""
                    }, ...}
    */

    // Get the price of a product by its name
    const getPriceByName = (name) => {
        let price = 0;
        Object.keys(referencing).forEach((key) => {
            if (referencing[key].product_name.toUpperCase() === name.toUpperCase()) {
                price = referencing[key].price;
            }
        })
        return price;
    }

    return (
        <div>
            <table className="table table-striped table-hover table-bordered rounded">
                <thead>
                    <tr>
                        <th>Thời gian</th>
                        <th>Tên loại hoa quả</th>
                        <th className="text-end">Khối lượng (kg)</th>
                        <th className="text-end">Đơn giá (VND/kg)</th>
                        <th className="text-end">Thành tiền (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(receipt).map((key, index) => {
                            return (
                                <TableItem key={index} time={receipt[key].time} product={key} weight={receipt[key].weight} price={getPriceByName(key)} />
                            )
                        })
                    }
                    <tr>
                        <td colSpan="4" className="text-end"><strong>Thành tiền</strong></td>
                        <td className="text-end"><strong>{PriceFormat(total, "VND")}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableOfReceipts;