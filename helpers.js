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

const Utils = {
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

  formatNumber(num) {
    if (num >= 1e15)
      return (num / 1e15).toFixed(3).replace(/\.?0+$/, "") + " Q";
    if (num >= 1e12)
      return (num / 1e12).toFixed(3).replace(/\.?0+$/, "") + " T";
    if (num >= 1e9) return (num / 1e9).toFixed(3).replace(/\.?0+$/, "") + " B";
    if (num >= 1e6) return (num / 1e6).toFixed(3).replace(/\.?0+$/, "") + " M";
    if (num >= 1e3) return (num / 1e3).toFixed(3).replace(/\.?0+$/, "") + " K";
    return num.toLocaleString();
  },

  formatNumberFixedWidth(num, longSuffix = false) {
    let value, suffix;

    if (num >= 1e15) {
      value = (num / 1e15).toFixed(3);
      suffix = longSuffix ? " Quadrillion" : " Q";
    } else if (num >= 1e12) {
      value = (num / 1e12).toFixed(3);
      suffix = longSuffix ? " Trillion" : " T";
    } else if (num >= 1e9) {
      value = (num / 1e9).toFixed(3);
      suffix = longSuffix ? " Billion" : " B";
    } else if (num >= 1e6) {
      value = (num / 1e6).toFixed(3);
      suffix = longSuffix ? " Million" : " M";
    } else if (num >= 1e3) {
      value = (num / 1e3).toFixed(3);
      suffix = longSuffix ? " Thousand" : " K";
    } else {
      value = num.toString();
      suffix = "";
    }

    return value.padStart(7, "\u00A0") + suffix;
  },

  getShipCost(shipName) {
    const ship = shipInfo.find(
      (s) => s.Name.toLowerCase() === shipName.toLowerCase(),
    );

    if (!ship) {
      return {};
    }

    return {
      Metal: ship.Metal,
      Crystal: ship.Crystal,
      Deuterium: ship.Deuterium,
    };
  },
};

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
