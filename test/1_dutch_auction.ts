const  { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");


const { ethers } = require("hardhat");

const { run } = require("./shared")

describe('Dutch Auction', async function () {
  let accounts = [];
  this.beforeAll(async () => {
    accounts  = await ethers.getSigners();
  })

  it("creates a dutch auction", async function () {
    await run(accounts, {
      type:                "dutch",
      reservePrice:        500,
      biddingTimePeriod:   10,
      offerPriceDecrement: 25,
      actions: [

      ],
    });
  });
  it("rejects a low bid", async function () {
    await run(accounts ,  {
      type:                "dutch",
      reservePrice:        500,
      biddingTimePeriod:   10,
      offerPriceDecrement: 25,
      actions: [
        { block: 1, action: "bid", account: 1, payment: 450, succeed: false, on_error: "Low bid accepted" },
      ],
    });
  });

  it("accepts good bid", async function () {
    await run(accounts, {
      type:                "dutch",
      reservePrice:        500,
      biddingTimePeriod:   10,
      offerPriceDecrement: 25,
      actions: [
        { block: 1, action: "bid", account: 1, payment: 725, succeed: true, on_error: "Valid bid rejected" },
      ],
    });
  });

  it("rejects second bid", async function () {
    await run(accounts,  {
      type:                "dutch",
      reservePrice:        500,
      biddingTimePeriod:   10,
      offerPriceDecrement: 25,
      actions: [
        { block: 1, action: "bid", account: 1, payment: 725, succeed: true,  on_error: "Valid bid rejected" },
        { block: 2, action: "bid", account: 2, payment: 750, succeed: false, on_error: "Second bid accepted" },
      ],
    });
  });

    it("ACCPET BID", async function () {
      await run(accounts,  {
        type:                "dutch",
        reservePrice:        500,
        biddingTimePeriod:   10,
        offerPriceDecrement: 25,
        actions: [
          { block: 1, action: "bid",      account: 1, payment: 725, succeed: true, on_error: "Valid bid accepted" },
        ],
      });
    });

    it("rejects a bid after the last round", async function () {
      await run(accounts, {
        type:                "dutch",
        reservePrice:        500,
        biddingTimePeriod:   10,
        offerPriceDecrement: 25,
        actions: [
          { block: 10, action: "bid", account: 1, payment: 750, succeed: false, on_error: "Invalid bid accepted" },
        ],
      });
    });

  });

