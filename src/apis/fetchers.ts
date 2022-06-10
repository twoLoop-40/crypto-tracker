
export function fetcher (baseUrl: string) { 
	return (routes?: string[]) => {
		const afterPart = () => 
			routes?.reduce((made, route) => made+'/'+route,'')
		const makeFullUrl = () => routes? baseUrl + afterPart() : baseUrl
		return fetch(makeFullUrl()).then<unknown>(response => response.json())
	}
}

export function baseUrlForCoin (coinType: string) {
	type StringInfos = {
		[key: string]: string
	}
	const baseUrls: StringInfos = {
		'icons': 'https://coinicons-api.vercel.app/api/icon',
		'infos': 'https://api.coinpaprika.com/v1/coins',
		'tickers': 'https://api.coinpaprika.com/v1/tickers'
	}
	return coinType in baseUrls ? baseUrls[coinType] : undefined
}

export function unknownToType<Type> (arg: unknown) {
	return arg as Type
}

