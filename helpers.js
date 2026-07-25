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
};
