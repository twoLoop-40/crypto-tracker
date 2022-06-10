export interface RouteParams {
	coinId: string;
}

const coin = {
	id: "btc-bitcoin",
	name: "Bitcoin",
	symbol: "BTC",
	rank: 1,
	is_new: false,
	is_active: true,
	type: "coin",
}

export type ICoin = typeof coin

const ticker = {
	"id":	"btc-bitcoin",
	"name":"Bitcoin",
	"symbol":"BTC",
	"rank":1,
	"circulating_supply":19062338,
	"total_supply":19062344,
	"max_supply":21000000,
	"beta_value":0.946825,
	"first_data_at":"2010-07-17T00:00:00Z",
	"last_updated":"2022-06-09T00:57:39Z",
	"quotes":{
		"USD":{
			"price":30244.22525735926,
			"volume_24h":30534044020.089577,
			"volume_24h_change_24h":-22.78,
			"market_cap":576525644404,
			"market_cap_change_24h":-2.68,
			"percent_change_15m":0.36,
			"percent_change_30m":0.29,
			"percent_change_1h":0.09,
			"percent_change_6h":0.25,
			"percent_change_12h":-0.18,
			"percent_change_24h":-2.69,
			"percent_change_7d":1.27,
			"percent_change_30d":-2.58,
			"percent_change_1y":-19.06,
			"ath_price":68692.137036932,
			"ath_date":"2021-11-10T16:51:15Z",
			"percent_from_price_ath":-55.97
		}
	}
}

export type ITicker = typeof ticker

export interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

export interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export type ISetStateAction <T> = React.Dispatch<React.SetStateAction<T>>

export class StateCarrier <T> {
  constructor(public stateAction?: ISetStateAction<T>) {}
  addStateAction (stateAction : ISetStateAction<T>) {
    this.stateAction = stateAction
  }
  emitStateAction () {
    return this.stateAction
  }
}