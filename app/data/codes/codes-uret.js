const fs = require('fs');

function generateRandomId() {
  return Math.floor(10000000000 + Math.random() * 90000000000); // 10 milyar ile 99 milyar arasında bir ID oluşturun
}

// Rasgele bir 11 haneli string oluşturun
function generateRandomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 11;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// Rasgele bir tarih (date) oluşturun
function generateRandomDate() {
  const start = new Date(2000, 0, 1); // Başlangıç tarihi
  const end = new Date(); // Şu anki tarih
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().slice(0, 10); // YYYY-MM-DD formatında döndürün
}

// Rasgele veri oluşturun
function generateRandomData() {
  const id = generateRandomId(11);
  const product = generateRandomString(3);
  const code = Math.floor(Math.random() * 1000); // Rastgele bir sayı oluşturun
  const date = generateRandomDate();

  return { id, product, code, date };
}

// JSON dosyasına yazmak için veri oluşturun
const jsonData = Array.from({ length: 30 }, generateRandomData); // 10 satır veri oluşturun

// JSON dosyasına yazın
const jsonFilePath = 'codes.json';
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

console.log(`Rasgele veriler "${jsonFilePath}" JSON dosyasına yazıldı.`);
