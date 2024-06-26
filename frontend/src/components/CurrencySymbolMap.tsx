interface CurrencySymbolMap {
    [key: string]: {
      symbol: string;
      denom: number;
    };
}

const currencySymbolMap:CurrencySymbolMap = {
  "USD": {"symbol": "$", "denom": -2},
  "EUR": {"symbol": "€", "denom": -2},
  "JPY": {"symbol": "¥", "denom": 0},
  "GBP": {"symbol": "£", "denom": -2},
  "AUD": {"symbol": "A$", "denom": -2},
  "CAD": {"symbol": "C$", "denom": -2},
  "CHF": {"symbol": "CHF", "denom": -2},
  "CNY": {"symbol": "CN¥", "denom": -2},
  "SEK": {"symbol": "kr", "denom": -2},
  "NZD": {"symbol": "NZ$", "denom": -2},
  "KRW": {"symbol": "₩", "denom": 0},
  "SGD": {"symbol": "S$", "denom": -2},
  "NOK": {"symbol": "kr", "denom": -2},
  "MXN": {"symbol": "MX$", "denom": -2},
  "INR": {"symbol": "₹", "denom": -2},
  "RUB": {"symbol": "₽", "denom": -2},
  "ZAR": {"symbol": "R", "denom": -2},
  "BRL": {"symbol": "R$", "denom": -2},
  "TRY": {"symbol": "₺", "denom": -2},
  "HKD": {"symbol": "HK$", "denom": -2},
  "PLN": {"symbol": "zł", "denom": -2},
  "DKK": {"symbol": "kr", "denom": -2},
  "THB": {"symbol": "฿", "denom": -2},
  "IDR": {"symbol": "Rp", "denom": -2},
  "HUF": {"symbol": "Ft", "denom": -2},
  "CZK": {"symbol": "Kč", "denom": -2},
  "ISK": {"symbol": "kr", "denom": 0},
  "PHP": {"symbol": "₱", "denom": -2},
  "MYR": {"symbol": "RM", "denom": -2},
  "HRK": {"symbol": "kn", "denom": -2},
  "RON": {"symbol": "lei", "denom": -2},
  "ILS": {"symbol": "₪", "denom": -2},
  "CLP": {"symbol": "CLP$", "denom": -2},
  "COP": {"symbol": "COL$", "denom": -2},
  "ARS": {"symbol": "AR$", "denom": -2},
  "PEN": {"symbol": "S/.", "denom": -2},
  "VND": {"symbol": "₫", "denom": 0},
  "UAH": {"symbol": "₴", "denom": -2},
  "AED": {"symbol": "د.إ", "denom": -2},
  "SAR": {"symbol": "ر.س", "denom": -2},
  "QAR": {"symbol": "ر.ق", "denom": -2},
  "NGN": {"symbol": "₦", "denom": -2},
  "BDT": {"symbol": "৳", "denom": -2},
  "LKR": {"symbol": "රු", "denom": -2},
  "KES": {"symbol": "Ksh", "denom": -2},
  "EGP": {"symbol": "£", "denom": -2},
  "MAD": {"symbol": "د.م.", "denom": -2},
  "PKR": {"symbol": "₨", "denom": -2},
  "IQD": {"symbol": "ع.د", "denom": -2},
  "DZD": {"symbol": "د.ج", "denom": -2},
  "TWD": {"symbol": "NT$", "denom": -2},
  "KWD": {"symbol": "د.ك", "denom": -3},
  "CRC": {"symbol": "₡", "denom": -2},
  "PYG": {"symbol": "₲", "denom": -2},
  "BHD": {"symbol": "ب.د", "denom": -3},
  "OMR": {"symbol": "ر.ع.", "denom": -3},
  "JOD": {"symbol": "د.ا", "denom": -3},
  "LBP": {"symbol": "ل.ل", "denom": -3},
  "TZS": {"symbol": "TSh", "denom": -2},
  "LYD": {"symbol": "ل.د", "denom": -2},
  "UYU": {"symbol": "$U", "denom": -2},
  "ETB": {"symbol": "Br", "denom": -2},
  "GHS": {"symbol": "₵", "denom": -2},
  "YER": {"symbol": "﷼", "denom": -2},
  "NPR": {"symbol": "रू", "denom": -2},
  "BOB": {"symbol": "Bs", "denom": -2},
  "SDG": {"symbol": "ج.س.", "denom": -3},
  "TND": {"symbol": "د.ت", "denom": -3},
  "DOP": {"symbol": "RD$", "denom": -2},
  "KZT": {"symbol": "₸", "denom": -2},
  "UZS": {"symbol": "so'm", "denom": 0},
  "RSD": {"symbol": "дин.", "denom": -2},
  "MKD": {"symbol": "ден", "denom": -2},
  "CUC": {"symbol": "CUC$", "denom": -2},
  "XAF": {"symbol": "FCFA", "denom": -2},
  "XOF": {"symbol": "CFA", "denom": -2},
  "XCD": {"symbol": "EC$", "denom": -2},
  "XPF": {"symbol": "₣", "denom": -2},
  "XAU": {"symbol": "oz t", "denom": 0},
  "XAG": {"symbol": "oz", "denom": 0},
  "XPT": {"symbol": "oz t", "denom": 0},
  "XPD": {"symbol": "oz t", "denom": 0}
}
;

  export default currencySymbolMap;
