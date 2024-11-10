import React, {useState, useEffect} from "react";
import urls from "../URLs/urls";
import FruitTable from "../components/FruitTable";

const Fruits = () => {
    const [fruits, setFruits] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(urls.server + urls.getProducts.path, {
                method: urls.getProducts.method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFruits(data["products"]);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="mb-4">Danh sách trái cây</h1>
            <FruitTable productArr={fruits} />
        </div>
    )
}

export default Fruits;