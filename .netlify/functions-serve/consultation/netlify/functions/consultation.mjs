
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/consultation.ts
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var MAX_LEN = { name: 200, email: 200, message: 5e3 };
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var consultation_default = async (request) => {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL;
  if (!RESEND_API_KEY || !LEAD_NOTIFY_EMAIL) {
    console.error("Missing RESEND_API_KEY or LEAD_NOTIFY_EMAIL environment variable");
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";
  if (honeypot) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!name || !email || !message || name.length > MAX_LEN.name || email.length > MAX_LEN.email || message.length > MAX_LEN.message || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid submission" }), { status: 400 });
  }
  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "yg-auditors-website/1.0"
      },
      body: JSON.stringify({
        from: "YG-Auditors Website <onboarding@resend.dev>",
        to: LEAD_NOTIFY_EMAIL,
        reply_to: email,
        subject: `New consultation request from ${name}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`
      })
    });
    if (!emailRes.ok) {
      console.error(`Resend returned ${emailRes.status}: ${await emailRes.text()}`);
      return new Response(JSON.stringify({ error: "Could not send message" }), { status: 502 });
    }
  } catch (err) {
    console.error("Resend notification failed:", err);
    return new Response(JSON.stringify({ error: "Could not send message" }), { status: 502 });
  }
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
};
export {
  consultation_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvY29uc3VsdGF0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbnRlcmZhY2UgTGVhZFBheWxvYWQge1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgZW1haWw/OiBzdHJpbmc7XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICBjb21wYW55Pzogc3RyaW5nOyAvLyBob25leXBvdFxyXG59XHJcblxyXG5jb25zdCBFTUFJTF9SRSA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xyXG5jb25zdCBNQVhfTEVOID0geyBuYW1lOiAyMDAsIGVtYWlsOiAyMDAsIG1lc3NhZ2U6IDUwMDAgfTtcclxuXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHZhbHVlXHJcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxyXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxyXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxyXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxyXG4gICAgLnJlcGxhY2UoLycvZywgJyYjMzk7Jyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXF1ZXN0OiBSZXF1ZXN0KTogUHJvbWlzZTxSZXNwb25zZT4gPT4ge1xyXG4gIGNvbnN0IFJFU0VORF9BUElfS0VZID0gcHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVk7XHJcbiAgY29uc3QgTEVBRF9OT1RJRllfRU1BSUwgPSBwcm9jZXNzLmVudi5MRUFEX05PVElGWV9FTUFJTDtcclxuXHJcbiAgaWYgKCFSRVNFTkRfQVBJX0tFWSB8fCAhTEVBRF9OT1RJRllfRU1BSUwpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgUkVTRU5EX0FQSV9LRVkgb3IgTEVBRF9OT1RJRllfRU1BSUwgZW52aXJvbm1lbnQgdmFyaWFibGUnKTtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSksIHtcclxuICAgICAgc3RhdHVzOiA1MDAsXHJcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsZXQgYm9keTogTGVhZFBheWxvYWQ7XHJcbiAgdHJ5IHtcclxuICAgIGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ludmFsaWQgSlNPTiBib2R5JyB9KSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5hbWUgPSB0eXBlb2YgYm9keS5uYW1lID09PSAnc3RyaW5nJyA/IGJvZHkubmFtZS50cmltKCkgOiAnJztcclxuICBjb25zdCBlbWFpbCA9IHR5cGVvZiBib2R5LmVtYWlsID09PSAnc3RyaW5nJyA/IGJvZHkuZW1haWwudHJpbSgpIDogJyc7XHJcbiAgY29uc3QgbWVzc2FnZSA9IHR5cGVvZiBib2R5Lm1lc3NhZ2UgPT09ICdzdHJpbmcnID8gYm9keS5tZXNzYWdlLnRyaW0oKSA6ICcnO1xyXG4gIGNvbnN0IGhvbmV5cG90ID0gdHlwZW9mIGJvZHkuY29tcGFueSA9PT0gJ3N0cmluZycgPyBib2R5LmNvbXBhbnkudHJpbSgpIDogJyc7XHJcblxyXG4gIGlmIChob25leXBvdCkge1xyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUgfSksIHtcclxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmIChcclxuICAgICFuYW1lIHx8ICFlbWFpbCB8fCAhbWVzc2FnZSB8fFxyXG4gICAgbmFtZS5sZW5ndGggPiBNQVhfTEVOLm5hbWUgfHwgZW1haWwubGVuZ3RoID4gTUFYX0xFTi5lbWFpbCB8fCBtZXNzYWdlLmxlbmd0aCA+IE1BWF9MRU4ubWVzc2FnZSB8fFxyXG4gICAgIUVNQUlMX1JFLnRlc3QoZW1haWwpXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdJbnZhbGlkIHN1Ym1pc3Npb24nIH0pLCB7IHN0YXR1czogNDAwIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGVtYWlsUmVzID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLnJlc2VuZC5jb20vZW1haWxzJywge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtSRVNFTkRfQVBJX0tFWX1gLFxyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgJ1VzZXItQWdlbnQnOiAneWctYXVkaXRvcnMtd2Vic2l0ZS8xLjAnLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZnJvbTogJ1lHLUF1ZGl0b3JzIFdlYnNpdGUgPG9uYm9hcmRpbmdAcmVzZW5kLmRldj4nLFxyXG4gICAgICAgIHRvOiBMRUFEX05PVElGWV9FTUFJTCxcclxuICAgICAgICByZXBseV90bzogZW1haWwsXHJcbiAgICAgICAgc3ViamVjdDogYE5ldyBjb25zdWx0YXRpb24gcmVxdWVzdCBmcm9tICR7bmFtZX1gLFxyXG4gICAgICAgIGh0bWw6IGA8cD48c3Ryb25nPk5hbWU6PC9zdHJvbmc+ICR7ZXNjYXBlSHRtbChuYW1lKX08L3A+PHA+PHN0cm9uZz5FbWFpbDo8L3N0cm9uZz4gJHtlc2NhcGVIdG1sKGVtYWlsKX08L3A+PHA+PHN0cm9uZz5NZXNzYWdlOjwvc3Ryb25nPjwvcD48cD4ke2VzY2FwZUh0bWwobWVzc2FnZSkucmVwbGFjZSgvXFxuL2csICc8YnI+Jyl9PC9wPmAsXHJcbiAgICAgIH0pLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFlbWFpbFJlcy5vaykge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBSZXNlbmQgcmV0dXJuZWQgJHtlbWFpbFJlcy5zdGF0dXN9OiAke2F3YWl0IGVtYWlsUmVzLnRleHQoKX1gKTtcclxuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnQ291bGQgbm90IHNlbmQgbWVzc2FnZScgfSksIHsgc3RhdHVzOiA1MDIgfSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdSZXNlbmQgbm90aWZpY2F0aW9uIGZhaWxlZDonLCBlcnIpO1xyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnQ291bGQgbm90IHNlbmQgbWVzc2FnZScgfSksIHsgc3RhdHVzOiA1MDIgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSB9KSwge1xyXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgfSk7XHJcbn07Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQU9BLElBQU0sV0FBVztBQUNqQixJQUFNLFVBQVUsRUFBRSxNQUFNLEtBQUssT0FBTyxLQUFLLFNBQVMsSUFBSztBQUV2RCxTQUFTLFdBQVcsT0FBdUI7QUFDekMsU0FBTyxNQUNKLFFBQVEsTUFBTSxPQUFPLEVBQ3JCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxRQUFRLEVBQ3RCLFFBQVEsTUFBTSxPQUFPO0FBQzFCO0FBRUEsSUFBTyx1QkFB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
