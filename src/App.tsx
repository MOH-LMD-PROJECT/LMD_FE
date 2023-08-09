import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import JSMDashboard from './pages/JMS Duplicate/Dashboard/Dashboard';
import CondomDashboard from './pages/MOH/CondomManagment';
import AdminDashboard from './pages/MOH/AdminDashboard';
import CondomInventory from './pages/MOH/CondomInventory';
import HotspotDashboard from './pages/MOH/HotspotManagement';

import FocalPerson from './pages/DCFP/FocalPerson';
import HotSpotView from './pages/DCFP/HotSpotView';
import CondomMgt from './pages/DCFP/CondomMgt';
import MyOrders from './pages/DCFP/MyOrders';
import CondomUploadEvidence from './pages/DCFP/CondomUploadEvidence';

import FocalPersonH from './pages/Hotspot-Manager/FocalPersonH';
import HotSpotViewH from './pages/Hotspot-Manager/HotSpotViewH';
import CondomMgtH from './pages/Hotspot-Manager/CondomMgtH';
import MyOrdersH from './pages/Hotspot-Manager/MyOrdersH';
import CondomUploadEvidenceH from './pages/Hotspot-Manager/CondomUploadEvidenceH';
import DeliveryHome from './pages/Delivery-Agent/DeliveryHome';

import Dashboard from './pages/storeInCharge/Dashboard';
import DashboardJms from './pages/JMS Duplicate/Dashboard/Dashboard';
import AgentsUI from './pages/JMS Duplicate/Dashboard/AgentsUI';
import Collapsible from './pages/JMS Duplicate/Collapsible';
import DataGridTable from './pages/datagrid/DataGridTable';
import CondomsMOH from './pages/MOH/CondomMgt/CondomsMOH';
import Condoms from './pages/NMS/Condoms/Condoms';
import Orders from './pages/NMS/Orders/Orders';
import CondomJMS from './pages/JMS /Condoms/Condoms';
import OrdersJMS from './pages/JMS /Orders/Orders';
import Procured from './pages/MOH/Procured';
import DashboardNMS from './pages/NMS/Dashboard/DashboardNMS';
import DashboardJMS from './pages/JMS /Dashboard /DashboardJMS';
import DashboardOther from './pages/Others/Dashboard/DashboardOther';
import RecordTextOther from './pages/Others/Record/RecordTextOther';
import StatusOther from './pages/Others/Orders/StatusOther';



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
const MohDashboard = lazy(() => import('./pages/MOH/Dashboard/Dashboard'));

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
          <Route path="/condom/managmenth" element={<CondomMgt />} />
          <Route path="/condom/stock" element={<CondomInventory />} />
          <Route path="/condom/stockh" element={<CondomInventory />} />
          <Route path="/moh/create-hotspot" element={<HotspotDashboard />} />
          <Route path="/hotspotview" element={<HotSpotView />} />

          <Route path="/focaldashboard" element={<FocalPerson />} />
          <Route path="/focaldashboardh" element={<FocalPersonH />} />
          <Route path="/moh" element={<MohDashboard />} />
         
          <Route path="/moh/admin/userManagment" element={<AdminDashboard />} />
          <Route path="/condom/dfcp" element={<CondomMgt />} />
          <Route path="/condom/dfcph" element={<CondomMgtH />} />
          <Route path="/dfcp/condom/orders" element={<MyOrders />} />
          <Route path="/dfcp/condom/ordersh" element={<MyOrdersH />} />
          <Route
            path="/dfcp/condom/evidence"
            element={<CondomUploadEvidence />}
          />
          <Route
            path="/dfcp/condom/evidenceh"
            element={<CondomUploadEvidenceH />}
          />
          <Route path="/storeincharge" element={<Dashboard />} />
          <Route path="/jms" element={<DashboardJms />} />
          <Route path="/jms/agentui" element={<AgentsUI />} />
          <Route path="/other/condom" element={<DataGridTable />} />
          <Route path="/jms/mgt/condom" element={<Collapsible />} />
          <Route path="/moh/condomsmoh" element={<CondomsMOH />} />
          <Route path="/delivery/home" element={<DeliveryHome />} />
          <Route path="/nms/condoms" element={<Condoms />} />
          <Route path="/nms/orders" element={<Orders />} />
          <Route path="/jms/condoms" element={< CondomJMS />} />
          <Route path="/jms/orders" element={< OrdersJMS />} />
          <Route path="/moh/procured" element={<Procured />} />
          <Route path="/nms/dashboard" element={<DashboardNMS />} />
          <Route path="/jms/dashboard" element={<DashboardJMS />} />
          <Route path="/others/dashboard" element={<DashboardOther />} />
          <Route path="/others/status" element={<StatusOther />} />
          <Route path="/others/record" element={<RecordTextOther />} />

          {/* <Route
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
          /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
