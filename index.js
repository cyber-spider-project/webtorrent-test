const fs=require("fs");
const path=require("path");
const {promisify}=require("util");
const WebTorrent = require("webtorrent");

const client = new WebTorrent();
const magnetURI = "magnet:?xt=urn:btih:FC4C2B07ABC16E3CD572CD85AF4D07A7BFC86BB8&dn=300%20Sexy%20Pamela%20Anderson%20HQ%20Pictures%20%5BUp%20to%204200%20PX%5D%20%5BSet%202%5D%20&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2780%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2730%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce"

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




