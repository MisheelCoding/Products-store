// utils/mailer.js
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.MAIL_FROM || 'onboarding@resend.dev';
const FROM_NAME = process.env.MAIL_FROM_NAME || 'My App';

export const sendMail = async ({ to, subject, html, text, replyTo }) => {
  const payload = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  };
  if (text) payload.text = text;
  if (replyTo) payload.reply_to = replyTo;

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    console.error('Resend error:', error);
    // покажем понятное сообщение наружу
    throw new Error(error.message || 'Email sending failed');
  }

  return { id: data?.id };
};
