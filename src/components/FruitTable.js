import React, {useState, useEffect} from "react";
import { PriceFormat, NameTranslating } from "../assets/scripts/ResultFormat";

const FruitTableItem = ({ fruit }) => {
    // Fruit {product_id, product_name, price, description}
    return (
        <tr>
            <th scope="row">{fruit.product_id}</th>
            <td>{NameTranslating(fruit.product_name)}</td>
            <td>{fruit.description}</td>
            <td className="text-end">{PriceFormat(fruit.price, "VND/g")}</td>
        </tr>
    )
}

const FruitTable = ({productArr}) => {
    return (
        <table className="table table-striped table-hover rounded border">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên trái cây</th>
                    <th scope="col">Mô tả</th>
                    <th className="text-end" scope="col">Giá</th>
                </tr>
            </thead>
            <tbody>
                {productArr.map((fruit, index) => (
                    <FruitTableItem key={index} fruit={fruit} />
                ))}
            </tbody>
        </table>
    )
}

export default FruitTable;