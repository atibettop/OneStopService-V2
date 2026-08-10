/* ===== One Stop HR — ตัวโหลดสถิติผู้เข้าชม =====
 *
 * วิธีเปิดใช้งาน: ใส่ค่าในตัวแปรด้านล่างเพียงตัวเดียวก็พอ
 * ถ้าเว้นว่างไว้ทั้งคู่ สคริปต์นี้จะไม่ทำอะไรเลย (ไม่มีการเรียกเซิร์ฟเวอร์ใด ๆ)
 *
 * 1) CLOUDFLARE_TOKEN — แนะนำ
 *    ฟรี ไม่ใช้คุกกี้ ไม่เก็บข้อมูลส่วนบุคคล จึงไม่ต้องมีแบนเนอร์ขอความยินยอม
 *    หาได้จาก dash.cloudflare.com → Analytics & Logs → Web Analytics → Add a site
 *    ค่าที่ได้เป็นสตริงยาว ๆ เช่น "a1b2c3d4e5f6..."
 *
 * 2) GA4_MEASUREMENT_ID — ใช้เมื่อจำเป็นต้องต่อกับ Google Ads / Search Console
 *    รูปแบบ "G-XXXXXXXXXX" แต่ใช้คุกกี้ ต้องมีแบนเนอร์ขอความยินยอมตาม PDPA
 */
(() => {
  const CLOUDFLARE_TOKEN = "8948f45da12247bab3e0ec03651b7ff6";
  const GA4_MEASUREMENT_ID = "";

  // ไม่เก็บสถิติตอนเปิดไฟล์ทดสอบในเครื่อง เพื่อไม่ให้ตัวเลขเพี้ยน
  const local = location.protocol === "file:" ||
    ["localhost", "127.0.0.1", ""].includes(location.hostname);
  if (local) return;

  if (CLOUDFLARE_TOKEN) {
    const beacon = document.createElement("script");
    beacon.type = "module";
    beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
    beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: CLOUDFLARE_TOKEN }));
    document.head.appendChild(beacon);
  }

  if (GA4_MEASUREMENT_ID) {
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_MEASUREMENT_ID;
    document.head.appendChild(tag);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID, { anonymize_ip: true });
  }
})();
