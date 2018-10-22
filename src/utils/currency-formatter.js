export default function formatCurrency(amount) {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}
