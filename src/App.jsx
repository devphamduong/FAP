import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Home';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import ScheduleOfWeek from './TimeTable/ScheduleOfWeek';
import TimeTable from './TimeTable/TimeTable';

const Layout = () => {
  return (
    <div style={{ padding: '0 100px' }}>
      <Header />
      <div style={{ margin: '30px 0' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "ScheduleOfWeek",
          element: <ScheduleOfWeek />,
        },
        {
          path: "TimeTable",
          element: <TimeTable />,
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
