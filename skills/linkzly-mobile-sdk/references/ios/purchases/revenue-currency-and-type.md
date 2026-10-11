<!-- Generated from https://docs.linkzly.com/docs/sdk-tracking-purchases#revenue-currency-and-type by linkzly-document/scripts/build-agent-kit.mjs. Do not edit: change the docs page and regenerate. -->
# Revenue, currency and type

Source: https://docs.linkzly.com/docs/sdk-tracking-purchases#revenue-currency-and-type

- `revenue` is the amount charged for the transaction as a positive number in `currency`. Read the price from the store product, as in the samples, rather than from text on your own screen. Linkzly adds `revenue` up as you send it. It does not multiply it by `quantity`, so for several units send the total.
- `currency` must be one of these 43 codes: USD, EUR, GBP, JPY, CNY, INR, CAD, AUD, BRL, MXN, RUB, KRW, SGD, HKD, CHF, SEK, NOK, DKK, PLN, TRY, ZAR, AED, SAR, THB, IDR, MYR, PHP, VND, NGN, EGP, ILS, NZD, CZK, HUF, RON, CLP, COP, ARS, TWD, UAH, PKR, BDT, KES. A purchase in any other currency is rejected.
- Amounts are normalised to USD for analysis at the event-date exchange rate. How the console displays money is a per-app setting described under Reporting Currency on the [Revenue & LTV](https://docs.linkzly.com/docs/revenue-ltv) page.
- `revenueType` is `iap` for one-time purchases, `subscription` for paid starts and renewals, or `other`. If you leave it out it is `iap`. The Revenue rollups group `iap` and `subscription` separately and put everything else under other.
- A purchase with an amount above 100,000 or a timestamp older than 30 days is accepted and flagged, not rejected.
