import React, { useState, useEffect } from "react";
import { PriceFormat } from "../assets/scripts/ResultFormat";

const Card = ({title, description, value, footer}) => {
    return (
        <div className="row justify-content-center">
            <div className="">
                <div className="card text-center">
                    <div className="card-header bg-primary text-white">
                        {title}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{description}</h5>
                        <p className="card-text display-4">{value}</p>
                    </div>
                    <div className="card-footer text-muted">
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;