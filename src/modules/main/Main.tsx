import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import styles from './main.module.scss';
import Header from "./components/header/Header";

const Main = () => {


    return (
        <React.Fragment>
            <Header />
            <div className={styles.main}>
                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default Main;