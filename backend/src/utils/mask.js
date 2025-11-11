export function maskEmail(email) {
  if (!email) return null;
  const [name, domain] = email.split('@');
  return name[0] + '***@' + domain; // p***@gmail.com
}

export function maskPhone(phone) {
  if (!phone) return null;
  return phone.slice(0, 2) + '***' + phone.slice(-4); // 79***4255
}

export function maskAddress(address) {
  if (!address) return null;
  return address.slice(0, 5) + '***'; // "Mosc***"
}
