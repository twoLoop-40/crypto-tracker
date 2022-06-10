import styled from "styled-components";

export const Title = styled.h1`
	display: flex;
	align-items: center;
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`
export const RollBackButton = styled.button`
	border: 1px;
	font-weight: 200;
	font-size: x-large;
	border-radius: 10px;
	margin-right: 25px;
	margin-bottom: 10px;
	padding: 10px;
	background-color: ${(props) => props.theme.buttonColor};
	&:hover {
		background-color: ${(props) => props.theme.accentColor};
	}
	text-align: center;
	a {
		transition: color 0.2s ease-in;
		padding: 10px;
	}
`
export const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`
export const Header = styled.div`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`
export const CoinsList = styled.ul`
`
export const Coin = styled.li`
	background-color: white;
	color: ${(props) => props.theme.bgColor};
	margin-bottom: 10px;
	border-radius: 15px;
	a {
		align-items: center;
		transition: color 0.3s ease-in;
		display: flex;
		padding: 20px;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor}
		}
	};
`
export const Img = styled.img`
	height: 35px;
	width: 35px;
	margin-right: 10px;	
`
export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
export const Description = styled.p`
  margin: 20px 0px;
`;
export const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

