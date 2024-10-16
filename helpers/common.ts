// export function convertPersianCurrency(number: number): string {
//     if (number >= 1 && number < 10000) return `${number} تومان`;
//     if (number >= 10000 && number < 1000000)
//       return `${number % 1000 !== 0 ? Math.floor(number % 1000) : Math.floor(number / 1000)} هزار تومان`;
//     if (number >= 1000000 && number < 1000000000)
//       return `${number % 1000000 !== 0 ? Math.floor(number / 1000000) : Math.floor(number / 1000000)} میلیون تومان`;
//     if (number >= 1000000000) {
//       const outOfPlace = number / 1000000000;
//       const rest = number % 1000000000;
//       const newnumber = Math.floor(outOfPlace);
//       if (rest === 0) return `${number / 1000000000} میلیارد تومان`;
//       if (rest !== 0) return `${newnumber} میلیارد و ${Math.floor(rest / 1000000)} میلیون تومان`;
//     }
//     return '';
//   }

export function convertPersianCurrency(number: number): string {
  const numberAbs = Math.abs(number)
  if (numberAbs >= 1 && numberAbs < 1000) return `${number > 0 ? number : `${-number}-`} هزار تومان`
  if (numberAbs >= 1000 && numberAbs < 1000000)
    return `${number > 0 ? number / 1000 : `${-number / 1000}-`} میلیون تومان`
  return number.toString()
}

export function b64UrlToJson(b64url: string): Record<string, unknown> {
  try {
    const base64Decoded = atob(b64url)

    return Object.fromEntries(new URLSearchParams(base64Decoded).entries())
  } catch {
    console.error("Error parsing b64url to JSON.")

    return {}
  }
}

export function jsonToB64Url(json: Record<string, string>): string {
  try {
    const jsonEncoded = new URLSearchParams(json).toString()
    const base64URLEncoded = btoa(jsonEncoded)

    return base64URLEncoded.replace(/=+$/, "")
  } catch {
    console.error("Error converting JSON to b64url.")

    return ""
  }
}

export const avatarColor = (str: string) => {
  const colors = [
    "bg-slate-800",
    "bg-red-800",
    "bg-orange-800",
    "bg-amber-800",
    "bg-yellow-800",
    "bg-lime-800",
    "bg-green-800",
    "bg-emerald-800",
    "bg-teal-800",
    "bg-cyan-800",
    "bg-sky-800",
    "bg-blue-800",
    "bg-indigo-800",
    "bg-violet-800",
    "bg-purple-800",
    "bg-fuchsia-800",
    "bg-pink-800",
    "bg-rose-800",
  ]
  // return colors[Math.floor(Math.random() * colors.length)]

  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Convert hash to index
  const index = Math.abs(hash % colors.length)

  return `${colors[index]} text-slate-50`
}

export const faNumToEn = (value: string) =>
  value.replace(/([۰-۹])/g, (token: string) => String.fromCharCode(token.charCodeAt(0) - 1728))

function removePhonePrefix(phoneNumber: string): string {
  if (phoneNumber.startsWith("0")) {
    return phoneNumber.substring(1)
  } else if (phoneNumber.startsWith("+98")) {
    return phoneNumber.substring(3)
  } else {
    return phoneNumber
  }
}

export const normalizePhone = (phoneNumber: string): string => removePhonePrefix(faNumToEn(phoneNumber))

export function bytesToGB(bytes: number): number {
  const gigabyte = 1024 * 1024 * 1024 // 1 gigabyte = 1024 megabytes * 1024 kilobytes * 1024 bytes
  return bytes / gigabyte
}

export function roundTo(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(number * factor) / factor
}

export function floorTo(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.floor(number * factor) / factor
}

export function ceilTo(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces)

  return Math.ceil(number * factor) / factor
}

export function copyText(text: string) {
  if (navigator.clipboard) {
    // Clipboard API method
    return navigator.clipboard.writeText(text)
  } else {
    const copyTextarea = document.createElement("textarea")
    copyTextarea.textContent = text
    copyTextarea.style.position = "fixed"
    copyTextarea.style.opacity = "0"
    document.body.appendChild(copyTextarea)
    copyTextarea.select()
    copyTextarea.setSelectionRange(0, 99999)
    document.execCommand("copy")
    document.body.removeChild(copyTextarea)
  }
}

export function removeWWW(domain: string): string {
  if (domain.startsWith("www.")) {
    return domain.substring(4)
  }
  return domain
}

export function formatSecondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const formattedMinutes = minutes.toString().padStart(2, "0")
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0")
  return `${formattedMinutes}:${formattedSeconds}`
}
