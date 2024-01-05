const translate = (lang, en, ar, multiLines = false) => {
	if (lang == 'en') {
		if (multiLines) {
			return `${en}`.split(`\n`).map((line, i) => {
				return (
					<span className="block" key={i}>
						{line}
					</span>
				)
			})
		}
		return en
	} else if (lang == 'ar') {
		if (multiLines) {
			return `${ar}`.split(`\n`).map((line, i) => {
				return (
					<span className="block" key={i}>
						{line}
					</span>
				)
			})
		}
		return ar
	}
}

export { translate }
