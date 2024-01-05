import { motion } from 'framer-motion'
import { socials } from '../constants/data'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"

const Contact = () => {
	const {t, i18n: {language}} = useTranslation()
	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ ease: 'easeOut', duration: 0.4 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			{/* layout */}
			<div className="flex flex-col" style={{ minHeight: 'calc(100vh - 60px)' }}>
				{/* content */}
				<div className="max-container my-4">
					{/* title */}
					<div className="text-center mb-12">
						<motion.h1
							initial={{ opacity: 0, y: -200 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className={`text-6xl font-bold border-b-2 border-[--main-color] w-fit mx-auto mb-3 pb-2 text-[--main-color] font-itim`}
						>
							{t('contact.title')}
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 200 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-[--main-color] font-medium font-rubik"
						>
							{t('contact.desc.first')}
							<br />
							{t('contact.desc.second')}
						</motion.p>
					</div>
					{/* socials */}
					<div className="flex items-center justify-center flex-wrap gap-7">
						{socials.map((item, i) => {
							const { icon: Icon, link, title } = item
							return (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: (0.1 + i) * 0.3 }}
									key={i}
								>
									<Link
										to={link}
										className="max-sm:w-full flex flex-col items-center gap-2 group"
										target="_blank"
									>
										<Icon
											size={50}
											color="var(--main-color)"
											className="transition-all group-hover:!text-[--second-color]"
										/>
										<p className="text-[--main-color] font-delius font-semibold">{title}</p>
									</Link>
								</motion.div>
							)
						})}
					</div>
				</div>
				{/* image */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="flex-1 h-full border p-2 relative min-h-[200px]"
					style={{
						backgroundImage: "url('/public/images/basic/contact-bg.jpg')",
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				>
					{/* overlay */}
					<div className="absolute inset-0 bg-black/25"></div>
				</motion.div>
			</div>
		</motion.div>
	)
}

export default Contact
