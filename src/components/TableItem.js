import React, {useEffect, useState} from "react";
import {ResultFormat, PriceFormat, TextCapitalize, NameTranslating} from "../assets/scripts/ResultFormat";

const TableItem = ({time, product, weight, price}) => {
    return (
        <tr>
            <td>{TextCapitalize(time)}</td>
            <td>{NameTranslating(product)}</td>
            <td className="text-end">{ResultFormat(weight)} kg</td>
            <td className="text-end">{PriceFormat(price, "VND/kg")}</td>
            <td className="text-end">{PriceFormat(price * weight, "VND")}</td>
        </tr>
    )
}

export default TableItem;