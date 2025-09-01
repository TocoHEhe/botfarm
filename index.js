function createBot() {
  const mineflayer = require("mineflayer");

  const bot = mineflayer.createBot({
    host: "AETSON.aternos.me",
    port: 52126,
    username: "HeHeBoy",
    version: "1.21.8",
  });

  const PASSWORD = "123456";

  bot.on("message", (jsonMsg) => {
    const msg = jsonMsg.toString().toLowerCase();
    if (msg.includes("/register") || msg.includes("đăng ký")) {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      console.log("🔐 Đã gửi /register");
    } else if (msg.includes("/login") || msg.includes("đăng nhập")) {
      bot.chat(`/login ${PASSWORD}`);
      console.log("🔐 Đã gửi /login");
      setTimeout(() => bot.chat("/team home"), 2000); // Gửi lệnh team home sau khi login
    }
  });

  bot.once("spawn", () => {
    console.log("✅ Bot đã vào server!");
  });

  bot.on("error", (err) => {
    console.log(`❌ Lỗi: ${err.message}`);
  });

  bot.on("end", () => {
    console.log("🔁 Mất kết nối! Thử lại sau 10 giây...");
    setTimeout(createBot, 10000);
  });
}

createBot();
