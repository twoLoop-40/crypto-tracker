import { useQuery } from "react-query";
import { baseUrlForCoin, fetcher, unknownToType } from "../apis/fetchers";
import { IHistorical } from "../apis/UserTypes";
import { useCoinData } from "./Coin";
import ApexChart from "react-apexcharts";


function makeCandleData (priceHistory: IHistorical[]) {
	const candleForm = (priceInfo: IHistorical) => {
		const x = new Date(priceInfo.time_close)
		const y = [priceInfo.open, priceInfo.high, priceInfo.low, priceInfo.close]
		return { x, y }
	}
	return priceHistory && Array.isArray(priceHistory)
		? priceHistory.map((priceInfo: IHistorical) => candleForm(priceInfo)) 
		: undefined	
}

export function Chart () {

	const { coinId } = useCoinData()
	const fetchCoinHistory = () => {
		const endDate = Math.floor(Date.now() / 1000);
		const daysBefore = (days: number) => {
			const seconds = 60, minutes = 60, hours = 24
			return [days, hours, minutes, seconds].reduce((total, num) => total * num)
		}
		const startDate = endDate - daysBefore(7) + 10
		const fetchHistory = fetcher(baseUrlForCoin('infos')!)
		return fetchHistory([`${coinId}`, 'ohlcv', `historical?start=${startDate}&end=${endDate}`])
	}
	const { isLoading, data: coinHistory } = useQuery<IHistorical[]>(
		["ohlcv", coinId], 
		() => unknownToType<IHistorical[]>(fetchCoinHistory())
	)

	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<ApexChart
					type="candlestick"
					series={[
						{
							name: "Price",
							data: makeCandleData(coinHistory!) ?? []
						},
					]}
					options={{
						theme: {
              mode: "dark",
            },
						grid: { show: false },
						chart: {
							height: 300,
							width: 500,
							background: "transparent",
							toolbar: {
                show: false,
              },
						},
						title: {
							text: 'CandleStick Coin Chart',
							align: 'left'
						},
						xaxis: {
							type: 'datetime'
						},
						yaxis: {
							show: false
						}
					}}
				/>
			)}
		</div>
	);
}
