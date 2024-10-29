import React, {useEffect, useState} from "react";
import {ResultFormat, TimeFormat} from "../assets/scripts/ResultFormat";

const LiveScale = () => {
    const STATES = ['DISCONNECTED', 'CONNECTED', 'CONNECTING'];
    const [weight, setWeight] = useState(0.00);
    const [state, setState] = useState(0);
    const [time, setTime] = useState(new Date());
    const [ws, setWs] = useState(null);


    useEffect(() => {
        const socket = new WebSocket('ws://192.168.1.9:8001/ws');
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
            setWeight(_json.data);
        };

        socket.onclose = () => {
            console.log('Disconnected');
            setState(0);
        }

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">LiveScale</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mt-5 flex-grow-1">
                <h1 className="text-center">Giá trị đo trực tiếp trên bàn cân + {STATES[state]}</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <h5 className="card-title">Đo lúc: </h5><h6 className="card-title" style={{ fontFamily: 'monospace' }}>{TimeFormat(time)}</h6>
                                <p className="card-text display-4" style={{ fontFamily: 'monospace' }}>{ResultFormat(weight)} kg</p>
                                <a href="#" className="btn btn-primary">Refresh</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer mt-auto py-3 bg-light">
                <div className="container">
                    <span className="text-muted">Place footer content here.</span>
                </div>
            </footer>
        </div>
    );
}

export default LiveScale;