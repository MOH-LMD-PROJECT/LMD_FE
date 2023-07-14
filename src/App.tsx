import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import JSMDashboard from "./pages/JMS/Dashboard/Dashboard"
import CondomDashboard from './pages/MOH/CondomManagment';
import AdminDashboard from './pages/MOH/AdminDashboard';
import CondomInventory from './pages/MOH/CondomInventory';
import HotspotDashboard from './pages/MOH/HotspotManagement';

import FocalPerson from './pages/DCFP/FocalPerson'
import HotSpotView from './pages/DCFP/HotSpotView';
import CondomMgt from './pages/DCFP/CondomMgt';
import MyOrders from './pages/DCFP/MyOrders';
import CondomUploadEvidence from './pages/DCFP/CondomUploadEvidence';
const Calendar = lazy(() => import('./pages/Calendar'));
// const Chart = lazy(() => import('./pages/Chart'));
// const FormElements = lazy(() => import('./pages/Form/FormElements'));
const FormLayout = lazy(() => import('./pages/Form/FormLayout'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
// const Tables = lazy(() => import('./pages/Tables'));
const Alerts = lazy(() => import('./pages/UiElements/Alerts'));
const Buttons = lazy(() => import('./pages/UiElements/Buttons'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const MohDashboard = lazy(() => import('./pages/MOH/Dashboard/Dashboard'))


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route index element={<SignIn />} />

        <Route element={<DefaultLayout />}>
          <Route path="/condom/managment" element={<CondomDashboard />} />
          <Route path="/condom/stock" element={<CondomInventory />} />
          <Route path="/moh/create-hotspot" element={<HotspotDashboard />} />
          <Route path='/hotspotview' element={<HotSpotView />} />
          <Route path='/focaldashboard' element={<FocalPerson />} />
          <Route path="/moh" element={<MohDashboard />} />
          <Route path="/nms/dashboard" element={<MohDashboard />} />
          <Route path="/moh/admin/userManagment" element={<AdminDashboard />} />
          <Route path="/condom/dfcp" element={<CondomMgt />} />
          <Route path="/dfcp/condom/orders" element={<MyOrders />} />
          <Route path="/dfcp/condom/evidence" element={<CondomUploadEvidence />} />


          <Route
            path="/calendar"
            element={
              <Suspense fallback={<Loader />}>
                <Calendar />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <Suspense fallback={<Loader />}>
                <FormLayout />
              </Suspense>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <Suspense fallback={<Loader />}>
                <Alerts />
              </Suspense>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <Suspense fallback={<Loader />}>
                <Buttons />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
