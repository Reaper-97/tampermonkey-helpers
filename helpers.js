/*NOTE - Updated 28.08.2026 03:15*/

const RESOURCE_LANGUAGE = "DE";

const shipInfo = [
  { Name: "Light Fighter", Metal: 3_000, Crystal: 1_000, Deuterium: 0 },
  { Name: "Heavy Fighter", Metal: 6_000, Crystal: 4_000, Deuterium: 0 },
  { Name: "Cruiser", Metal: 20_000, Crystal: 7_000, Deuterium: 2_000 },
  { Name: "Battleship", Metal: 45_000, Crystal: 15_000, Deuterium: 0 },
  { Name: "Battle Cruiser", Metal: 36_000, Crystal: 48_000, Deuterium: 9_000 },
  { Name: "Planet Bomber", Metal: 50_000, Crystal: 25_000, Deuterium: 15_000 },
  { Name: "Destroyer", Metal: 72_000, Crystal: 56_000, Deuterium: 8_000 },
  { Name: "Reaper", Metal: 100_000, Crystal: 65_000, Deuterium: 10_000 },
  { Name: "Galleon", Metal: 380_000, Crystal: 280_000, Deuterium: 20_000 },
  {
    Name: "Death Star",
    Metal: 5_000_000,
    Crystal: 4_000_000,
    Deuterium: 100_000,
  },
  { Name: "Falcon", Metal: 7_200_000, Crystal: 3_600_000, Deuterium: 800_000 },
  {
    Name: "Avatar",
    Metal: 32_800_000,
    Crystal: 18_000_000,
    Deuterium: 2_000_000,
  },
  { Name: "Solar Satellite", Metal: 0, Crystal: 2_000, Deuterium: 500 },
  { Name: "Crawler", Metal: 30_000, Crystal: 20_000, Deuterium: 5_000 },
  { Name: "Spy Probe", Metal: 0, Crystal: 1_000, Deuterium: 0 },
  { Name: "Light Cargo", Metal: 2_000, Crystal: 2_000, Deuterium: 0 },
  { Name: "Heavy Cargo", Metal: 6_000, Crystal: 6_000, Deuterium: 0 },
  { Name: "Recycler", Metal: 10_000, Crystal: 6_000, Deuterium: 2_000 },
  { Name: "Colony Ship", Metal: 10_000, Crystal: 20_000, Deuterium: 10_000 },
  { Name: "Asteroid Miner", Metal: 40_000, Crystal: 20_000, Deuterium: 8_000 },
];

const SUFFIX_TABLE = {
  EN: [
    { value: 1e63, short: "Vg", long: "vigintillion" },
    { value: 1e60, short: "Nd", long: "novemdecillion" },
    { value: 1e57, short: "Od", long: "octodecillion" },
    { value: 1e54, short: "Sed", long: "septendecillion" },
    { value: 1e51, short: "Sd", long: "sexdecillion" },
    { value: 1e48, short: "Qid", long: "quindecillion" },
    { value: 1e45, short: "Qad", long: "quattuordecillion" },
    { value: 1e42, short: "Td", long: "tredecillion" },
    { value: 1e39, short: "Dd", long: "duodecillion" },
    { value: 1e36, short: "Ud", long: "undecillion" },
    { value: 1e33, short: "Dc", long: "decillion" },
    { value: 1e30, short: "No", long: "nonillion" },
    { value: 1e27, short: "Oc", long: "octillion" },
    { value: 1e24, short: "Sp", long: "septillion" },
    { value: 1e21, short: "Sx", long: "sextillion" },
    { value: 1e18, short: "Qi", long: "quintillion" },
    { value: 1e15, short: "Qa", long: "quadrillion" },
    { value: 1e12, short: "T", long: "trillion" },
    { value: 1e9, short: "B", long: "billion" },
    { value: 1e6, short: "M", long: "million" },
    { value: 1e3, short: "K", long: "thousand" },
  ],

  DE: [
    { value: 1e63, short: "Dezd", long: "Dezilliarde" },
    { value: 1e60, short: "Dez", long: "Dezillion" },
    { value: 1e57, short: "Nond", long: "Nonilliarde" },
    { value: 1e54, short: "Non", long: "Nonillion" },
    { value: 1e51, short: "Oktd", long: "Oktilliarde" },
    { value: 1e48, short: "Okt", long: "Oktillion" },
    { value: 1e45, short: "Septd", long: "Septilliarde" },
    { value: 1e42, short: "Sept", long: "Septillion" },
    { value: 1e39, short: "Sextd", long: "Sextilliarde" },
    { value: 1e36, short: "Sext", long: "Sextillion" },
    { value: 1e33, short: "Qintd", long: "Quintilliarde" },
    { value: 1e30, short: "Quint", long: "Quintillion" },
    { value: 1e27, short: "Qdrd", long: "Quadrilliarde" },
    { value: 1e24, short: "Quad", long: "Quadrillion" },
    { value: 1e21, short: "Trd", long: "Trilliarde" },
    { value: 1e18, short: "T", long: "Trillion" },
    { value: 1e15, short: "Brd", long: "Billiarde" },
    { value: 1e12, short: "B", long: "Billion" },
    { value: 1e9, short: "Mrd", long: "Milliarde" },
    { value: 1e6, short: "M", long: "Million" },
    { value: 1e3, short: "Tsd", long: "Tausend" },
  ],
};

