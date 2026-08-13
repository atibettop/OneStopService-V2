/* ===== Muang Srisuk Group — ตัวโหลดสถิติผู้เข้าชม + ความยินยอมคุกกี้ (PDPA) =====
 *
 * วิธีเปิดใช้งาน: ใส่ค่าในตัวแปรด้านล่าง ถ้าเว้นว่างไว้ทั้งคู่
 * สคริปต์นี้จะไม่ทำอะไรเลย (ไม่มีการเรียกเซิร์ฟเวอร์ใด ๆ)
 *
 * 1) CLOUDFLARE_TOKEN — แนะนำ
 *    ไม่ใช้คุกกี้ ไม่เก็บข้อมูลส่วนบุคคล จึงโหลดได้ทันทีโดยไม่ต้องขอความยินยอม
 *    หาได้จาก dash.cloudflare.com → Analytics & Logs → Web Analytics
 *
 * 2) GA4_MEASUREMENT_ID — รูปแบบ "G-XXXXXXXXXX"
 *    ใช้คุกกี้ จึงถูกกั้นด้วยแบนเนอร์ขอความยินยอมตาม PDPA โดยอัตโนมัติ:
 *    แบนเนอร์จะโผล่ก็ต่อเมื่อมีการตั้งค่า ID นี้ และ GA4 จะโหลดหลังผู้ใช้กดยอมรับเท่านั้น
 */
(() => {
  const CLOUDFLARE_TOKEN = "8948f45da12247bab3e0ec03651b7ff6";
  const GA4_MEASUREMENT_ID = "";

  const CONSENT_KEY = "oneStopHrCookieConsent";

  // อ้างอิงตำแหน่งไฟล์นี้ (…/assets/analytics.js) เพื่อชี้ไปหน้านโยบายได้ถูกต้อง
  // แม้แต่บนหน้า 404 ที่ถูกเสิร์ฟจาก path ไหนก็ได้
  const policyUrl = document.currentScript
    ? new URL("../privacy.html", document.currentScript.src).href
    : "privacy.html";

  // ไม่เก็บสถิติตอนเปิดไฟล์ทดสอบในเครื่อง เพื่อไม่ให้ตัวเลขเพี้ยน
  const local = location.protocol === "file:" ||
    ["localhost", "127.0.0.1", ""].includes(location.hostname);
  if (local) return;

  const english = new URLSearchParams(location.search).get("lang") === "en";
  const t = (th, en) => (english ? en : th);

  /* ---------- ไม่ใช้คุกกี้: โหลดได้เลย ---------- */
  if (CLOUDFLARE_TOKEN) {
    const beacon = document.createElement("script");
    beacon.type = "module";
    beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
    beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: CLOUDFLARE_TOKEN }));
    document.head.appendChild(beacon);
  }

  /* ---------- ใช้คุกกี้: ต้องได้รับความยินยอมก่อน ---------- */
  if (!GA4_MEASUREMENT_ID) return;

  let loaded = false;
  function loadGa4() {
    if (loaded) return;
    loaded = true;
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_MEASUREMENT_ID;
    document.head.appendChild(tag);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function readConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (_) { return null; }
  }
  function writeConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (_) {}
  }

  function showBanner() {
    if (document.querySelector(".cookie-bar")) return;

    const bar = document.createElement("div");
    bar.className = "cookie-bar";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-live", "polite");
    bar.setAttribute("aria-label", t("การตั้งค่าคุกกี้", "Cookie settings"));

    const text = document.createElement("p");
    text.textContent = t(
      "เว็บไซต์นี้ใช้คุกกี้เพื่อวัดสถิติการเข้าชม ช่วยให้เราปรับปรุงเนื้อหาให้ตรงกับผู้ใช้มากขึ้น " +
      "คุณเลือกได้ว่าจะอนุญาตหรือไม่ และเปลี่ยนใจภายหลังได้ตลอด ",
      "This site uses cookies to measure visits so we can improve the content. " +
      "You choose whether to allow it, and you can change your mind at any time. "
    );
    const policy = document.createElement("a");
    policy.href = policyUrl;
    policy.textContent = t("อ่านนโยบายความเป็นส่วนตัว", "Read the privacy policy");
    text.appendChild(policy);

    const actions = document.createElement("div");
    actions.className = "cookie-bar-actions";

    const decline = document.createElement("button");
    decline.type = "button";
    decline.className = "cookie-btn cookie-btn-ghost";
    decline.textContent = t("ไม่ยอมรับ", "Decline");
    decline.addEventListener("click", () => { writeConsent("denied"); bar.remove(); });

    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "cookie-btn cookie-btn-solid";
    accept.textContent = t("ยอมรับคุกกี้สถิติ", "Accept analytics cookies");
    accept.addEventListener("click", () => { writeConsent("granted"); bar.remove(); loadGa4(); });

    actions.append(decline, accept);
    bar.append(text, actions);
    document.body.appendChild(bar);
    decline.focus();
  }

  // ลิงก์เปลี่ยนใจภายหลัง — PDPA กำหนดว่าการถอนความยินยอมต้องง่ายเท่ากับการให้
  function addFooterLink() {
    const footer = document.querySelector("footer.site .wrap span:last-child");
    if (!footer) return;
    const link = document.createElement("a");
    link.href = "#";
    link.className = "cookie-settings-link";
    link.textContent = t("ตั้งค่าคุกกี้", "Cookie settings");
    link.addEventListener("click", event => {
      event.preventDefault();
      try { localStorage.removeItem(CONSENT_KEY); } catch (_) {}
      showBanner();
    });
    footer.appendChild(link);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const consent = readConsent();
    if (consent === "granted") loadGa4();
    else if (consent !== "denied") showBanner();
    addFooterLink();
  });
})();
