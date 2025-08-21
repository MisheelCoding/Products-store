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
