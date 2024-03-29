import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectCoverflow, EffectFade, Grid, Navigation, Pagination, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCategoriesContext } from '../Context/CategoriesProvider'
import { useLoadingContext } from '../Context/LoadingProvider'
import { translate } from '../services/translate'

const Category = () => {
	const { id } = useParams()
	const { getCategory, currentCategory } = useCategoriesContext()
	const { withLoading, loading } = useLoadingContext()
	const { subcategories } = currentCategory
	const location = useLocation()

	const {
		t,
		i18n: { language },
	} = useTranslation()

	const scrollToTarget = () => {
		let fragmentIdentifier = location.hash?.substring(1)
		if (fragmentIdentifier && Object.keys(currentCategory).length > 0) {
			const target = document.getElementById(fragmentIdentifier)
			let foundedSwiper = false
			let swiperInstance, swiperSlideInstance
			outerLoop: for (const swiper of document.querySelectorAll('.swiper')) {
				for (const slide of swiper.querySelectorAll('.swiper-slide')) {
					for (const product of slide.querySelectorAll('.product')) {
						if (product.id === fragmentIdentifier) {
							foundedSwiper = true
							swiperInstance = swiper
							swiperSlideInstance = slide
							break outerLoop
						}
					}
				}
			}
			if (target) {
				if (foundedSwiper) {
					const index = swiperSlideInstance.swiperSlideIndex
					swiperInstance.scrollIntoView(false)
					swiperInstance.swiper.slideTo(index, 2000, false)
				} else {
					target.scrollIntoView(false)
				}
			}
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		}
	}
	useEffect(() => {
		withLoading(() => getCategory(id), 'getCategory')
	}, [id])

	useEffect(() => {
		scrollToTarget()
	}, [location.key, currentCategory])

	if (loading.getCategory === true) {
		return <div className="mt-8 mx-auto rounded-full w-10 h-10 border-r-2 border-black animate-spin"></div>
	} else if (loading.getCategory == undefined) return null

	return (
		<motion.div>
			{/* image */}
			<div className="relative">
				<motion.img
					initial={{ opacity: 0, x: -200 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7 }}
					loading="lazy"
					src={currentCategory?.image?.secure_url}
					alt="category image"
					className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
				/>
				{/* overlay */}
				<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
					<h1 className="text-3xl md:text-5xl uppercase font-bold text-white">
						{translate(language, currentCategory?.name_en, currentCategory?.name_ar)}
					</h1>
				</div>
			</div>

			<div className="max-container">
				{/* subcategories */}
				<div className="flex flex-col gap-1 md:gap-5">
					{subcategories?.length > 0 ? (
						<>
							{subcategories
								?.sort((a, b) => b.sort_order - a.sort_order)
								?.map((sub, i) => {
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
	const othersCondition = subcategory?.name_en?.trim() == 'others'
	return (
		<div className="my-6 relative" id={subcategory?._id}>
			<h2
				className={`mb-2 text-3xl md:text-4xl font-semibold  text-center text-[--main-color] w-fit mx-auto relative pb-3 ${
					othersCondition && 'hidden'
				}`}
			>
				{translate(language, subcategory?.name_en, subcategory?.name_ar)}
				<img
					src="/images/basic/line.svg"
					alt="line"
					className={`h-[20px] !w-full absolute -bottom-[10px] left-0 right-0  -z-10 object-center object-cover`}
				/>
			</h2>
			{subcategory?.description_en && (
				<p className={`mb-5 text-lg text-center text-[--main-color] w-fit mx-auto`}>
					{translate(language, subcategory?.description_en, subcategory?.description_ar)}
				</p>
			)}

			<SubProducts subcategory={subcategory} othersCondition={othersCondition} />
		</div>
	)
}

const SubProducts = ({ subcategory, othersCondition }) => {
	const matchedLength = subcategory?.products?.length > 3

	if (othersCondition) {
		return (
			<div className="px-4 xs:px-20 grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{subcategory?.products
					?.sort((a, b) => b.sort_order - a.sort_order)
					?.map((pro, i) => (
						<Product index={i} product={pro} key={pro._id} />
					))}
			</div>
		)
	}

	return (
		<Swiper
			// id="category"
			modules={[Navigation, Pagination, EffectFade, EffectCoverflow, Grid, Zoom]}
			navigation={true}
			centerInsufficientSlides={true}
			centeredSlides={matchedLength}
			dir="ltr"
			className="p-4 mb-6 md:mb-12"
			grabCursor={true}
			effect="coverflow"
			breakpoints={{
				0: { spaceBetween: 20, slidesPerView: 1 },
				480: { spaceBetween: 20, slidesPerView: 2 },
				640: { spaceBetween: 20, slidesPerView: 2 },
				768: { spaceBetween: matchedLength ? 30 : 20, slidesPerView: 3 },
				992: { spaceBetween: matchedLength ? 30 : 20, slidesPerView: 3 },
			}}
			coverflowEffect={{
				rotate: 0,
				stretch: matchedLength ? 0 : 0,
				depth: 30,
				modifier: matchedLength ? 4 : 0,
				slideShadows: false,
			}}
		>
			{subcategory?.products
				?.sort((a, b) => b.sort_order - a.sort_order)
				?.map((pro, i) => (
					<SwiperSlide key={pro._id} className={`w-[280px]`}>
						<Product index={i} product={pro} />
					</SwiperSlide>
				))}
		</Swiper>
	)
}

const Product = ({ product, index, id }) => {
	const {
		i18n: { language },
	} = useTranslation()
	const ref = useRef()
	const [hoverImage, setHoverImage] = useState(false)
	const location = useLocation()
	const fragmentIdentifier = location.hash?.substring(1)

	useEffect(() => {
		if (fragmentIdentifier && fragmentIdentifier == product?._id) {
			ref.current.classList.remove('search-animation')
			void ref.current.offsetWidth
			ref.current.classList.add('search-animation')
		} else {
			ref.current.classList.remove('search-animation')
		}
	}, [location.key, fragmentIdentifier])

	return (
		<div
			ref={ref}
			className={`product scroll-mt-[75px] min-h-[450px] p-4 shadow-lg rounded-md text-center bg-[--third-color] `}
			id={product._id}
		>
			<img
				src={product?.image?.secure_url}
				alt="product image"
				className={`cursor-pointer mx-auto h-64 object-cover mb-4 rounded-md transition-all ${
					hoverImage == true && 'scale-150'
				}`}
				loading="lazy"
				onClick={() => setHoverImage(p => !p)}
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
	)
}
