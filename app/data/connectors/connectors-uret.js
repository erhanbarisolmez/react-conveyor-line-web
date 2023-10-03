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
  const product = generateRandomString("XVK"+8);
  const costumerDraw = generateRandomString("A960200" + 4);
  const revision = generateRandomString("00"+3);
  const costumerDraw2 = generateRandomString("ZARI5591/"+3);
  const connector = generateRandomString(5);
  const date = generateRandomDate();
  const sa = generateRandomString(3+","+1,","+2);
  const sa2 = generateRandomString(1,","+2);

  return { id, product, date ,costumerDraw,revision, costumerDraw2,connector, sa, sa2};
}

// JSON dosyasına yazmak için veri oluşturun
const jsonData = Array.from({ length: 30 }, generateRandomData); // 10 satır veri oluşturun

// JSON dosyasına yazın
const jsonFilePath = 'connectors.json';
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

console.log(`Rasgele veriler "${jsonFilePath}" JSON dosyasına yazıldı.`);
