import { motion } from 'framer-motion'
import { useLoadingContext } from '../Context/LoadingProvider'
import { useCategoriesContext } from '../Context/CategoriesProvider'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { translate } from '../services/translate'

const Products = () => {
	const { withLoading, loading } = useLoadingContext()
	const { getAllCategories, categories } = useCategoriesContext()
	const {
		t,
		i18n: { language },
	} = useTranslation()
	useEffect(() => {
		withLoading(() => getAllCategories(), 'getAllCategories')
	}, [])

	if (loading.getAllCategories === true)
		return (
			<div className="mt-10 mx-auto rounded-full w-10 h-10 border-r-2 border-black animate-spin"></div>
		)
	else if (loading.getAllCategories == undefined) return null

	if (categories?.length == 0)
		return (
			<h1 className="max-container text-center mt-10 text-3xl font-bold font-delius">No Categories.</h1>
		)

	return (
		<motion.div>
			<div className="max-container my-10 lg:px-20">
				{/* title */}
				<div className="text-center mb-8">
					<motion.h1
						initial={{ opacity: 0, y: -200 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className={`text-6xl font-bold border-b-2 border-[--main-color] w-fit mx-auto mb-3 pb-2 text-[--main-color] font-itim`}
					>
						{t('products.title')}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 200 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-[--main-color] font-medium font-rubik"
					>
						{t('products.pageDesc')}
					</motion.p>
				</div>

				<div className="flex flex-col gap-4">
					{categories?.map((cate, i) => (
						<Category category={cate} index={i + 1} key={cate._id} />
					))}
				</div>
			</div>
		</motion.div>
	)
}

export default Products

const Category = ({ category, index }) => {
	const isOdd = index % 2 !== 0
	const {
		t,
		i18n: { language },
	} = useTranslation()
	return (
		<motion.div
			initial={{ opacity: 0, x: isOdd ? 200 : -200 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3 * index }}
			className={`flex items-stretch max-md:flex-col-reverse
			 ${isOdd ? ' text-[--main-color] flex-row' : ' text-white/75 flex-row-reverse'} `}
		>
			{/* info */}
			<div
				className={`md:flex-[3] p-10 flex flex-col justify-center items-start gap-6  ${
					isOdd ? 'bg-[--second-color]' : 'bg-[--main-color]'
				}`}
			>
				{/* Title */}
				<motion.h2
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className={`text-5xl max-md:text-3xl pb-2 border-b-2 font-rubik ${
						isOdd ? 'border-[--main-color]' : 'border-white'
					}`}
				>
					{translate(language, category?.name_en, category?.name_ar)}
				</motion.h2>
				{/* Description */}
				<motion.p
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className={`text-[19px] max-md:text-[17px] leading-7 font-medium font-itim`}
				>
					{translate(language, category?.description_en, category?.description_ar, true)}
				</motion.p>
				{/* More */}
				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
					className="w-20 max-md:w-14"
				>
					<Link
						to={`/category/${category?._id}`}
						className={`relative text-2xl max-md:text-lg font-delius border-b pb-1 block w-full  text-left  ${
							isOdd ? 'border-[--main-color]' : 'border-white'
						} group`}
					>
						<span className="group-hover:tracking-wider transition-all">{t('more')}</span>
						<div
							className={`w-5 h-5 rounded-full border absolute right-[-10px] bottom-[-10px]  ${
								isOdd ? 'border-[--main-color]' : 'border-white'
							} group-hover:w-6 group-hover:h-6 group-hover:right-[-12px] group-hover:bottom-[-12px] transition-all`}
						></div>
					</Link>
				</motion.div>
			</div>
			{/* image */}
			<motion.div
				initial={{ opacity: 0, x: isOdd ? -400 : 400 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8 }}
				className="md:flex-[2]  max-md:h-[200px]"
			>
				<img
					src={category?.image?.secure_url}
					alt={category?.name_en}
					className={`h-full object-cover max-w-full w-full`}
				/>
			</motion.div>
		</motion.div>
	)
}
