import React, { Component } from "react";
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./App.css";

am4core.useTheme(am4themes_animated);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrency: "INR",
      toCurrency: "USD",
      rates: [],
      currencyname: [],
      amount: 0,
    };
  }

  componentDidMount() {
    this.callapi(this.state.fromCurrency);
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.data = [
      {
        currency: "AUD",
        rate: "0.0183931211",
      },
      {
        currency: "BGN",
        rate: "0.0218975324",
      },
      {
        currency: "BRL",
        rate: "0.0729040709",
      },
      {
        currency: "CAD",
        rate: "0.0175646021",
      },
      {
        currency: "CHF",
        rate: "0.0121042143",
      },
      {
        currency: "CNY",
        rate: "0.0923373192",
      },
      {
        currency: "CZK",
        rate: "0.2924224103",
      },
      {
        currency: "DKK",
        rate: "0.0833590846",
      },
      {
        currency: "EUR",
        rate: "0.0111962022",
      },
      {
        currency: "GBP",
        rate: "0.0101152089",
      },
      {
        currency: "HKD",
        rate: "0.1035458373",
      },
      {
        currency: "HRK",
        rate: "0.0843387523",
      },
      {
        currency: "HUF",
        rate: "3.9163195844",
      },
      {
        currency: "IDR",
        rate: "197.3468359532",
      },
      {
        currency: "ILS",
        rate: "0.0454241121",
      },
      {
        currency: "INR",
        rate: "1",
      },
      {
        currency: "ISK",
        rate: "1.8137847642",
      },
      {
        currency: "JPY",
        rate: "1.4078104707",
      },

      {
        currency: "KRW",
        rate: "15.7415244749",
      },
      {
        currency: "MXN",
        rate: "0.2953894039",
      },
      {
        currency: "MYR",
        rate: "0.055745891",
      },

      {
        currency: "NOK",
        rate: "0.1180695508",
      },
      {
        currency: "NZD",
        rate: "0.0201184558",
      },
      {
        currency: "PHP",
        rate: "0.6483832684",
      },
      {
        currency: "PLN",
        rate: "0.0491983519",
      },
      {
        currency: "RON",
        rate: "0.0541929777",
      },

      {
        currency: "RUB",
        rate: "0.9804581486",
      },
      {
        currency: "SEK",
        rate: "0.11547763",
      },
      {
        currency: "SGD",
        rate: "0.018225178",
      },
      {
        currency: "THB",
        rate: "0.4173832236",
      },
      {
        currency: "TRY",
        rate: "0.0982858614",
      },
      {
        currency: "USD",
        rate: "0.0133604281",
      },
      {
        currency: "ZAR",
        rate: "0.2297270366",
      },
    ];
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "currency";

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 2;
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "rate";
    series.dataFields.categoryX = "currency";
    series.columns.template.tooltipText = "{valueY} {categoryX}";
  }

  callapi = (fromCurrency) => {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}`)
      .then((resp) => {
        this.setState({
          rates: resp.data["rates"],
          currencyname: Object.keys(resp.data["rates"]).sort(),
        });
      });
  };
  changeFromCurrency = (e) => {
    this.setState({ fromCurrency: e.target.value });
    this.callapi(e.target.value);
  };
  changeToCurrency = (e) => {
    this.setState({
      toCurrency: e.target.value,
    });
  };
  changeamount = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };
  finalresult = (amount, tocurr, rate) => {
    return Number.parseFloat(amount * rate[tocurr]).toFixed(5);
  };
  render() {
    const result = this.finalresult(
      this.state.amount,
      this.state.toCurrency,
      this.state.rates
    );
    return (
      <div className="mainDiv">
        <div className="currencyConvertorDiv">
          <div className="header">
            <h1>Currency Convertor</h1>
          </div>
          <div className="body">
            <div className="formGroup">
              <label>Convert from: {this.state.fromCurrency}</label>
              <select
                value={this.state.fromCurrency}
                onChange={this.changeFromCurrency}
              >
                {this.state.currencyname.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="formGroup">
              <label>Convert to: {this.state.toCurrency}</label>
              <select
                value={this.state.toCurrency}
                onChange={this.changeToCurrency}
              >
                {this.state.currencyname.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="formGroup">
              <label>Amount:</label>
              <input
                type="text"
                defaultValue={this.state.amount}
                onChange={this.changeamount}
              ></input>

              <label>
                {result} {this.state.toCurrency}
              </label>
            </div>
          </div>
        </div>
        <div className="rightDiv">
          <div className="header">
            <h1>Currency Graph</h1>
          </div>
          <div id="chartdiv" className="graphDiv"></div>
        </div>
      </div>
    );
  }
}
