const repository = process.env.GITHUB_REPOSITORY || "";
const [repositoryOwner, repositoryName] = repository.split("/");
const githubOwner = process.env.GH_OWNER || repositoryOwner || "Temowkaaa";
const githubRepo = process.env.GH_REPO || repositoryName || "gngs-timesheet";

const publish = githubOwner && githubRepo
  ? [
      {
        provider: "github",
        owner: githubOwner,
        repo: githubRepo,
      },
    ]
  : undefined;

module.exports = {
  appId: "ru.gngs.timesheet",
  productName: "ГНГС табель учета",
  artifactName: "gngs-timesheet-setup-${version}.${ext}",
  directories: {
    output: "dist",
  },
  files: [
    "index.html",
    "styles.css",
    "app.js",
    "main.js",
    "preload.js",
    "assets/**/*",
    "package.json",
  ],
  win: {
    icon: "assets/logo.ico",
    target: [
      {
        target: "nsis",
        arch: ["x64"],
      },
    ],
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "ГНГС табель учета",
  },
  publish,
};
