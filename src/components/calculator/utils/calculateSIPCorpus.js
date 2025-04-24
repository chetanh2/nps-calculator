export default function calculateSIPCorpus(monthlySIP, annualRate, years) {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  let corpus = 0;

  for (let i = 0; i < months; i++) {
    corpus += monthlySIP * Math.pow(1 + monthlyRate, months - i);
  }

  return Math.ceil(corpus);
}
