import { Refine, Authenticated } from '@refinedev/core';
import {
  ThemedLayout,
  ErrorComponent,
  AuthPage,
  useNotificationProvider,
} from '@refinedev/antd';
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from '@refinedev/react-router';
import { dataProvider } from '@refinedev/supabase';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import { ConfigProvider } from 'antd';

import '@refinedev/antd/dist/reset.css';

import { supabaseClient } from './utility/supabaseClient';
import { authProvider } from './providers/authProvider';
import { resourceLabels } from './fields';
import { ResourceList } from './pages/ResourceList';
import { ResourceEdit } from './pages/ResourceEdit';
import { ResourceCreate } from './pages/ResourceCreate';

const resources = Object.entries(resourceLabels).map(([name, label]) => ({
  name,
  list: `/${name}`,
  create: `/${name}/create`,
  edit: `/${name}/edit/:id`,
  meta: { label },
}));

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider}
          resources={resources}
          options={{ syncWithLocation: true, warnWhenUnsavedChanges: true }}
        >
          <Routes>
            <Route
              element={
                <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource resource="cms_hero" />} />
              {Object.keys(resourceLabels).map((name) => (
                <Route key={name} path={name}>
                  <Route index element={<ResourceList />} />
                  <Route path="create" element={<ResourceCreate />} />
                  <Route path="edit/:id" element={<ResourceEdit />} />
                </Route>
              ))}
              <Route path="*" element={<ErrorComponent />} />
            </Route>

            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="cms_hero" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={<AuthPage type="login" registerLink={false} forgotPasswordLink={false} />}
              />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
