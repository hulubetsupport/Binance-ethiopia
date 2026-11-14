/**
 * Commission and conversion math using integer cents to avoid floating-point drift.
 */
(function (global) {
  function calcOrder(usdt, price, percent = 3) {
    const grossCents = Math.round(Number(((Number(usdt) || 0) * 100).toFixed(6)));
    const pct = Number(percent) || 0;

    // Half-up rounding in cents
    const feeCents = Math.round(Number(((grossCents * pct) / 100).toFixed(6)));
    const netCents = grossCents - feeCents;

    const gross = grossCents / 100;
    const fee = feeCents / 100;
    const net = netCents / 100;

    const priceCents = Math.round(Number(((Number(price) || 0) * 100).toFixed(6)));
    const etbCents = Math.round(Number(((grossCents * priceCents) / 100).toFixed(6)));
    const etbTotal = etbCents / 100;

    return { gross, fee, net, etbTotal };
  }

  global.calcOrder = calcOrder;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calcOrder };
  }
})(typeof window !== 'undefined' ? window : globalThis);
