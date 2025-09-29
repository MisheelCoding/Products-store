import crypto from 'crypto';

const SECRET_SALT = process.env.HASH_SALT;

export function hashEmail(email) {
  return crypto.createHmac('sha256', SECRET_SALT).update(email.toLowerCase().trim()).digest('hex');
}
