import { useCoinData } from "./Coin"
import ApexChart from "react-apexcharts";
import { priceChangeModel } from "../apis/UserTypes";


export function Price () {
	const { tickersData } = useCoinData()
	const { series, options } = priceChangeModel(tickersData)
	return (
	 <div>
		 {<ApexChart type="bar" series={series} options={options}
		 />}

	 </div>
	)
}