import React, { useContext, useState } from 'react'
import { Layout, Menu, Tooltip } from 'antd';
import Logo from '../assets/images/navbar_logo.png'

import assets from '../assets/images/icon/dashboard/assets.svg'
import insight from '../assets/images/icon/dashboard/assets.insight.svg'
import cl from '../assets/images/icon/cloudflare.svg'
import lonceng from '../assets/images/icon/lonceng.svg'
import { useNavigate, useLocation, Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Skeleton from 'react-loading-skeleton';
import {  LogoutOutlined, RightOutlined, } from '@ant-design/icons';
import packageJson from '../../package.json';
import MyContext from '../helpers/contex';

const { Content, Sider } = Layout;


export const LayoutDashboard = ({ children, title, classNameItem = "" }) => {
    const breadcrumbs = useBreadcrumbs();

    const [active, setactived] = useState(false);
    const location = useLocation()
    const { configSettings } = useContext(MyContext)

    let navigate = useNavigate()
    let param = window.location.hash.split("/").pop()

    let subMenu = location.state ? {
        label: location.state.name, key: location.state.name, icon: <div className="flex items-center flex-1 justify-center w-[25px]">
            <div className='text-2xl font-bold'> {location.state.name.charAt(0).toUpperCase()}</div>
        </div>,
        children: [
            {
                label: 'Overview Asset', key: 'assets-overview', icon: <div className="flex items-center justify-center"><img className="max-w-none" src={assets}></img></div>,
                onClick: () => {
                    navigate(`/user/zone/${location.state.name}/assets-overview`, {
                        state: { ...location.state },
                    })
                }
            }, // remember to pass the key prop
            {
                label: 'Traffic Insights', key: 'assets-traffic', icon: <div className="flex items-center justify-center"><img className="max-w-none" src={insight}></img></div>,
                onClick: () => {
                    navigate(`/user/zone/${location.state.name}/assets-traffic`, {
                        state: { ...location.state },
                    })
                }
            }, // remember to pass the key prop
            {
                label: 'Security Insights', key: 'assets-security', icon: <div className="flex items-center justify-center"><img className="max-w-none" src={insight}></img></div>,
                onClick: () => {
                    navigate(`/user/zone/${location.state.name}/assets-security`, {
                        state: { ...location.state },
                    })
                }
            }, // remember to pass the key prop
        ]
    } : {}


    const items = [
        {
            label: 'Asset List',
            key: 'assets-list',
            icon: <div className="flex items-center justify-center"><img className="max-w-none" src={assets}></img></div>,
            onClick: () => {
                navigate("/user/assets-list")
            }
        }, // remember to pass the key prop
        {
            label: 'All Asset Insights', key: 'assets-insight', icon: <div className="flex items-center justify-center"><img className="max-w-none" src={insight}></img></div>,
            onClick: () => {
                navigate("/user/assets-insight")
            }
        }, // which is required
        {
            ...subMenu
        }

    ];

    const onQuit = () => {
        localStorage.removeItem("token")
        configSettings.setConfig(a => ({ ...a, token: null }))
    }

    return (
        <div className="h-screen overflow-y-auto relative" id="container">
            <Layout className=" h-full w-full !bg-transparent min-h-screen overflow-auto">
                <div className="bg-[#EBEBEB] dark:!bg-backround_secondary px-6 py-2  flex items-center justify-between shadow">
                    <div className="flex">
                       <img className="w-[250px]" src={Logo}></img>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="border border-backround_secondary border-opacity-20 shadow p-5 flex hover:bg-white hover:bg-opacity-20">
                            <img width={15} src={lonceng}></img>
                        </div>
                        <div className="border border-backround_secondary border-opacity-20 p-2 shadow flex hover:bg-white hover:bg-opacity-20">
                            <div className="pr-4">
                                <div>CREOENGINE</div>
                                <div className="text-xs bg-gray-500 p-1 text-white font-bold">3 YEARS PROTECTED</div>
                            </div>
                            <Tooltip title="LOG OUT">
                                <div className="flex items-center px-2 cursor-pointer" onClick={onQuit}>
                                    <LogoutOutlined></LogoutOutlined>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <Layout className="!bg-transparent overflow-y-auto overflow-x-hidden flex-1 flex-row">
                    <Sider collapsible trigger={null} collapsed={active} className="bg-[#EBEBEB] dark:!bg-backround_secondary flex flex-col !flex-1 shadow min-h-[80vh] relative" >
                        {items ?
                            <Menu mode="inline"
                                defaultSelectedKeys={[param]}
                                defaultOpenKeys={[location?.state?.name]}
                                className=" bg-transparent flex-1 sticky" style={{
                                    borderRight: 0,
                                }}
                                items={items}
                            >
                            </Menu>
                            : <div className="flex p-4 flex-col">
                                <Skeleton count={5} height={50} containerClassName={"space-y-2"}>

                                </Skeleton>
                            </div>}

                        <div className={`grid ${!active && "grid-cols-2"}  w-full absolute bottom-0`}>
                            {!active ? <button className="py-6 border border-gray-400 flex items-center justify-center hover:bg-white" onClick={() => setactived(true)}>
                                <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6835 17.65L5.05016 10L12.6835 2.35L10.3335 0L0.333496 10L10.3335 20L12.6835 17.65Z" fill="#2A2A2A" />
                                </svg>
                            </button> : <button className="py-6 border border-gray-400 flex items-center justify-center hover:bg-white" onClick={() => setactived(false)}>
                                <RightOutlined width={13} height={13} />
                            </button>}

                            {!active &&
                                <div className="flex items-center justify-center">Version {packageJson.version}</div>
                            }
                        </div>
                    </Sider>
                    <Layout className="bg-transparent overflow-y-auto overflow-x-hidden " >
                        <div className="flex flex-col flex-1 " style={{
                            padding: '10px 50px 30px',
                        }}>
                            <div className="pb-3 pt-4 flex gap-3">

                                {breadcrumbs.map((d, k) => {
                                    return <Link to={d.key} key={k} className="hover:text-[#00A3FF] text-[#444]">
                                        {d.breadcrumb}
                                    </Link>
                                })}
                            </div>
                            <h1 className="pb-4 text-3xl uppercase dark:text-white">{title}</h1>
                            <Content
                                className="site-layout-background flex flex-col relative flex-1"
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >

                                <div className={`fade-in flex-1 ${classNameItem}`}>
                                    {children}
                                </div>

                            </Content>
                        </div>
                        <div className="flex items-end ">
                            <Layout className="h-[60px] border-t border-t-border_primary items-end justify-center flex px-6 fade-in bg-[#EBEBEB] dark:!bg-backround_secondary shadow">
                                <div>
                                    <img src={cl}></img>
                                </div>
                            </Layout>
                        </div>

                    </Layout>
                </Layout>
            </Layout>
        </div>
    )

}