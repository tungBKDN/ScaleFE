import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LiveScale from '../pages/LiveScale';
import MainTemplate from '../components/MainTemplate';
import Fruits from '../pages/Fruits';

const router = createBrowserRouter([
    {
        path: "",
        children: [
            {
                path: "",
                element: <MainTemplate current={"Home"} />,
                children: [
                    {
                        path: '',
                        element: <HomePage />
                    }
                ]
            },
            {
                path: "live-scale",
                element: <MainTemplate current={"Scale"} />,
                children: [
                    {
                        path: '',
                        element: <LiveScale />
                    }
                ]
            },
            {
                path: "fruits",
                element: <MainTemplate current={"Scale"} />,
                children: [
                    {
                        path: '',
                        element: <Fruits />
                    }
                ]
            }
        ]
    }
]);

export default router;