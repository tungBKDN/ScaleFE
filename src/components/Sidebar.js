import React from 'react';
import { useState, useEffect } from "react";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ScaleIcon from '@mui/icons-material/Scale';
import CategoryIcon from '@mui/icons-material/Category';

const IndexComponent = ({ url, name, icon, activeURL }) => {
    const isActive = window.location.pathname == url ? " current-tab" : "";
    return (
        <li className="nav-item px-0 m-1">
            <a href={url} className={"nav-link px-0 d-flex align-items-center" +  isActive}>
                {icon}
                <span className="ms-1 d-none d-sm-inline">{name}</span>
            </a>
        </li>
    )
}

const SideBar = ({ current }) => {
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <IndexComponent url="/" name="Trang chủ" icon={<SpaceDashboardIcon />}/>
                    <IndexComponent url="/bills" name="Hóa đơn" icon={<ReceiptIcon />} />
                    <IndexComponent url="/live-scale" name="Cân trực tiếp" icon={<ScaleIcon />} />
                    <IndexComponent url="/fruits" name="Danh mục trái cây" icon={<CategoryIcon />} />
                </ul>
                <div>
                    <div className="dropdown pb-4">
                        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                            <span className="d-none d-sm-inline mx-1">loser</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;