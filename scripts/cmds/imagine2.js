const { GoatWrapper } = require("fca-liane-utils");
const axios = require('axios');
const fs = require('fs');

const a = 'https://xapiz.onrender.com'; 
const d = {
 b: '/api/fluxdev', 
 c: '/api/usage' 
};

module.exports = {
 config: { 
 name: "imagine2",
 author: "ArYAN", 
 countDown: "20",
 category: "IMAGE"
 },

 onStart: async ({ message, args, api, event }) => {
 if (args.length < 1) return message.reply("Invalid prompts.");
  const permission = global.GoatBot.config.DEV;
 if (!permission.includes(event.senderID)) {
 api.sendMessage("❌ | Only Arafat's boss user can use the command", event.threadID, event.messageID);
 return;
 }
 
 api.setMessageReaction("⏰", event.messageID, () => {}, true);
 
 const startTime = new Date().getTime();

 const v = await message.reply("⏳ Generating your imagination....");

 try {
 const e = await axios.get(`${a}${d.b}?prompt=${encodeURIComponent(args.join(" "))}`, { responseType: 'arraybuffer' });
 const f = await axios.get(`${a}${d.c}`);

 fs.writeFile('/tmp/x.png', e.data, (err) => {
 if (err) {
 api.setMessageReaction("❌", event.messageID, () => {}, true);
 return message.reply("Failed to save image.");
 }

 const endTime = new Date().getTime();
 const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

 api.setMessageReaction("✅", event.messageID, () => {}, true);

 message.reply({
 body: `📦| 𝗠𝗼𝗱𝗲𝗹: FLUXDEV\n🔮| 𝗧𝗼𝘁𝗮𝗹 𝗥𝗲𝗾: ${f.data.totalRequests}\n⏰| 𝗧𝗮𝗸𝗲𝗻 𝗧𝗶𝗺𝗲: ${timeTaken} sec.`,
 attachment: fs.createReadStream('/tmp/x.png')
 });
 });
 } catch (error) {
 api.setMessageReaction("❌", event.messageID, () => {}, true);
message.reply("Request failed.");
 }
 }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
