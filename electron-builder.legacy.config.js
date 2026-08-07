const base = require("./electron-builder.config");
const legacyChannel = process.env.GNGS_UPDATE_CHANNEL || "legacy";
const legacyPublish = Array.isArray(base.publish)
  ? base.publish.map((item) => ({ ...item, channel: legacyChannel }))
  : undefined;

module.exports = {
  ...base,
  productName: "ГНГС табель учета Legacy",
  electronVersion: "22.3.27",
  artifactName: "gngs-timesheet-win7-${arch}-setup-${version}.${ext}",
  extraMetadata: {
    ...(base.extraMetadata ?? {}),
    gngsUpdateChannel: "legacy",
  },
  win: {
    ...base.win,
    target: [
      {
        target: "nsis",
        arch: ["x64", "ia32"],
      },
    ],
  },
  publish: legacyPublish,
};
