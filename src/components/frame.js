import Image from 'next/image';
import React, { useState } from 'react';
import iconClose from '../../public/images/icon/close.svg'
import iconfullscreen from '../../public/images/icon/fullscreen.svg'
import iconMinimize from '../../public/images/icon/minimize.svg'
import iconMinimize2 from '../../public/images/icon/minimize_.svg'
import iconLogo from '../../public/images/icon/logo_icon.svg'

export const FrameWindows = () => {

    const [isMaximized, setisMaximized] = useState(false);

    const minimize = () => {
        if (typeof window !== undefined) {
            // browser code
            let ele = window.require('electron')

            ele.ipcRenderer.invoke('minimize', {})
        }
    }

    const close = () => {
        if (typeof window !== undefined) {
            // browser code
            let ele = window.require('electron')

            ele.ipcRenderer.invoke('close', {})
        }
    }

    const fullscreen = () => {
        if (typeof window !== undefined) {
            // browser code
            let ele = window.require('electron')

            ele.ipcRenderer.invoke('fullscreen', {})
            setisMaximized(!isMaximized)
        }
    }

    return (<div className="fixed w-full left-0 z-50 top-0 px-4 bg-[#DFDFDF] dark:bg-frame flex items-center justify-end">
        <div className="flex flex-1 frame  w-full justify-center left-0 z-0">
            <Image src={iconLogo}></Image>
        </div>
        <div className="flex gap-4 relative z-50">
            <button className="flex items-center p-2 hover:bg-backround_secondary" id="minimize" onClick={minimize}>
                <Image width={10} alt='minimize' src={iconMinimize}></Image>
            </button>
            <button className="flex items-center p-2 hover:bg-backround_secondary" id="fullscreen" onClick={fullscreen}>
                {isMaximized ?
                    <Image width={10} alt='fullscreen' src={iconMinimize2}></Image> :
                    <Image width={10} alt='fullscreen' src={iconfullscreen}></Image>
                }
            </button>
            <button className="flex items-center p-2 hover:bg-backround_secondary" id="close" onClick={close}>
                <Image width={10} alt='close' src={iconClose}></Image>
            </button>
        </div>
    </div>)
}