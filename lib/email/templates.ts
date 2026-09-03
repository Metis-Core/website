const brand = {
  name: 'Metis Analytica',
  tagline: 'Reliable Data. Smarter Operations.',
  color: '#000000',
  accent: '#737373',
  site: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://metisanalytica.com',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function shell(title: string, body: string, preheader?: string): string {
  const pre = preheader
    ? `<span style="display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(preheader)}</span>`
    : '';
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f6f6;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;">
    ${pre}
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f6f6;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <tr>
              <td style="padding:24px 28px;background:${brand.color};color:#fff;">
                <div style="font-size:20px;font-weight:800;letter-spacing:-0.01em;">${brand.name}</div>
                <div style="font-size:12px;opacity:0.75;margin-top:2px;">${brand.tagline}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#fafafa;border-top:1px solid #eee;color:#666;font-size:12px;">
                <div>© ${new Date().getFullYear()} ${brand.name}</div>
                <div style="margin-top:4px;"><a href="${brand.site}" style="color:${brand.accent};text-decoration:none;">${brand.site.replace(/^https?:\/\//, '')}</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function h1(text: string): string {
  return `<h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.2;color:#111;">${escapeHtml(text)}</h1>`;
}
function p(text: string): string {
  return `<p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:#333;">${escapeHtml(text)}</p>`;
}
function kv(items: Array<[string, string | null | undefined]>): string {
  const rows = items
    .filter(([, v]) => v != null && String(v).length > 0)
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:8px 12px;background:#fafafa;border-radius:6px 0 0 6px;font-size:12px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;width:35%;vertical-align:top;">${escapeHtml(k)}</td>
          <td style="padding:8px 12px;background:#fafafa;border-radius:0 6px 6px 0;font-size:14px;color:#111;">${escapeHtml(String(v))}</td>
        </tr>`,
    )
    .join('<tr><td style="height:6px;" colspan="2"></td></tr>');
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:16px 0;">${rows}</table>`;
}
function block(text: string): string {
  const safe = escapeHtml(text).replace(/\n/g, '<br />');
  return `<div style="padding:14px 16px;border:1px solid #eee;border-radius:8px;background:#fff;font-size:14px;color:#333;line-height:1.6;white-space:pre-wrap;">${safe}</div>`;
}

/* ============================================================================
 * Templates
 * ========================================================================== */

export interface ConsultationEmailData {
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  sector?: string | null;
  service_interest?: string | null;
  preferred_date?: string | null;
  message: string;
}

export function consultationAdminEmail(d: ConsultationEmailData): { subject: string; html: string } {
  return {
    subject: `New consultation request — ${d.name}`,
    html: shell(
      'New consultation request',
      [
        h1('New consultation request'),
        p(`${d.name} just requested a consultation.`),
        kv([
          ['Name', d.name],
          ['Email', d.email],
          ['Phone', d.phone],
          ['Organization', d.organization],
          ['Sector', d.sector],
          ['Service of interest', d.service_interest],
          ['Preferred date', d.preferred_date],
        ]),
        `<div style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:#666;font-weight:600;margin:16px 0 8px 0;">Message</div>`,
        block(d.message),
      ].join(''),
      `${d.name} wants to talk about ${d.service_interest ?? 'their data setup'}.`,
    ),
  };
}

export function consultationConfirmationEmail(d: ConsultationEmailData): { subject: string; html: string } {
  return {
    subject: `We received your consultation request`,
    html: shell(
      'Consultation received',
      [
        h1(`Thanks, ${d.name.split(' ')[0] || 'there'}.`),
        p(`We got your consultation request and will reach out within 24 business hours to schedule a time.`),
        kv([
          ['Service', d.service_interest],
          ['Preferred date', d.preferred_date],
        ]),
        p(`If anything is urgent, just reply to this email — it goes straight to our team.`),
      ].join(''),
      `We'll be in touch within 24 hours to schedule your session.`,
    ),
  };
}

export interface ApplicationEmailData {
  full_name: string;
  email: string;
  phone?: string | null;
  resume_url?: string | null;
  cover_letter?: string | null;
  cover_letter_url?: string | null;
  position_title: string;
  position_slug: string;
}

export function applicationAdminEmail(d: ApplicationEmailData): { subject: string; html: string } {
  const resumeBlock = d.resume_url
    ? `<div style="margin:12px 0;"><a href="${escapeHtml(d.resume_url)}" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#000;color:#fff;text-decoration:none;font-size:14px;font-weight:600;">Open resume</a></div>`
    : '';
  const coverLetterFileBlock = d.cover_letter_url
    ? `<div style="margin:12px 0;"><a href="${escapeHtml(d.cover_letter_url)}" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#111;color:#fff;text-decoration:none;font-size:14px;font-weight:600;">Open cover letter</a></div>`
    : '';
  const coverBlock = d.cover_letter
    ? `<div style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:#666;font-weight:600;margin:16px 0 8px 0;">Cover letter</div>${block(d.cover_letter)}`
    : '';
  return {
    subject: `New application — ${d.position_title}`,
    html: shell(
      'New application',
      [
        h1(`${d.full_name} applied for ${d.position_title}`),
        kv([
          ['Full name', d.full_name],
          ['Email', d.email],
          ['Phone', d.phone],
          ['Role', d.position_title],
        ]),
        resumeBlock,
        coverLetterFileBlock,
        coverBlock,
      ].join(''),
      `${d.full_name} → ${d.position_title}`,
    ),
  };
}

export function applicationConfirmationEmail(d: ApplicationEmailData): { subject: string; html: string } {
  return {
    subject: `Application received — ${d.position_title}`,
    html: shell(
      'Application received',
      [
        h1(`Thanks for applying, ${d.full_name.split(' ')[0] || 'there'}.`),
        p(`We've received your application for the ${d.position_title} role. Our team reviews every application and will get back to you shortly.`),
        p(`If you shared a resume link, we'll be reviewing that too.`),
      ].join(''),
      `We got your application for ${d.position_title}.`,
    ),
  };
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

export function contactAdminEmail(d: ContactEmailData): { subject: string; html: string } {
  return {
    subject: `New contact message: ${d.subject}`,
    html: shell(
      'New contact message',
      [
        h1(d.subject),
        p(`From ${d.name} <${d.email}>${d.phone ? ` · ${d.phone}` : ''}`),
        block(d.message),
      ].join(''),
      `${d.name}: ${d.subject}`,
    ),
  };
}

export function contactAutoReplyEmail(d: ContactEmailData): { subject: string; html: string } {
  return {
    subject: `We received your message`,
    html: shell(
      `We got your message`,
      [
        h1(`Thanks, ${d.name.split(' ')[0] || 'there'}.`),
        p(`This is a quick confirmation that your message came through. Someone from our team will follow up within 24 business hours.`),
        p(`Your message reference: “${d.subject}”.`),
      ].join(''),
      `Confirmation that we received your message.`,
    ),
  };
}

export interface FeedbackEmailData {
  name: string;
  email: string;
  category: string;
  rating: number | null;
  message: string;
}

export function feedbackAdminEmail(d: FeedbackEmailData): { subject: string; html: string } {
  return {
    subject: `New feedback — ${d.category}${d.rating ? ` (${d.rating}★)` : ''}`,
    html: shell(
      'New feedback',
      [
        h1(`Feedback from ${d.name}`),
        kv([
          ['Name', d.name],
          ['Email', d.email],
          ['Category', d.category],
          ['Rating', d.rating != null ? `${d.rating} / 5` : null],
        ]),
        block(d.message),
      ].join(''),
      `${d.category} feedback from ${d.name}`,
    ),
  };
}
