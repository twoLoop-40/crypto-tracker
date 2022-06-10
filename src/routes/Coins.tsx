import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { baseUrlForCoin, fetcher, unknownToType } from "../apis/fetchers";
import { ICoin } from "../apis/UserTypes";
import { themeCarrier } from "../App";
import { Coin, CoinsList, Container, Header, Img, Title } from "../styles/components"

const fetchCoins = fetcher(baseUrlForCoin('infos')!)

function Coins () {
	const setTheme = themeCarrier.emitStateAction()!
	const changeMode = () => setTheme((mode: boolean) => !mode)
	const makeCoinLi = (coin: ICoin) => {
		return <Coin key={coin.id}>
			<Link to={`/${coin.id}`}>
        <Img src={`${baseUrlForCoin('icons')}/${coin.symbol.toLowerCase()}`} />
        {coin.id} &#10147;
      </Link>
		</Coin>
	}
	const makeCoinsListUl = (coins: ICoin | ICoin[]) => 
		!Array.isArray(coins)
		? [makeCoinLi(coins)]
		: <CoinsList>
			{coins.slice(0, 100).flatMap(coin => makeCoinsListUl(coin))}
		</CoinsList>
  const { isLoading, data: coins } = useQuery<ICoin[]>("allCoins", () => unknownToType<ICoin[]>(fetchCoins()))
	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title onClick={changeMode}>코인</Title>
			</Header>
			{ isLoading
        ? "Loading ..."
        : coins
        ? makeCoinsListUl(coins)
        : "No Data!"}
		</Container>
		
	)
}

export default Coins
