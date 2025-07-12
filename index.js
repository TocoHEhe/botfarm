const mineflayer = require("mineflayer");
const readline = require("readline");
const express = require("express");

let bot;
const PASSWORD = "123456";

function createBot() {
  bot = mineflayer.createBot({
    host: "103.69.96.34",
    port:  31423,
    username: "HeHeBoy",
    version: "1.21"
  });

  // === Tự động login/register
  bot.on("message", (jsonMsg) => {
    const msg = jsonMsg.toString().toLowerCase();

    if (msg.includes("/register") || msg.includes("đăng ký")) {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      console.log("🔐 Đã gửi lệnh /register");
    } else if (msg.includes("/login") || msg.includes("đăng nhập")) {
      bot.chat(`/login ${PASSWORD}`);
      console.log("🔐 Đã gửi lệnh /login");

      // ⏳ Chờ vài giây để gửi /team home
      setTimeout(() => {
        bot.chat("/team home");
        console.log("🏠 Đã gửi lệnh /team home");
      }, 3000); // chờ 3 giây sau khi đăng nhập
    }
  });

  // === Khi vào game
  bot.once("spawn", () => {
    console.log("✅ Bot đã vào server!");

    // Chống AFK
    setInterval(() => {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 300);
    }, 10000);

    // Auto ăn nếu đói
    setInterval(() => {
      if (bot.food !== undefined && bot.food < 18) {
        const foodItem = bot.inventory
          .items()
          .find(i =>
            i.name.includes("bread") ||
            i.name.includes("apple") ||
            i.name.includes("golden carrot") ||
            i.name.includes("beef") ||
            i.name.includes("porkchop") ||
            i.name.includes("potato") ||
            i.name.includes("cooked")
          );

        if (foodItem) {
          bot.equip(foodItem, "hand")
            .then(() => bot.consume())
            .then(() => console.log(`🍽️ Đã ăn: ${foodItem.name}`))
            .catch(err => console.log(`⚠️ Không thể ăn: ${err.message}`));
        } else {
          console.log("⚠️ Không có thức ăn trong inventory!");
        }
      }
    }, 5000);
  });

  // Hiển thị chat trong console
  bot.on("chat", (username, message) => {
    if (username !== bot.username) {
      console.log(`[${username}]: ${message}`);
    }
  });

  // Lỗi rõ ràng
  bot.on("error", (err) => {
    console.log(`❌ Lỗi: ${err.message}`);
  });

  // Tự động reconnect
  bot.on("end", () => {
    console.log("🔁 Mất kết nối! Đang thử kết nối lại sau 5 giây...");
    setTimeout(createBot, 5000); // kết nối lại sau 5s
  });

  // Gửi lệnh từ CMD
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (input) => {
    if (input.trim() !== "") {
      bot.chat(input);
    }
  });
}

createBot(); // tạo bot lần đầu

// Web server giữ Replit sống
const app = express();
app.get("/", (req, res) => {
  res.status(200).send("Bot is running!");
});
app.listen(3000, () => {
  console.log("🌐 Web server đang chạy tại port 3000");
});
