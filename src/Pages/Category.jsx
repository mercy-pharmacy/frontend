import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectCoverflow, EffectFade, Grid, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCategoriesContext } from '../Context/CategoriesProvider'
import { useLoadingContext } from '../Context/LoadingProvider'
import { translate } from '../services/translate'

const Category = () => {
	const { id } = useParams()
	const { getCategory, currentCategory } = useCategoriesContext()
	const { withLoading, loading } = useLoadingContext()
	const {
		t,
		i18n: { language },
	} = useTranslation()

	useEffect(() => {
		withLoading(() => getCategory(id), 'getCategory')
	}, [id])

	if (loading.getCategory === true)
		return (
			<div className="mt-8 mx-auto rounded-full w-10 h-10 border-r-2 border-black animate-spin"></div>
		)
	else if (loading.getCategory == undefined) return null

	const { subcategories } = currentCategory
	return (
		<motion.div
			initial={{ opacity: 0, y: 300 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ ease: 'easeOut', duration: 0.4 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			{/* image */}
			<div className="relative">
				<img
					src={currentCategory?.image?.secure_url}
					alt="category image"
					className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
				/>
				{/* overlay */}
				<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
					<h1 className="text-3xl md:text-5xl uppercase font-bold text-white tracking-widest">
						{translate(language, currentCategory?.name_en, currentCategory?.name_ar)}
					</h1>
				</div>
			</div>
			<div className="max-container">
				{/* subcategories */}
				<div className="flex flex-col gap-1 md:gap-5">
					{subcategories?.length > 0 ? (
						<>
							{subcategories?.map((sub, i) => {
								return <Subcategory index={i} subcategory={sub} key={sub._id} />
							})}
						</>
					) : (
						<h1 className="text-2xl text-center  mt-8">{t('category.noSubcategories')}</h1>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default Category

const Subcategory = ({ subcategory, index }) => {
	const {
		i18n: { language },
	} = useTranslation()
	return (
		<div className="my-6 relative">
			<h2 className="mb-2 text-3xl md:text-4xl font-semibold  text-center text-[--main-color] w-fit mx-auto relative pb-3">
				{translate(language, subcategory?.name_en, subcategory?.name_ar)}
				<img
					src="/images/basic/line.svg"
					alt="line"
					className={`h-[20px] !w-full absolute -bottom-[10px] left-0 right-0  -z-10 object-center object-cover`}
				/>
			</h2>
			{subcategory?.description_en && (
				<p className="mb-5 text-lg text-center text-[--main-color] w-fit mx-auto ">{translate(language, subcategory?.description_en, subcategory?.description_ar)}</p>
			)}

			<SubProducts subcategory={subcategory} />
		</div>
	)
}

const SubProducts = ({ subcategory }) => {
	const matchedLength = subcategory?.products?.length > 3
	return (
		<Swiper
			modules={[Navigation, Pagination, EffectFade, EffectCoverflow, Grid]}
			navigation={matchedLength ? true : false}
			loop={true}
			centeredSlides={true}
			dir="ltr"
			className="p-4 pb-12 items-stretch"
			grabCursor={true}
			effect="coverflow"
			breakpoints={{
				320: { spaceBetween: 20, slidesPerView: 'auto' },
				768: { spaceBetween: matchedLength ? 50 : 20, slidesPerView: 'auto' },
				992: { spaceBetween: matchedLength ? 50 : 20, slidesPerView: 3 },
			}}
			coverflowEffect={
				matchedLength
					? {
							rotate: 0,
							stretch: 0,
							depth: 70,
							modifier: 2.5,
							slideShadows: false,
					  }
					: false
			}
		>
			{subcategory?.products?.map((pro, i) => (
				<SwiperSlide key={pro._id} className="w-[320px]" id={pro._id}>
					<Product index={i} product={pro} />
				</SwiperSlide>
			))}
		</Swiper>
	)
}

const Product = ({ product, index }) => {
	const {
		i18n: { language },
	} = useTranslation()
	return (
		<>
			<div className="p-4 shadow-lg rounded-md text-center bg-[--third-color]">
				<img
					src={product?.image?.secure_url}
					alt=""
					className="mx-auto h-64 object-cover mb-4 rounded-md"
				/>
				<h3 className=" font-semibold text-xl text-[--main-color] pt-4 border-t border-[--main-color]">
					{translate(language, product?.name_en, product?.name_ar)}
				</h3>
				{product?.description_en && (
					<p className="text-[--main-color] text-sm  mt-5 max-w-xs mx-auto">
						{translate(language, product?.description_en, product?.description_ar, true)}
					</p>
				)}
			</div>
		</>
	)
}
