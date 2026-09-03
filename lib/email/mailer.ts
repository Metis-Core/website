import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';

let cached: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cached) return cached;
  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  if (!user || !pass) return null;

  cached = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      // Gmail app passwords ship with spaces; strip them.
      pass: pass.replace(/\s+/g, ''),
    },
  });
  return cached;
}

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(input: SendEmailInput): Promise<{ ok: boolean; error?: string }> {
  const transporter = getTransporter();
  if (!transporter) {
    return { ok: false, error: 'mailer not configured' };
  }

  const from = process.env.EMAIL_FROM ?? `Metis Analytica <${process.env.EMAIL}>`;

  try {
    await transporter.sendMail({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text ?? stripHtml(input.html),
      replyTo: input.replyTo,
    });
    return { ok: true };
  } catch (e) {
    console.error('[mailer] send failed', e);
    return { ok: false, error: e instanceof Error ? e.message : 'send failed' };
  }
}

export function adminNotificationEmail(): string {
  return process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.EMAIL ?? '';
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
