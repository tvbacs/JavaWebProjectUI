// App.jsx
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import MainLayout from '@/layout/MainLayout';
import PrivateRoute from '@/routes/PrivateRoute';

function App() {
  return (
    <Routes>
     {publicRoutes.map(({ path, component: Component, layout }, index) => {
      let Layout;

      if (layout === null) {
        Layout = ({ children }) => <>{children}</>;
      } else if (layout) {
        Layout = layout;
      } else {
        Layout = MainLayout;
      }

  return (
    <Route
      key={index}
      path={path}
      element={
        <Layout>
          <Component />
        </Layout>
      }
    />
  );
})}


      {privateRoutes.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <PrivateRoute>
              <MainLayout>
                <Component />
              </MainLayout>
            </PrivateRoute>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
