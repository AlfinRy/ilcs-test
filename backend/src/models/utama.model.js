const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const Utama = sequelize.define("utama", {
    id_aju: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: () => uuidv4(),
    },
    nomor_pengajuan: {
      type: Sequelize.STRING,
      unique: true,
    },
    tanggal_pengajuan: {
      type: Sequelize.DATE,
    },
    nomor_pendaftaran: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tanggal_pendaftaran: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    ur_pabean_asal: {
      type: Sequelize.STRING,
    },
    kd_skep_fasilitas: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    jenis_pib: {
      type: Sequelize.STRING,
    },
    kd_jenis_impor: {
      type: Sequelize.STRING,
    },
    ur_cara_bayar: {
      type: Sequelize.STRING,
    },
    ur_transaksi_impor: {
      type: Sequelize.STRING,
    },
  });

  return Utama;
};
