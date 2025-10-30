const getBlacklistedTokenModel = (sequelize, { DataTypes }) => {
  const BlacklistedToken = sequelize.define("blacklisted_token", {
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return BlacklistedToken;
};

export default getBlacklistedTokenModel;
