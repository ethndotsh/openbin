const exec = require("child_process").exec;
const process = require("process");

// check the platform
const platform = process.platform;
const isWin = /^win/.test(platform);
const isMac = /^darwin/.test(platform);
const isLinux = /^linux/.test(platform);

// check the architecture
const arch = process.arch;
const is64 = arch === "x64";
const is32 = arch === "ia32";
const isArm = arch === "arm";

if (is32) {
  console.log("32-bit architecture is not supported");
  process.exit(1);
  return;
}

if (isWin) {
  if (isArm) {
    console.log("Windows on ARM is not supported");
    process.exit(1);
    return;
  }

  if (is64) {
    // download from github release
    exec("powershell -File ./install.ps1", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        process.exit(1);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    });
  }
}

if (isMac) {
  if (isArm) {
    exec("sh ./install_macos_arm.sh", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        process.exit(1);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    });
  }

  if (is64) {
    // download from github release
    exec("sh ./install_macos.sh", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        process.exit(1);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    });
  }
}

if (isLinux) {
  if (isArm) {
    console.log("Linux on ARM is not supported");
    process.exit(1);
    return;
  }

  if (is64) {
    // download from github release
    exec("sh ./install_linux.sh", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        process.exit(1);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    });
  }
}
