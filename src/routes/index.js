import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import LiveScale from '../pages/LiveScale';

const router = createBrowserRouter([
    {
        path: "",
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "live-scale",
                element: <LiveScale />
            }
        ]
    }
]);

export default router;