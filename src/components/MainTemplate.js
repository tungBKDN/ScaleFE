import React from 'react';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from "react";
import SideBar from './Sidebar';

function MainTemplate({current}) {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SideBar current={current} />
                <div className="col p-4">
                    {/* Children lies here */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainTemplate;