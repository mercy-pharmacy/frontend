import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import CategoriesProvider from './Context/CategoriesProvider.jsx'
import LoadingProvider from './Context/LoadingProvider.jsx'
import SubcategoriesProvider from './Context/SubcategoriesProvider.jsx'
import ProductsProvider from './Context/ProductsProvider.jsx'
import './index.css'
import './i18n.js'



axios.defaults.headers = {
	...axios.defaults.headers,
	'Content-Type': axios.defaults.headers['Content-Type'] || 'application/json',
}
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "https://mercypharm-backend.cyclic.app"

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route
				path="/*"
				element={
					<AuthProvider>
						<LoadingProvider>
							<CategoriesProvider>
								<SubcategoriesProvider>
									<ProductsProvider>
										<App />
									</ProductsProvider>
								</SubcategoriesProvider>
							</CategoriesProvider>
						</LoadingProvider>
					</AuthProvider>
				}
			/>
		</Routes>
	</BrowserRouter>,
)
