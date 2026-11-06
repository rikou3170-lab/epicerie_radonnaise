function g8(t, e) {
  let n = document.createElement("a");
  (n.href = t), (n.target = e);
  let r = document.createEvent("MouseEvent");
  r.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), n.dispatchEvent(r);
}
