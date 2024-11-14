import React, { useEffect, useState, useRef } from "react";
import { ResultFormat, TimeFormat, TextCapitalize } from "../assets/scripts/ResultFormat";
import TableOfReceipts from "../components/TableOfReceipts";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import urls from "../URLs/urls";
import { parse } from "url";

const LiveScale = () => {
    const STATES = ['KHÔNG ĐƯỢC KẾT NỐI', 'ĐÃ KẾT NỐI', 'ĐANG KẾT NỐI', 'ĐÃ KẾT NỐI, DỮ LIỆU SAI!'];
    const [weight, setWeight] = useState(0.00);
    const [state, setState] = useState(0);
    const [time, setTime] = useState(new Date());
    const [ws, setWs] = useState(null);
    const [receipt, setReceipt] = useState([]); // this is a Stack of raw receipts receives from server
    const [groupedReceipt, setGroupedReceipt] = useState({}); // this is a Stack of grouped receipts
    const [fruits, setFruits] = useState([]); // this is a list of fruits, this list will be used for referencing the price of each fruit
    const [totalPrice, setTotalPrice] = useState(0);
    const [receiptID, setReceiptID] = useState("N/A");
    const [prevWeight, setPrevWeight] = useState(0.00);
    const [weightChanges, setWeightChanges] = useState(0);
    const [isSend, setIsSend] = useState(true);

    const [buffer, setBuffer] = useState([]);
    const bufferRef = useRef(buffer);
    const [timeoutId, setTimeoutId] = useState(null);

    const HIGH_THRESHOLD = 0.05;
    const LOW_THRESHOLD = 0.015;
    const FLOOR = 0.025;
    const TIMEOUT = 1500;

    // Post the item to the server
    const postItem = async (weight, receiptID) => {
        try {
            const response = await fetch(urls.server + urls.postReceipts.path, {
                method: urls.postReceipts.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(receiptID && receiptID !== "N/A" ? { "weight": parseFloat(weight), "receipt_id": receiptID } : { "weight": parseFloat(weight) }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setReceiptID(data["receipt"]["receipt_id"]);
            addReceipt(data["receipt"]);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return "N/A";
        }
    }

    // Weight changes, there must be anything on the scale. Post the item to the server
    useEffect(() => {
        if ((isSend == true && parseFloat(weightChanges) > 0) && (Math.abs(weight - prevWeight) < HIGH_THRESHOLD) && (Math.abs(weight - prevWeight) > LOW_THRESHOLD) && parseFloat(weight) > 0.01 && parseFloat(prevWeight) > 0.01) {
            console.log("Buffering item: ", weight, receiptID);
            setBuffer({ weight, receiptID });
            bufferRef.current = { weight, receiptID };

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const newTimeoutId = setTimeout(() => {
                console.log("Post item: ", bufferRef.current.weight, bufferRef.current.receiptID);
                postItem(bufferRef.current.weight, bufferRef.current.receiptID);
                setIsSend(false);
                setBuffer(null);
                bufferRef.current = null;
            }, TIMEOUT);

            setTimeoutId(newTimeoutId);
        }
        if (weight <= FLOOR) {
            setIsSend(true);
        }
        // console.log("Conditions");
        // console.log(parseFloat(weightChanges) > 0, parseFloat(weightChanges));
        // console.log(Math.abs(weight - prevWeight) < HIGH_THRESHOLD, Math.abs(weight - prevWeight));
        // console.log(parseFloat(weight) > 0.01, parseFloat(weight));
        // console.log(parseFloat(prevWeight) > 0.01, parseFloat(prevWeight));
        setPrevWeight(parseFloat(parseFloat(weight).toFixed(2)));
        setWeightChanges(parseFloat((weight - prevWeight).toFixed(2)));
    }, [weight]);

    const fetchFruits = async () => {
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
        fetchFruits();
    }, []);

    // Example of raw receipts
    // useEffect(() => {
    //     const temp = [
    //         {
    //             "time": "2024-11-09 08:58:59",
    //             "receipt_id": "12345",
    //             "product": "Apple",
    //             "weight": 2.5,
    //             "total_price": 55
    //         },
    //         {
    //             "time": "2024-11-09 09:01:00",
    //             "receipt_id": "12345",
    //             "product": "Banana",
    //             "weight": 3.0,
    //             "total_price": 60
    //         },
    //         {
    //             "time": "2024-11-09 09:02:12",
    //             "receipt_id": "12345",
    //             "product": "Apple",
    //             "weight": 3,
    //             "total_price": 66
    //         },
    //     ];
    //     setReceipt(temp);
    // }, []);

    const addReceipt = (receiptJSON) => {
        setReceipt(prevReceipt => {
            let _receipt = [...prevReceipt];
            // Add time to receipt
            let time = new Date().toISOString().slice(0, 19).replace('T', ' ');
            receiptJSON['time'] = time;
            console.log("addReceipt/ Receipt 1: ", _receipt);
            _receipt.push(receiptJSON);
            console.log("addReceipt/ Receipt 2: ", _receipt);
            return _receipt;
        });
    }

    const generateGroupReceipts = () => {
        // Group receipts by names
        let _groupedReceipt = {}; // Eg: {Apple: {time: "", weight: 5.5, total_price: 121}, Banana: {time: "", weight: 3, total_price: 60}}
        receipt.forEach(r => {
            // If the product is not in the groupedreceipt without caring the cases, add it; otherwise, update the weight and total_price by sum
            let name = r.product.toUpperCase();
            if (name in _groupedReceipt) {
                _groupedReceipt[TextCapitalize(name)].weight += r.weight;
                _groupedReceipt[TextCapitalize(name)].total_price += r.total_price;
            } else {
                _groupedReceipt[TextCapitalize(name)] = {
                    time: r.time,
                    weight: r.weight,
                    total_price: r.total_price
                };
            }
        })
        console.log("Receipt: ", receipt);
        console.log("Grouped Receipts: ", _groupedReceipt);
        setGroupedReceipt(_groupedReceipt);
    }

    // Update groupedreceipt when receipt is updated
    useEffect(() => {
        generateGroupReceipts();
    }, [receipt]);

    // Update total_prices when groupedreceipt is updated
    useEffect(() => {
        setTotalPrice(calculateTotal());
    }, [groupedReceipt]);

    // Reset the receipt
    const resetReceipt = () => {
        // Confirm before reset
        if (window.confirm('Bạn có chắc chắn muốn hủy hóa đơn này?')) {
            setReceipt([]);
            setReceiptID("N/A");
        }
    }

    // Get the total price of the receipt, maximum total_price
    const calculateTotal = () => {
        let totalPrices = [];
        receipt.forEach(r => {
            totalPrices.push(r.total_price);
        });
        let total = Math.max(...totalPrices);
        return total < 0 ? 0 : total;
    }

    // Connect to the WebSocket server
    useEffect(() => {
        const socket = new WebSocket('ws://192.168.1.12:8001/ws');
        setWs(socket);
        setState(2);

        socket.onopen = () => {
            console.log('Connected');
            setState(1);
        }

        socket.onmessage = (event) => {
            // console.log('Message from server:', event.data);
            let _json = JSON.parse(event.data);
            setTime(new Date());
            setState(1);
            setWeight(parseFloat(Math.abs(_json.data).toFixed(2)));
        };

        socket.onclose = () => {
            console.log('Disconnected');
            setState(0);
        }

        return () => {
            socket.close();
        };
    }, []);

    // Finish the receipt
    const finishReceipt = () => {
        // Confirm before finish
        if (window.confirm('Bạn có chắc chắn muốn hoàn thành hóa đơn này?')) {
            // Post the receipt to the server
            // postItem(totalPrice, receiptID);
            // Reset the receipt
            setReceipt([]);
            setReceiptID("N/A");
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="container mt-5 flex-grow-1">
                <div className="text-center mb-4">
                    {state === 0 && <span className="badge bg-danger">{STATES[state]}</span>}
                    {state === 1 && <span className="badge bg-success">{STATES[state]}</span>}
                    {state === 2 && <span className="badge bg-info">{STATES[state]}</span>}
                    {state === 3 && <span className="badge bg-warning">{STATES[state]}</span>}
                </div>
                <h1 className="text-center mb-3">Giá trị đo trực tiếp trên bàn cân</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title">Đo lúc:</h5>
                                <h6 className="card-title" style={{ fontFamily: 'monospace' }}>{TimeFormat(time)}</h6>
                                <p className="card-text display-4" style={{ fontFamily: 'monospace' }}>{ResultFormat(weight)} kg</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table of receipt */}
                <div className="d-flex justify-content-between align-items-center mt-5">
                    <div>
                        <h3 className="text-left m-0">Danh sách hàng hóa</h3>
                        <p className="text-left m-0">Mã hóa đơn: <strong>{receiptID}</strong></p>
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-danger me-3 d-flex align-items-center shadow-sm" onClick={resetReceipt}>
                            <DeleteForeverIcon className="me-1" />Hủy hóa đơn này
                        </button>
                        <button className="btn btn-primary d-flex align-items-center shadow-sm" onClick={finishReceipt}>
                            <AssignmentTurnedInIcon className="me-1" />Hoàn thành hóa đơn
                        </button>
                    </div>
                </div>
                <div className="align-items-center mt-3">
                    <TableOfReceipts receipt={groupedReceipt} referencing={fruits} total={totalPrice} />
                </div>
            </div>
        </div>
    );
}

export default LiveScale;