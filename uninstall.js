const exec = require("child_process").exec;
const process = require("process");

// check the platform
const platform = process.platform;
const isWin = /^win/.test(platform);

if (isWin) {
  exec(
    `rm -r ${process.env.USERPROFILE}/Documents/openbin`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        process.exit(1);
        return;
      }
      console.log(stdout);
      console.log(stderr);
    },
  );
} else {
  exec(`rm -r /usr/local/bin/openbin`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}
