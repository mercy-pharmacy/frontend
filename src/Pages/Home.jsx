import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Home = () => {
	const [currentImage, setCurrentImage] = useState(0)
	const images = ['/images/basic/home-bg.jpg', '/images/basic/home-bg-1.jpg']

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImage(prevImage => (prevImage + 1) % images.length)
		}, 3000)
		return () => clearInterval(intervalId)
	}, [currentImage, images])

	const {
		t,
		i18n: { language },
	} = useTranslation()
	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ ease: 'easeOut', duration: 0.4 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			{/* Layout */}
			<div
				className="mx-auto max-w-[1600px] flex flex-row max-md:flex-col-reverse max-md:justify-end items-stretch "
				style={{
					height: 'calc(100vh - 60px)',
				}}
			>
				{/* Intro */}
				<div
					className={`max-md:flex-1 max-md:py-5 max-md:h-full md:flex-[2] flex flex-col gap-9 max-md:gap-5 items-center justify-center text-[--main-color] text-center ${
						language == 'en' ? 'md:border-r md:mr-2' : 'md:border-l md:ml-2'
					}   md:border-[--main-color]  md:px-10 relative`}
				>
					<div>
						<motion.h1
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="font-bold  text-7xl max-md:text-5xl whitespace-nowrap !font-gill"
						>
							{t('home.header.main')}
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
							className=" text-lg"
						>
							{t('home.header.second')}
						</motion.p>
					</div>
					<div>
						<motion.p
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
							className="text-lg"
						>
							{t('home.description.first')} <br />
							{t('home.description.second')} <br />
							{t('home.description.third')}
						</motion.p>
					</div>
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
					>
						<Link
							to={`/about`}
							className={`relative text-lg  border-b border-[--main-color] pb-1 block w-14  text-left  group text-[--main-color]`}
						>
							<span className="group-hover:tracking-wider transition-all">{t('more')}</span>
							<div
								className={`w-5 h-5 rounded-full border border-[--main-color] absolute right-[-10px] bottom-[-10px] group-hover:w-6 group-hover:h-6 group-hover:right-[-12px] group-hover:bottom-[-12px] transition-all text-[--main-color]`}
							></div>
						</Link>
					</motion.div>
					<img
						src="/images/basic/home-bg-2.jpg"
						alt="test"
						className={`absolute -z-10 ${
							language == 'en' ? 'left-0' : 'right-0'
						} top-0 h-full w-1/2 object-cover opacity-70 max-md:hidden`}
					/>
					<motion.img
						initial={{ opacity: 0, x: -300 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4, duration: 0.4 }}
						src="/images/basic/branch.svg"
						alt="branch"
						className={`absolute bottom-4 w-40 ${language == 'en' ? 'left-0' : 'right-0 !-scale-x-100'} max-md:hidden`}
					/>
					<motion.img
						initial={{ opacity: 0, x: -300 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4, duration: 0.4 }}
						src="/images/basic/branch.svg"
						alt="branch"
						className="absolute top-4 w-40 right-0 !rotate-180 max-md:hidden"
					/>
					<motion.img
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.6, duration: 0.4 }}
						src="/images/basic/naturalsvg.svg"
						alt="branch"
						className={`absolute w-56 ${language == 'en' ? '-right-28' : '-left-28'} bottom-16 z-30  max-md:hidden`}
					/>
				</div>

				{/* image */}
				<div
					className="md:flex-[5] overflow-hidden max-md:mb-2 max-md:h-[400px]"
					style={{ ['@media (minWidth: 768px)']: { height: 'calc(100vh - 60px)' } }}
				>
					<AnimatePresence mode="wait">
						<motion.img
							key={currentImage}
							src={images[currentImage]}
							alt=""
							className="h-full w-full object-cover"
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 100 }}
							transition={{ duration: 0.5 }}
						/>
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	)
}

export default Home
