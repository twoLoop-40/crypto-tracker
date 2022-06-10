import { useQuery } from "react-query"
import { Link, Outlet, useMatch, useOutletContext, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { baseUrlForCoin, fetcher, unknownToType } from "../apis/fetchers"
import { InfoData, ITicker, RouteParams } from "../apis/UserTypes"
import { Container, Description, Header,  
	Overview, OverviewItem, RollBackButton, 
	Tab, Tabs, Title } from "../styles/components"
import { themeCarrier } from "../App"
import { dayAndNight } from "../apis/customApi"


const fetchCoinInfo = fetcher(baseUrlForCoin('infos')!)
const fetchTickersInfo = fetcher(baseUrlForCoin('tickers')!)

type ContextType = {
	coinId: string;
	tickersData: ITicker;
}

function Coin () {
	const setTheme = themeCarrier.emitStateAction()!
	const mode = themeCarrier.emitCurrentState()!
	const changeMode = () => setTheme((mode: boolean) => !mode)
	const { coinId } = useParams<keyof RouteParams>()
	const { isLoading: infoLoading, data: infoData } = useQuery(
		["info", coinId],
		() => unknownToType<InfoData>(fetchCoinInfo([coinId ?? '']))
	)
	const { isLoading: tickersLoading, data: tickersData } = useQuery(
		["tickers", coinId],
 		() => unknownToType<ITicker>(fetchTickersInfo([coinId ?? ''])),
		 {
			 refetchInterval: 5000
		 }
	)
	const loading = infoLoading || tickersLoading

	const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
	
	return (
		<>
		<RollBackButton onClick={changeMode}>{dayAndNight(mode)}</RollBackButton>
		
		<Container>
			<Helmet>
				<title>
					{loading? "Loading...": infoData?.name}
				</title>
			</Helmet>
			<Header>
				<Title>
					<Link to="/">
						<RollBackButton>&#10094;</RollBackButton>
					</Link>
					<span>{loading? "Loading...": infoData?.name}</span>
				</Title>
			</Header>
		<>
			{ loading
				? "Loading ..."
				: (
					<>
						<Overview>
							<OverviewItem>
								<span>Rank:</span>
								<span>{infoData?.rank}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Symbol:</span>
								<span>${infoData?.symbol}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Price:</span>
								<span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
							</OverviewItem>
						</Overview>
						<Description>{infoData?.description}</Description>
						<Overview>
							<OverviewItem>
								<span>Total Suply:</span>
								<span>{tickersData?.total_supply}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Max Supply:</span>
								<span>{tickersData?.max_supply}</span>
							</OverviewItem>
						</Overview>
						<Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          	</Tabs>
						<Outlet context={{coinId, tickersData}}/>
					</>				
				)
			}
		</>
	</Container>
	</>
	)
}
export function useCoinData () {
	return useOutletContext<ContextType>()
}
export default Coin
