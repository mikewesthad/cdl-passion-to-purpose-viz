const ftp = require("vinyl-ftp");
const fs = require("vinyl-fs");
const path = require("path");
const minimist = require("minimist");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "..", ".env.ftp") });

const argv = minimist(process.argv.slice(2));
const { src, dest } = argv;
if (!src)
  throw new Error(
    "You must specify where the source files to upload are, using --src"
  );
if (!dest)
  throw new Error(
    "You must specify where the destination directory on the ftp server is, using using --dest"
  );

const conn = ftp.create({
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  timeOffset: process.env.FTP_TIMEOFFSET
    ? parseFloat(process.env.FTP_TIMEOFFSET)
    : 0,
  parallel: 6,
  log: console.log
});

fs.src([src], { buffer: false, dot: true }).pipe(conn.dest(dest));
