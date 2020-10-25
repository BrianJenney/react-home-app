import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import './DashboardItem.style.css';

const DashboardItem = ({ order, title, children }) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="dashboard-item card p-3">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className="pr-4">{order}</h1>
                <span className="section-title">{title}</span>
                <span
                    className={
                        isOpen
                            ? 'fa fa-2x fa-angle-up pl-4'
                            : 'fa fa-2x fa-angle-down pl-4'
                    }
                    onClick={() => setOpen(!isOpen)}
                />
            </div>
            <Collapse isOpen={isOpen} style={{ marginLeft: '5%' }}>
                <p className="todo-header">Things left to do...</p>
                {children}
            </Collapse>
        </div>
    );
};

export default DashboardItem;
