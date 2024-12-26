const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("sessions", "createdAt", {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    });
    await queryInterface.addColumn("sessions", "updatedAt", {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }); 
  },
  down: async ({ context: queryInterface}) => {
    await queryInterface.removeColumn("blogs", "createdAt");
    await queryInterface.removeColumn("blogs", "updatedAt");
  }
};
