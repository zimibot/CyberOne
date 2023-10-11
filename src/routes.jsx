import React from 'react'
import {
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import App from './App'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'
import DashboardAssetsList from './pages/dashboard/assetsList';
import DashboardAssetsInsight from './pages/dashboard/assets';
import AssetsOverview from './pages/dashboard/users/overview';
import { SkeletonTheme } from 'react-loading-skeleton'
import TrafficOverview from './pages/dashboard/users/traffic';
import SecurityAssets from './pages/dashboard/users/security';
import Custom404 from "./pages/auth_404";
import Non404 from './pages/404';
import MyContext, { MainContext } from "./helpers/contex";
import "antd/dist/antd.css"
const MainRouter = () => {
    return <MyContext.Provider value={MainContext()}>
    <SkeletonTheme baseColor="#EBEBEB" highlightColor="#d9d9d9" inline={true}>
      <HashRouter>
        <Routes>
          <Route path="*" element={<Non404 />} />
          <Route path="/">
            <Route index element={<App />} />
            <Route path="user">
              <Route index element={<Custom404 />} />
              <Route path="assets-list" element={<DashboardAssetsList />} />
              <Route path="assets-insight" element={<DashboardAssetsInsight />} />
              <Route path="zone">
                <Route index element={<Custom404 />} />
                <Route path=":userId">
                  <Route index element={<Custom404 />} />
                  <Route path="assets-overview" element={<AssetsOverview />} />
                  <Route path="assets-traffic" element={<TrafficOverview />} />
                  <Route path="assets-security" element={<SecurityAssets />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </SkeletonTheme>
  </MyContext.Provider>
}

export default MainRouter