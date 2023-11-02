"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface ServersStatus {
  data?: {
    gecko_says?: string;
    error?: string;
  };
  status?: number;
  statusText?: string;
}

interface ServerStatusError {
  response?: {
    data?: {
      error?: string;
    };
    status?: number;
    statusText?: string;
  };
}

interface MarketData {
  data?: {
    vechain?: {
      usd?: number;
      usd_market_cap?: number;
      usd_24h_vol?: number;
      usd_24h_change?: number;
    };
    "vethor-token"?: {
      usd?: number;
      usd_market_cap?: number;
      usd_24h_vol?: number;
      usd_24h_change?: number;
    };
  };
  status?: number;
  statusText?: string;
}

const Marketdata = () => {
  const [serverStatus, setServerStatus] = useState<ServersStatus>({});
  const [marketdata, setMarketdata] = useState<MarketData>({});

  const updateMarket = async () => {
    setServerStatus({});
    setMarketdata({});
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/ping");
      setServerStatus(response as ServersStatus);
    } catch (error) {
      const err = error as ServerStatusError;
      setServerStatus(err.response as ServersStatus);
      console.log(error);
    }
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=vechain%2Cvethor-token&vs_currencies=usd%2Cusd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=5"
      );
      setMarketdata(response as MarketData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateMarket();
  }, []);

  return (
    <section className="flex flex-col w-full max-w-4xl gap-4 p-2 shadow-lg bg-gray-100 border border-gray-200">
      <button
        onClick={updateMarket}
        className="w-full p-2 bg-gray-100 border border-stone-600 hover:bg-gray-300 transition ease-in-out duration-300"
      >
        Check Data
      </button>
      {serverStatus?.status === 200 ? (
        <p className="w-full text-center bg-green-600">
          Status: {serverStatus?.status} - {serverStatus?.data?.gecko_says}
        </p>
      ) : (
        <p className="w-full text-center bg-red-600">
          Status: {serverStatus?.status} - {serverStatus?.data?.error}
        </p>
      )}
      <section className="grid grid-cols-12 gap-4">
        <table className="table-auto col-span-12 border-separate border-spacing-1">
          <thead>
            <tr>
              <td className="font-semibold">VET</td>
              {marketdata.data?.vechain?.usd_24h_change &&
                marketdata.data?.vechain?.usd_24h_change > 0 && (
                  <td className="text-end font-semibold text-green-600">
                    &uarr;
                    {marketdata.data?.vechain?.usd_24h_change?.toFixed(2)}%
                  </td>
                )}
              {marketdata.data?.vechain?.usd_24h_change &&
                marketdata.data?.vechain?.usd_24h_change < 0 && (
                  <td className="text-end font-semibold text-red-600">
                    &darr;
                    {marketdata.data?.vechain?.usd_24h_change?.toFixed(2)}%
                  </td>
                )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${marketdata.data?.vechain?.usd?.toFixed(4)}</td>
            </tr>
            <tr>
              <td>
                {marketdata.data?.vechain?.usd_market_cap &&
                  Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(marketdata.data?.vechain?.usd_market_cap)}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto col-span-12 border-separate border-spacing-1">
          <thead>
            <tr>
              <td className="font-semibold ">VTHO</td>
              {marketdata.data?.["vethor-token"]?.usd_24h_change &&
                marketdata.data?.["vethor-token"]?.usd_24h_change > 0 && (
                  <td className="text-end font-semibold text-green-600">
                    &uarr;
                    {marketdata.data?.["vethor-token"]?.usd_24h_change?.toFixed(
                      2
                    )}
                    %
                  </td>
                )}
              {marketdata.data?.["vethor-token"]?.usd_24h_change &&
                marketdata.data?.["vethor-token"]?.usd_24h_change < 0 && (
                  <td className="text-end font-semibold text-red-600">
                    &darr;
                    {marketdata.data?.["vethor-token"]?.usd_24h_change?.toFixed(
                      2
                    )}
                    %
                  </td>
                )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${marketdata.data?.["vethor-token"]?.usd?.toFixed(5)}</td>
            </tr>
            <tr>
              <td>
                {marketdata.data?.["vethor-token"]?.usd_market_cap &&
                  Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(marketdata.data?.["vethor-token"]?.usd_market_cap)}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Marketdata;
