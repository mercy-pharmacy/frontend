import { motion } from 'framer-motion'
import { useCategoriesContext } from '../Context/CategoriesProvider'
import { useEffect } from 'react'
import { useLoadingContext } from '../Context/LoadingProvider'
import { Link } from 'react-router-dom'
import { translate } from "../services/translate"
import { useTranslation } from "react-i18next"
const About = () => {
	const { getAllCategories, categories } = useCategoriesContext()
	const { loading, withLoading } = useLoadingContext()
	const {
		t,
		i18n: { language },
	} = useTranslation()
	useEffect(() => {
		withLoading(() => getAllCategories(), 'getAllCategories')
	}, [])

	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ ease: 'easeOut', duration: 0.4 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			{/* image */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className={`h-[200px] md:h-[300px] lg:h-[400px] transition-all duration-1000`}
				style={{
					backgroundImage: "url('/public/images/basic/about-bg.jpg')",
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			></motion.div>

			<div className="max-container">
				{/* Into */}
				<div className="my-10">
					<h1
						className={`text-[--main-color] font-rubik text-4xl pb-2 border-b-2 border-[--second-color] w-fit mb-5 font-semibold`}
					>
						{t('about.title')}
					</h1>
					<p className={`text-[--main-color] text-lg font-medium`}>{t('about.desc')}</p>
				</div>

				{/* categories */}
				<div className="my-10">
					{/* title */}
					<div className="text-center mb-10">
						<h2 className="text-[--main-color] font-rubik font-semibold text-2xl pb-1 mb-1 border-b-2 border-[--second-color] w-fit mx-auto">
							{t('about.secondTitle.main')}
						</h2>
						<p className="text-[--main-color] text-sm font-itim">{t('about.secondTitle.second')}</p>
					</div>
					{/* items */}
					{loading.getAllCategories ? (
						<div className="w-10 h-10 border-2 rounded-full border-r-0 border-[--main-color] mx-auto animate-spin"></div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2">
							{categories?.map((cate, i) => {
								const {
									name_en,
									name_ar,
									image: { secure_url: url },
									description_ar,
									description_en,
									_id,
								} = cate
								return (
									<motion.div
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}
										key={_id}
										className="py-4 flex flex-col gap-3 items-center transition-hover duration-300 hover:bg-[--second-color] text-[--main-color] rounded-md"
									>
										<img src={url} alt="" className="w-56 h-72 object-cover rounded-md" />
										<p className="font-delius text-2xl text-center font-semibold">{translate(language, name_en, name_ar)}</p>
										<p className="font-rubik text-sm text-center max-w-xs">{translate(language, description_en, description_ar)}</p>
										<Link
											to={`/category/${_id}`}
											className={`relative text-lg font-delius border-b border-[--main-color] pb-1 block w-14  text-left  group text-[--main-color]`}
										>
											<span className="group-hover:tracking-wider transition-all">{t('more')}</span>
											<div
												className={`w-5 h-5 rounded-full border border-[--main-color] absolute right-[-10px] bottom-[-10px] group-hover:w-6 group-hover:h-6 group-hover:right-[-12px] group-hover:bottom-[-12px] transition-all text-[--main-color]`}
											></div>
										</Link>
									</motion.div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default About
