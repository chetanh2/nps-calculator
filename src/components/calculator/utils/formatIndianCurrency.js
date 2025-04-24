export default function formatIndianCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    // style: "currency",
    currency: "INR",
  }).format(amount);
}
