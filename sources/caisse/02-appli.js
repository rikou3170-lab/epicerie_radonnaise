function WD() {
  function t() {
    let e = document.createElement("p"),
      n = e.style;
    ((e.innerText = "Running in emulator mode. Do not use with production credentials."),
      (n.position = "fixed"),
      (n.width = "100%"),
      (n.backgroundColor = "#ffffff"),
      (n.border = ".1em solid #000000"),
      (n.color = "#b50000"),
      (n.bottom = "0px"),
      (n.left = "0px"),
      (n.margin = "0px"),
      (n.zIndex = "10000"),
      (n.textAlign = "center"),
      e.classList.add("firebase-emulator-warning"),
      document.body.appendChild(e));
  }
  (typeof console < "u" &&
    typeof console.info == "function" &&
    console.info(
      "WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.",
    ),
    typeof window < "u" &&
      typeof document < "u" &&
      (document.readyState === "loading" ? window.addEventListener("DOMContentLoaded", t) : t()));
}
