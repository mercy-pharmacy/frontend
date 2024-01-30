import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import ScrollWhenRefresh from './Components/ScrollWhenRefresh'
import { useAuthContext } from './Context/AuthProvider'
import About from './Pages/About'
import AdminCategories from './Pages/Admin/AdminCategories'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminProducts from './Pages/Admin/AdminProducts'
import AdminSubcategories from './Pages/Admin/AdminSubcategories'
import CreateCategory from './Pages/Admin/CreateCategory'
import CreateProduct from './Pages/Admin/CreateProduct'
import CreateSubcategory from './Pages/Admin/CreateSubcategory'
import UpdateAdminInfos from './Pages/Admin/UpdateAdminInfos'
import UpdateCategory from './Pages/Admin/UpdateCategory'
import UpdateProduct from './Pages/Admin/UpdateProduct'
import UpdateSubcategory from './Pages/Admin/UpdateSubcategory'
import Category from './Pages/Category'
import Contact from './Pages/Contact'
import Home from './Pages/Home'
import Products from './Pages/Products'

function App() {
	const { auth } = useAuthContext()
	const location = useLocation()
	const {
		i18n: { language },
	} = useTranslation()

	return (
		<div
			style={{
				fontFamily: language == 'en' ? "'Gill Sans MT', sans-serif" : "'El Messiri', sans-serif",
			}}
		>
			<Toaster position="bottom-left" />
			<Navbar />
			<AnimatePresence mode="wait">
				<div
					className={`mt-[60px] overflow-hidden min-page-height`}
					dir={language == 'ar' ? 'rtl' : 'ltr'}
				>
					{/* <ScrollWhenRefresh>  */}
						<Routes location={location} key={location.pathname}>
							<Route index element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/products" element={<Products />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/category/:id" element={<Category />} />
							<Route path="/admin" element={auth ? <AdminDashboard /> : <AdminLogin />}>
								<Route index element={auth ? <AdminCategories /> : <AdminLogin />} />
								<Route path="categories" element={auth ? <AdminCategories /> : <AdminLogin />} />
								<Route path="subcategories" element={auth ? <AdminSubcategories /> : <AdminLogin />} />
								<Route path="products" element={auth ? <AdminProducts /> : <AdminLogin />} />
								<Route path="create-category" element={auth ? <CreateCategory /> : <AdminLogin />} />
								<Route path="update-category/:id" element={auth ? <UpdateCategory /> : <AdminLogin />} />
								<Route
									path="create-subcategory"
									element={auth ? <CreateSubcategory /> : <AdminLogin />}
								/>
								<Route
									path="update-subcategory/:id"
									element={auth ? <UpdateSubcategory /> : <AdminLogin />}
								/>
								<Route path="create-product" element={auth ? <CreateProduct /> : <AdminLogin />} />
								<Route path="update-product/:id" element={auth ? <UpdateProduct /> : <AdminLogin />} />
								<Route path="update-admin" element={auth ? <UpdateAdminInfos /> : <AdminLogin />} />
							</Route>
						</Routes>
					{/* </ScrollWhenRefresh> */}
				</div>
			</AnimatePresence>
			<Footer />
		</div>
	)
}

export default App