const Misc = {
  showToast(message, duration = 3000) {
    let toast = document.getElementById("tm-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "tm-toast";

      Object.assign(toast.style, {
        position: "fixed",
        top: "10px",
        left: "10px",
        background: "#333",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "6px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        zIndex: "999999",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        opacity: "0",
        transition: "opacity 0.3s ease",
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => {
      toast.style.opacity = "0";
    }, duration);
  },

  statusMsg(title, msg) {
    console.log(
      `%c${title || ""}\n%c${msg}`,
      "font-weight: bold; color: #0dd8d8; text-decoration: underline;",
      "color: #ceb73f;",
    );
  },

  formatNumber(num, longSuffix = false) {
    let value = num;
    let suffix = "";

    const table = SUFFIX_TABLE[RESOURCE_LANGUAGE] || SUFFIX_TABLE.EN;

    for (const item of table) {
      if (num >= item.value) {
        value = (num / item.value).toFixed(3);
        suffix = longSuffix ? item.long : item.short;
        break;
      }
    }

    value = String(value).replace(/\.?0+$/, "");

    if (suffix) {
      suffix = " " + suffix;
    }

    return value + suffix;
  },

  formatNumberFixedWidth(num, longSuffix = false) {
    let value = num;
    let suffix = "";

    const table = SUFFIX_TABLE[RESOURCE_LANGUAGE] || SUFFIX_TABLE.EN;

    for (const item of table) {
      if (num >= item.value) {
        value = (num / item.value).toFixed(3);
        suffix = longSuffix ? item.long : item.short;
        break;
      }
    }

    value = String(value).replace(/\.?0+$/, "");

    if (suffix) {
      suffix = " " + suffix;
    }

    return value.padStart(7, "\u00A0") + suffix;
  },

  formatSmallNumber(num) {
    if (num < 1000) {
      return String(num);
    }

    if (num < 10000) {
      return Math.floor(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return Misc.formatNumber(num);
  },

  parseNumber(text) {
    const raw = String(text).replace(/[^\d]/g, "");
    const value = Number(raw);
    return isNaN(value) ? null : value;
  },

  capitalizeFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  getShipCost(shipName, amount = 1) {
    const ship = shipInfo.find(
      (s) => s.Name.toLowerCase() === shipName.toLowerCase(),
    );

    if (!ship) {
      return {};
    }

    return {
      metal: ship.Metal * amount,
      crystal: ship.Crystal * amount,
      deuterium: ship.Deuterium * amount,
    };
  },

  /*
   Example:
const resources = {
    metal: 1000,
    crystal: 500,
    deuterium: 200
};

console.log(calculateMSU(resources));
 Output: 2350 MSU
*/
  calculateMSU({ metal = 0, crystal = 0, deuterium = 0 }) {
    const metalValue = 1;
    const crystalValue = 3 / 2; // 1 crystal = 1.5 metal
    const deuteriumValue = 3; // 1 deuterium = 3 metal

    return (
      metal * metalValue + crystal * crystalValue + deuterium * deuteriumValue
    );
  },

  calculateLoot(waves, baseAmount, precision = 6) {
    const resourcesLeft = baseAmount * Math.pow(0.5, waves);
    const percentageLeft = Math.pow(0.5, waves) * 100;
    const percentageLooted = 100 - percentageLeft;

    return {
      resourcesLeft: Math.round(resourcesLeft),
      percentageLooted,
      percentageLeft,
      percentageLootedFormatted: percentageLooted.toFixed(precision) + "%",
      percentageLeftFormatted: percentageLeft.toFixed(precision) + "%",
    };
  },
}; //END Misc

/*
const toast = new ToastLog({
  maxMessages: 20,
  duration: 10000,
  style: {
    top: "50px",
    left: "auto",
    right: "20px",
    width: "500px",
    maxHeight: "400px"
  }
});
*/
class ToastLog {
  constructor(options = {}) {
    this.maxMessages = options.maxMessages ?? 10;
    this.duration = options.duration ?? 5000;

    this.style = {
      top: "10px",
      left: "10px",
      width: "300px",
      maxHeight: "250px",

      // defaults
      background: "#333",
      color: "#fff",
      padding: "10px",
      borderRadius: "6px",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      zIndex: "999999",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",

      // allow overrides
      ...(options.style ?? {}),
    };

    this.toast = null;
    this.hideTimer = null;

    this.create();
  }

  create() {
    this.toast = document.createElement("div");
    this.toast.id = "tm-toast";

    Object.assign(this.toast.style, {
      position: "fixed",
      overflowY: "auto",
      transition: "opacity 0.3s ease",
      opacity: "0",

      ...this.style,
    });

    document.body.appendChild(this.toast);
  }

  show(message) {
    const entry = document.createElement("div");

    Object.assign(entry.style, {
      padding: "6px 0",
      borderBottom: "1px solid rgba(255,255,255,0.15)",
    });

    entry.textContent = message;

    this.toast.appendChild(entry);

    while (this.toast.children.length > this.maxMessages) {
      this.toast.removeChild(this.toast.firstChild);
    }

    this.toast.style.opacity = "1";

    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.toast.style.opacity = "0";
    }, this.duration);

    this.toast.scrollTop = this.toast.scrollHeight;
  }

  clear() {
    this.toast.innerHTML = "";
  }
}
