// src/components/Layout.js

import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="dashboard">
            <div className="main-content">
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
