import React, {useEffect, useState} from "react";
import {PriceFormat} from "../assets/scripts/ResultFormat";

const TableItem = ({time, product, weight, price}) => {
    return (
        <tr>
            <td>{time}</td>
            <td>{product}</td>
            <td className="text-end">{PriceFormat(weight, "g")}</td>
            <td className="text-end">{PriceFormat(price, "VND/g")}</td>
            <td className="text-end">{PriceFormat(price * weight, "VND")}</td>
        </tr>
    )
}

export default TableItem;