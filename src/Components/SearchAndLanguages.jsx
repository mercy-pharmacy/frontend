import { motion } from 'framer-motion'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { IoMdCloseCircle } from 'react-icons/io'
import { MdOutlineLanguage } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useLoadingContext } from '../Context/LoadingProvider'
import { useProductsContext } from '../Context/ProductsProvider'
import useClickOutside from '../hooks/useClickOutside'
import { translate } from '../services/translate'

const SearchAndLanguages = ({ setShowSearch, showSearch }) => {
	const {
		t,
		i18n: { changeLanguage, language },
	} = useTranslation()
	const { ref: showResultsRef } = useClickOutside(() => {
		setShowSearchResult(false)
		setSearch('')
		setSearchResults([])
	})
	const { getProducts } = useProductsContext()
	const { withLoading, loading } = useLoadingContext()

	const [showSearchResult, setShowSearchResult] = useState(false)
	const [search, setSearch] = useState('')
	const [searchResults, setSearchResults] = useState([])

	const changeL = () => changeLanguage(language == 'en' ? 'ar' : 'en')

	const handleSearch = e => {
		e.preventDefault()
		if (!search) return toast.error('Please add some text.', { position: 'bottom-center' })
		withLoading(
			() =>
				getProducts(search, data => {
					setSearchResults(data.products)
				}),
			'searchProducts',
		)
	}
	const handleClickOnSearchIcon = e => {
		if (window.matchMedia('(max-width: 768px)').matches) {
			if (showSearch) {
				handleSearch(e)
			} else {
				setShowSearch(true)
			}
		} else {
			handleSearch(e)
		}
	}

	return (
		<div className="flex items-center gap-3">
			<form onSubmit={handleSearch} ref={showResultsRef}>
				<div className={`flex items-center gap-2`}>
					<button type="button" onClick={handleClickOnSearchIcon}>
						<FiSearch />
					</button>
					<div
						className={`flex items-center gap-1 ${
							showSearch
								? 'md:relative absolute max-md:top-[65px] max-md:right-4 max-md:left-4'
								: 'hidden md:relative md:block'
						}`}
						dir="ltr"
					>
						<IoMdCloseCircle
							onClick={() => setShowSearch(false)}
							className="md:hidden bg-red-500 text-white rounded-full text-3xl cursor-pointer"
						/>
						<input
							type="text"
							placeholder="Search..."
							className="form-input !px-1 !py-[0.5px] flex-1 max-md:!w-full !w-40 focus:md:!w-48 focus:!ring-1"
							onFocus={() => setShowSearchResult(true)}
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>

						<SearchResult
							showSearchResult={showSearchResult}
							searchResults={searchResults}
							setShowSearchResult={setShowSearchResult}
							setSearchResults={setSearchResults}
							search={search}
							setSearch={setSearch}
							setShowSearch={setShowSearch}
						/>
					</div>
				</div>
			</form>

			<div className="flex items-center gap-1 cursor-pointer" onClick={changeL}>
				<MdOutlineLanguage />
				<span>{language.toUpperCase()}</span>
			</div>
		</div>
	)
}

const SearchResult = ({
	showSearchResult,
	searchResults,
	setShowSearchResult,
	setSearchResults,
	search,
	setSearch,
	setShowSearch,
}) => {
	const { loading } = useLoadingContext()
	const {
		t,
		i18n: { language },
	} = useTranslation()
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 100, pointerEvents: 'none' },
				visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
			}}
			initial={'hidden'}
			animate={showSearchResult ? 'visible' : 'hidden'}
			className={`absolute z-[99999]  max-md:top-[110%] max-md:left-0 max-md:right-0 md:w-[400px] ${
				language == 'en' ? 'md:right-0' : 'md:left-0'
			}  md:top-[180%] bg-white rounded-md px-1 py-3 shadow-md`}
		>
			{loading.searchProducts == true ? (
				<div className="w-7 h-7 border-2 border-r-0 rounded-full border-[--main-color] animate-spin mx-auto"></div>
			) : (
				<>
					{searchResults.length > 0 ? (
						<div className="flex flex-col gap-1 p-1 bg-gray-50 max-h-[400px] overflow-y-auto relative custom-scrollbar">
							{searchResults.map((pro, i) => (
								<Link
									to={`/category/${pro?.subcategoryId?.categoryId?._id}#${pro?._id}`}
									key={pro._id}
									className={`flex ${
										language == 'en' ? 'flex-row' : 'flex-row-reverse'
									} items-center gap-1 bg-white rounded shadow cursor-pointer hover:bg-gray-100 transition-all`}
									onClick={() => {
										setShowSearch(false)
										setShowSearchResult(false)
										setSearch('')
										setSearchResults([])
									}}
								>
									<img src={pro?.image?.secure_url} alt="product image" className="h-14 flex-1 object-contain" />
									<div className="flex-[3]">
										<h2 className="font-bold">{translate(language, pro?.name_en, pro?.name_ar)}</h2>
										<p className="text-gray-500">
											{translate(language, pro?.subcategoryId?.name_en, pro?.subcategoryId?.name_ar)}
										</p>
										<p className="text-gray-500">
											{translate(
												language,
												pro?.subcategoryId?.categoryId?.name_en,
												pro?.subcategoryId?.categoryId?.name_ar,
											)}
										</p>
									</div>
								</Link>
							))}
						</div>
					) : searchResults.length == 0 && loading.searchProducts == false && search ? (
						<p className="text-center text-[--main-color]">{t('noProducts')}</p>
					) : (
						<p className="text-center text-[--main-color]">{t('type')}</p>
					)}
				</>
			)}
		</motion.div>
	)
}

export default SearchAndLanguages
