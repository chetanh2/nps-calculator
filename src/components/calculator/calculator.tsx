// Package Imports
import React, { useMemo, useState } from "react";
import { Button, InputNumber, Slider } from "antd";
import type { InputNumberProps } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import barGraphOptions from "./barGraphOptions";
import pieChartOptions from "./pieChartOptions";
import variablePie from "highcharts/modules/variable-pie";
import formatIndianCurrency from "./utils/formatIndianCurrency";
import calculateSIPCorpus from "./utils/calculateSIPCorpus";

const Calculator = (props) => {
  const {handleRegisterClick} = props
  const [investmentValue, setInvestmentValue] = useState(5000);
  const [ageValue, setAgeValue] = useState(25);
  const [retirementAgeValue, setRetirementAgeValue] = useState(60);
  const [returnOnInvestment, setReturnOnInvestment] = useState(10);
  const [purchaseAnnuity, setPurchaseAnnuity] = useState(60);
  const [expectingAnnuityRate, setExpectingAnnuityRate] = useState(6);

  const onInvestmentValueChange: InputNumberProps["onChange"] = (newValue) => {
    setInvestmentValue(newValue as number);
  };
  const onAgeChange: InputNumberProps["onChange"] = (newValue) => {
    setAgeValue(newValue as number);
  };
  const onRetirementChange: InputNumberProps["onChange"] = (newValue) => {
    setRetirementAgeValue(newValue as number);
  };
  const onReturnOnInvestmentChange: InputNumberProps["onChange"] = (
    newValue
  ) => {
    setReturnOnInvestment(newValue as number);
  };
  const onPurchaseAnnuityChange: InputNumberProps["onChange"] = (newValue) => {
    setPurchaseAnnuity(newValue as number);
  };
  const onAnnuityRateChange: InputNumberProps["onChange"] = (newValue) => {
    setExpectingAnnuityRate(newValue as number);
  };

  function calculateYearsToInvest(retirementAgeValue:number, ageValue:number) {
    const result = retirementAgeValue - ageValue;
    return result < 0 ? 0 : result;
  }

  const formatter = (value: any) => `₹ ${formatIndianCurrency(value)}`;
  const parser = (value: any) => value.replace(/\₹\s?|,/g, "");

  const {
    totalInvestedAmount,
    corpusValue,
    annuityValue,
    monthlyPension,
    lumpsumValue,
  } = useMemo(() => {
    const noOfYears = retirementAgeValue - ageValue;
    const value = noOfYears * 12 * investmentValue;

    const corpusValue = calculateSIPCorpus(
      investmentValue,
      returnOnInvestment,
      noOfYears
    );
    const lumpsumPercentage = 100 - purchaseAnnuity;

    const lumpsumValue = (corpusValue * lumpsumPercentage) / 100;

    const annuityValue = (corpusValue / 100) * purchaseAnnuity;

    const monthlyPension = (annuityValue * expectingAnnuityRate) / 100 / 12;

    return {
      totalInvestedAmount: value,
      corpusValue,
      annuityValue,
      monthlyPension,
      lumpsumValue,
    };
  }, [
    ageValue,
    investmentValue,
    retirementAgeValue,
    ageValue,
    returnOnInvestment,
    purchaseAnnuity,
    expectingAnnuityRate,
  ]);
  variablePie(Highcharts);
  // console.log((Highcharts as any).version);

  return (
    <div className="max-w-7xl mx-auto my-12 shadow-xl rounded-xl">
      <h2 className="text-2xl text-center md:text-4xl my-4 md:mb-14">
        Nps Calculator
      </h2>
      <p className="calculate-your-return-text  px-4 font-semibold text-lg md:text-xl">
        Calculate your Returns
      </p>
      <div className="calculator-container md:flex gap-8 justify-between p-8 md:p-8">
        <div className="lg:w-3/12">
          <div>
            <p className="font-semibold text-base ">I want to invest</p>
            <div className="flex gap-4 items-center calculator-input mb-6">
              <InputNumber
                min={500}
                max={500000}
                formatter={formatter}
                parser={parser}
                style={{ margin: "0 16px", width: "45%" }}
                value={investmentValue}
                className="font-medium text-sm"
                onChange={onInvestmentValueChange}
              />

              <p className="px-2 font-medium text-sm">Per month</p>
            </div>
            <Slider
              min={500}
              max={500000}
              onChange={onInvestmentValueChange}
              value={typeof investmentValue === "number" ? investmentValue : 0}
            />
          </div>

          <div className="my-10">
            <p className="font-semibold text-base ">My current age is</p>
            <div className="flex gap-4 justify-between items-center calculator-input">
              <InputNumber
                min={18}
                max={70}
                style={{ margin: "0 16px", width: "45%" }}
                value={ageValue}
                className="font-medium text-sm"
                onChange={onAgeChange}
              />
              <p className="px-6 font-medium text-sm">Years</p>
            </div>
            <Slider
              min={18}
              max={70}
              onChange={onAgeChange}
              value={typeof ageValue === "number" ? ageValue : 0}
            />
          </div>

          <div className="my-10">
            <p className="font-semibold text-base ">My retirement age is</p>
            <div className="flex gap-4 justify-between items-center calculator-input">
              <InputNumber
                min={18}
                max={70}
                style={{ margin: "0 16px", width: "45%" }}
                value={retirementAgeValue}
                className="font-medium text-sm"
                onChange={onRetirementChange}
              />
              <p className="px-6 font-medium text-sm">Years</p>
            </div>
            <Slider
              min={18}
              max={70}
              onChange={onRetirementChange}
              value={
                typeof retirementAgeValue === "number" ? retirementAgeValue : 0
              }
            />
          </div>

          <div className="my-10">
              <p className="font-semibold text-base ">Years left to invest</p>
              <div className="flex gap-4 justify-between items-center calculator-input">
                <InputNumber
                  disabled={true}
                  style={{ margin: "0 16px", width: "45%" }}
                  value={calculateYearsToInvest(retirementAgeValue,ageValue)}
                  className="font-medium text-sm"
                />
              <p className="px-6 font-medium text-sm">Years</p>
            </div>
          </div>

          <div className="my-10">
            <p className="font-semibold text-base ">
              My expected return on investment
            </p>
            <div className="flex w-36 justify-between items-center calculator-input">
              <InputNumber
                min={5}
                max={15}
                style={{ margin: "0 16px", width: "100%" }}
                value={returnOnInvestment}
                className="font-medium text-sm"
                onChange={onReturnOnInvestmentChange}
              />
              <p className="px-4 font-medium text-sm">%</p>
            </div>
            <Slider
              min={5}
              max={15}
              onChange={onReturnOnInvestmentChange}
              value={
                typeof returnOnInvestment === "number" ? returnOnInvestment : 0
              }
            />
          </div>

          <div className="my-10">
            <p className="font-semibold text-base ">
              I want to purchase Annuity for
            </p>
            <div className="flex w-36 justify-between items-center calculator-input">
              <InputNumber
                min={40}
                max={100}
                style={{ margin: "0 16px", width: "100%" }}
                value={purchaseAnnuity}
                className="font-medium text-sm"
                onChange={onPurchaseAnnuityChange}
              />
              <p className="px-4 font-medium text-sm">%</p>
            </div>
            <Slider
              min={40}
              max={100}
              onChange={onPurchaseAnnuityChange}
              value={typeof purchaseAnnuity === "number" ? purchaseAnnuity : 0}
            />
          </div>

          <div className="my-10">
            <p className="font-semibold text-base ">
              I am expecting an Annuity rate of
            </p>
            <div className="flex w-36 items-center calculator-input">
              <InputNumber
                min={5}
                max={15}
                style={{ margin: "0 16px", width: "100%" }}
                value={expectingAnnuityRate}
                className="font-medium text-sm"
                onChange={onAnnuityRateChange}
              />
              <p className="px-4 font-medium text-sm">%</p>
            </div>
            <Slider
              min={5}
              max={15}
              onChange={onAnnuityRateChange}
              value={
                typeof expectingAnnuityRate === "number"
                  ? expectingAnnuityRate
                  : 0
              }
            />
          </div>
        </div>

        <div className="md:rounded-lg md:shadow-xl md:p-6 lg:w-1/2">
          <p className="uppercase text-sm font-semibold tracking-widest calculator-graph-title my-8 text-center">
            Growth of Pension Account at Retirement
          </p>
          <div className="lg:flex justify-center gap-4 my-12 items-center">
            <div className="md:w-full lg:w-1/2">
              <HighchartsReact
                highcharts={Highcharts}
                options={barGraphOptions(totalInvestedAmount, corpusValue)}
              />
            </div>

            <div className="growth-of-pension-account-container px-4">
              <div className="flex justify-between gap-4">
                <p className="flex items-center">
                  <span className="investment-circle-dot mr-2"></span>{" "}
                  Investment
                </p>
                <p className="font-semibold">
                  ₹ {formatIndianCurrency(totalInvestedAmount)}
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <p className="flex items-center">
                  <span className="corpus-circle-dot mr-2"></span>Corpus
                </p>
                <p className="font-semibold">
                  ₹ {formatIndianCurrency(corpusValue)}
                </p>
              </div>
            </div>
          </div>
          <p className="uppercase text-sm font-semibold tracking-widest calculator-graph-title text-center">
            pension Account Split: Lumpsum | annuity
          </p>
          <div className="lg:flex justify-center gap-6 my-12 items-center">
            <div className="md:w-full lg:w-1/2">
              <HighchartsReact
                highcharts={Highcharts}
                options={pieChartOptions(lumpsumValue, annuityValue)}
                // options={optionsTwo}
              />
            </div>
            <div className="growth-of-pension-account-container px-4">
              <div className="flex justify-between gap-4">
                <p className="flex items-center">
                  <span className="lumpsum-circle-dot mr-2"></span> Lumpsum
                </p>
                <p className="font-semibold">
                  ₹ {formatIndianCurrency(Math.round(lumpsumValue))}
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <p className="flex items-center">
                  <span className="annuity-circle-dot mr-2"></span>Annuity
                </p>
                <p className="font-semibold">
                  ₹ {formatIndianCurrency(Math.round(annuityValue))}
                </p>
              </div>
            </div>
          </div>
          <div className="expected-monthly-pension-container py-4 px-6">
            <p className="text-center lg:text-left">
              Your Expected monthly pension will be
            </p>
            <div className="md:flex justify-between items-center">
              <p className="text-lg text-center lg:text-2xl font-medium  md:font-semibold md:my-1">
                ₹ {formatIndianCurrency(Math.round(monthlyPension))}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  className="btn-secondary uppercase lg:px-12 text-xs"
                  htmlType="submit"
                  onClick={handleRegisterClick}
                >
                  Invest in nps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="calculator-disclaimer-text py-8 px-4 md:px-6">
        <p className="font-bold">Disclaimer:</p>
        <p>
          This pension calculator illustrates the tentative Pension and Lump Sum
          amount an NPS subscriber may expect on maturity based on regular
          monthly contributions, percentage of corpus reinvested for purchasing
          annuity and assumed rates in respect of returns on investment and
          annuity selected for.The above calculation and illustration of figures
          are indicative only and not on actual basis.
        </p>
      </div>
    </div>
  );
};

export default Calculator;
