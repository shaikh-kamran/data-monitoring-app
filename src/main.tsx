import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import './index.css';

import ThemeContextWrapper from './theme/themeContextWrapper';

import Main from "./modules/main/Main";
import Monitor from "./modules/main/components/monitor/Monitor";
import Comparison from "./modules/main/components/comparison/Comparison";

const router = createHashRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/",
				element: <Monitor />,
			},
			{
				path: "/comparison",
				element: <Comparison />,
			}
		]
	},
	{
		path: "*",
		element: <Navigate to="/" replace />
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeContextWrapper>
		<RouterProvider router={router} />
	</ThemeContextWrapper>,
)
