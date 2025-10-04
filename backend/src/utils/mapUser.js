import { maskAddress, maskEmail, maskPhone } from '#utils/mask.js';
export const buildTokenPayload = (user) => ({
  id: user._id,
  roles: user.roles,
});

export const toClientUser = (userDoc) => {
  const obj = typeof userDoc.toObject === 'function' ? userDoc.toObject() : userDoc;

  const { _id, password, __v, ...rest } = obj;

  return {
    id: _id,
    ...rest,
  };
};

export const toClientMaskedUser = (userDoc) => {
  const user = toClientUser(userDoc);

  return {
    ...user,
    email: maskEmail(user.email),
    phone: maskPhone(user.phone),
    addresses: user.addresses?.map((addr) => ({
      ...addr,
      addressLine: maskAddress(addr.addressLine),
      phone: maskPhone(addr.phone),
    })),
  };
};
