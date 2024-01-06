import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Home = () => {
	const { t } = useTranslation()
	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ ease: 'easeOut', duration: 0.4 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			<div
				className="mx-auto max-w-[1600px] flex flex-col-reverse md:flex-row md:items-stretch "
				style={{
					minHeight: 'calc(100vh - 60px)',
				}}
			>
				{/* Intro */}
				<div className="flex-[2] flex flex-col gap-9 items-center justify-center text-[--main-color] text-center md:border-r md:px-2 md:m-2">
					<div className="">
						<motion.h1
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="font-bold font-rubik text-3xl md:text-5xl "
						>
							{t('home.header.main')}
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
							className="-mt-1 font-rubik "
						>
							{t('home.header.second')}
						</motion.p>
					</div>
					<div className="font-rubik">
						<motion.p
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
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
							className={`relative text-lg font-delius border-b border-[--main-color] pb-1 block w-14  text-left  group text-[--main-color]`}
						>
							<span className="group-hover:tracking-wider transition-all">{t('more')}</span>
							<div
								className={`w-5 h-5 rounded-full border border-[--main-color] absolute right-[-10px] bottom-[-10px] group-hover:w-6 group-hover:h-6 group-hover:right-[-12px] group-hover:bottom-[-12px] transition-all text-[--main-color]`}
							></div>
						</Link>
					</motion.div>
				</div>

				{/* image */}
				<motion.div
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.4 }}
					className={`flex-[5] `}
					style={{
						backgroundImage: "url('/images/basic/home-bg.jpg')",
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				></motion.div>
			</div>
		</motion.div>
	)
}

export default Home
