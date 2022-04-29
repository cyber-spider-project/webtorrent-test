const fs=require("fs");
const path=require("path");
const {promisify}=require("util");
const WebTorrent = require("webtorrent");

const client = new WebTorrent({
  tracker: [
    "udp://tracker.opentrackr.org:1337/announce",
    "udp://open.tracker.cl:1337/announce",
    "udp://9.rarbg.com:2810/announce",
    "udp://tracker.openbittorrent.com:6969/announce",
    "http://tracker.openbittorrent.com:80/announce",
    "udp://opentracker.i2p.rocks:6969/announce",
    "https://opentracker.i2p.rocks:443/announce",
    "udp://www.torrent.eu.org:451/announce",
    "udp://tracker.torrent.eu.org:451/announce",
    "udp://open.stealth.si:80/announce",
    "udp://exodus.desync.com:6969/announce",
    "udp://tracker.tiny-vps.com:6969/announce",
    "udp://ipv4.tracker.harry.lu:80/announce",
    "udp://opentor.org:2710/announce",
    "udp://tracker.dler.org:6969/announce",
    "udp://explodie.org:6969/announce",
    "udp://vibe.sleepyinternetfun.xyz:1738/announce",
    "udp://tracker1.bt.moack.co.kr:80/announce",
    "udp://tracker.theoks.net:6969/announce",
    "udp://tracker.monitorit4.me:6969/announce"
  ] 
});
const magnetURI = "magnet:?xt=urn:btih:9DDD9A57DFB23B19347E4DBA74B4E97A8BBB4588&dn=kpkp69.com-%5B%E5%8E%9F%E5%88%9B%5D+%E5%88%9A%E5%81%9A%E5%AE%8C%E7%91%9C%E4%BC%BD%E7%9A%84%E5%B0%91%E5%A6%87+%E5%8F%A3%E6%B4%BB%E8%B6%85%E7%A5%9E&tr=http%3A%2F%2Ftracker.ktxp.com%3A6868%2Fannounce&tr=http%3A%2F%2Ftracker.ktxp.com%3A7070%2Fannounce&tr=udp%3A%2F%2Ftracker.ktxp.com%3A6868%2Fannounce&tr=udp%3A%2F%2Ftracker.ktxp.com%3A7070%2Fannounce&tr=http%3A%2F%2Fbtfans.3322.org%3A8000%2Fannounce&tr=http%3A%2F%2Fbtfans.3322.org%3A8080%2Fannounce&tr=http%3A%2F%2Fbtfans.3322.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.bittorrent.am%2Fannounce&tr=udp%3A%2F%2Ftracker.bitcomet.net%3A8080%2Fannounce&tr=http%3A%2F%2Ftk3.5qzone.net%3A8080%2F&tr=http%3A%2F%2Ftracker.btzero.net%3A8080%2Fannounce&tr=http%3A%2F%2Fscubt.wjl.cn%3A8080%2Fannounce&tr=http%3A%2F%2Fbt.popgo.net%3A7456%2Fannounce&tr=http%3A%2F%2Fthetracker.org%2Fannounce&tr=http%3A%2F%2Ftracker.prq.to%2Fannounce&tr=http%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=http%3A%2F%2Ftracker.dmhy.org%3A8000%2Fannounce&tr=http%3A%2F%2Fbt.titapark.com%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.tjgame.enorth.com.cn%3A8000%2Fannounce&"

client.on("torrent", async function (torrent) {
  // console.log("torrent");
  torrent.on('error', function (err) {
    console.log("error",err);
  });
  const download_task=torrent.files.map(async function(file){
    try {
      setInterval(()=>{
        console.log([`file.name=>${file.name}`,`file.progress=>${file.progress}`].join(" "));
      },500);
      const save_path=path.join(__dirname,"./files/",file.name);
      const file_buffer=await new Promise((resolve,reject)=>{
        file.getBuffer((error,file_buffer)=>error?reject(error):resolve(file_buffer));
      });
      await promisify(fs.writeFile)(save_path,file_buffer);
    } catch (error) {
      console.log(file.name,error);
    }
  });
  await Promise.all(download_task);
});

client.on("warning", function (torrent) {
  console.log("on warning");
});

client.on("error", function (torrent) {
  console.log("on error");
});

client.add(magnetURI);
console.log(client.get(magnetURI).infoHash);




