import Head from 'next/head';
import React from 'react';
import { FrameWindows } from "./frame"

export const Layout = ({ children }) => {

    return <div>

        <FrameWindows></FrameWindows>
        {children}
    </div>

}