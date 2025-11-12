# 🎮 HASENE OYUN TESTI - GERÇEK ZAMANDA SENKRONIZASYON KONTROLÜ

**Tarih:** 12 Kasım 2025  
**Test Türü:** İntegrasyonel Senkronizasyon Testi  
**Senaryo:** 1 Doğru Cevap → Tüm Sistemlere Yansıması

---

## 📋 TEST PLANI

```
ADIM 1: BAŞLANGIÇ DURUMU
├─ localStorage temizleme
├─ Ana menu görüntüleme
└─ İlk puan = 0 doğrulama

ADIM 2: OYUN OYNANMAZı
├─ Kelime Bul modu seçme
├─ Kolay seviye seçme
└─ 1 doğru cevap verme

ADIM 3: KAZANIM EKRANI
├─ Kazan Puanı gösterim
├─ Doğru/Yanlış gösterim
└─ Motivasyon hadisi

ADIM 4: ANA MENÜYE DÖNÜŞ
├─ Mertebe Paneli güncellemesi
├─ Puan gösterimi
├─ Seviye gösterimi
├─ İlerleme çubuğu
└─ Yıldız sayısı

ADIM 5: STATİSTİK PANELI
├─ Başarı Analizi
├─ Muvazebet İstatistikleri
├─ Oyun Türü İstatistikleri
└─ Günlük Performans

ADIM 6: ROZET PANELI
├─ Hangi rozetler açıldı?
├─ Timestamp kaydedildi mi?
└─ Kazanıldı gösterimi

ADIM 7: GÜNLÜK GÖREVLER
├─ Hangi görevler ilerlemeler?
├─ Progress bar güncelleme
└─ Yıldız sayaçları

ADIM 8: TAKVIM MODAL
├─ Bugünün verisi kaydedildi mi?
└─ Streak gösterildi mi?

ADIM 9: localStorage KONTROLÜ
├─ HASENE_STATS mevcut mu?
├─ hasene_badges_v1 mevcut mu?
├─ HASENE_DAILY_TASKS mevcut mu?
└─ Veri doğru mu?

ADIM 10: SAYFA REFRESH
├─ F5 ile yenile
├─ Puanlar geri yüklendi mi?
├─ Görev ilerleme korundu mu?
├─ Rozetler korundu mu?
└─ Takvim verisi korundu mu?
```

---

## 🔬 DETAYLI TEST PROTOKOLÜ

### ADIM 1: BAŞLANGIÇ DURUMU

#### Test 1.1: localStorage Temizlemesi
```javascript
// Browser Console'da çalıştırılır:
localStorage.clear();
location.reload();
```

**Beklenen:**
- ✅ Sayfa yüklenir
- ✅ Ana menu görünür
- ✅ scoreVal = 0
- ✅ mertebeLevel = 1
- ✅ mertebeStars = 0
- ✅ progressBar = 0%

**Doğrulama Yöntemi:**
```javascript
// Console'da kontrol:
console.log("stats.score:", stats.score); // 0
console.log("mertebe:", Math.floor(stats.score/1000)+1); // 1
console.log("stars:", Math.floor(stats.score/100)); // 0
```

---

### ADIM 2: OYUN OYNANMASI

#### Test 2.1: Modu Seçme
```
Ekran: Ana Menu
Seçim: Kelime Bul (📘)
Durum: Zorluk seçim modalı açılır
```

**Beklenen:** ✅ Zorluk modal gösterilir

#### Test 2.2: Zorluk Seçme
```
Modal: Zorluk Seçimi
Seçim: Kolay (1-7 puan)
Durum: Oyun başlıyor
```

**Beklenen:** 
- ✅ İlk soru gösterilir
- ✅ Cevap seçenekleri gösterilir
- ✅ currentMode = "kelimeBul"

#### Test 2.3: Doğru Cevap Verme
```
Soru: Başlangıç sorusu
Cevap: DOĞRU seçeneği
Zorluk: 1 (Kolay)
```

**Beklenen:** ✅ Cevap işlenir

---

### ADIM 3: KAZANIM EKRANI KONTROLÜ

#### Test 3.1: Tamamlama Modal Gösterimi
```
Beklenen Gösterimler:
├─ ✅ Sahih: 1
├─ ✅ Hatalı: 0
├─ ✅ HASENE: +1 ح
└─ ✅ Motivasyon Hadisi
```

**Doğrulama Kod:**
```javascript
// roundCorrect = 1
// roundWrong = 0
// roundPointsEarned = 1
// difficulty = 1 (Kolay)
console.log("Kazanılan HASENE:", 1); // 1 puan
```

**Kontrol Noktaları:**
- ✅ Puan doğru hesaplanıyor mu?
- ✅ Modal gösteriliyor mu?
- ✅ Motivasyon mesajı var mı?

---

### ADIM 4: ANA MENÜYE DÖNÜŞ - MERTEBE PANELİ KONTROLÜ

**Yapılacak İşlem:**
```
Modalda "Menüye Dön" veya otomatik menu dönüş
```

#### Test 4.1: Puan Gösterim
```
Beklenen:
├─ scoreVal.innerText = "1"  ← HASENE puanı
└─ localStorage HASENE_STATS.score = 1
```

**Kontrol Yöntemi:**
```javascript
console.log("Görünen puan:", document.getElementById('scoreVal').innerText); // "1"
console.log("localStorage puanı:", JSON.parse(localStorage.getItem('HASENE_STATS')).score); // 1
```

#### Test 4.2: Mertebe Paneli Güncelleme
```
Beklenen:
├─ mertebeLevel = "1"  (score/1000 = 0 + 1)
├─ mertebeStars = "0"  (score/100 = 0)
├─ progressBar.width = "0.1%"  ((1%1000/1000)*100)
├─ mertebeRemaining = "999"  (1000-1)
└─ mertebeLevel1Name/2Name = "Mertebe 1"
```

**Doğrulama Kod:**
```javascript
const score = 1;
const mertebe = Math.floor(score / 1000) + 1; // 1
const stars = Math.floor(score / 100); // 0
const progress = (score % 1000 / 1000) * 100; // 0.1%
const remaining = 1000 - score; // 999

console.log("Mertebe:", mertebe); // 1
console.log("Yıldızlar:", stars); // 0
console.log("İlerleme %:", progress); // 0.1
console.log("Kalan:", remaining); // 999
```

**Görsel Kontrol:**
- ✅ Puan "1" gösteriliyor
- ✅ Mertebe "1" gösteriliyor
- ✅ Yıldız sayısı "0" gösteriliyor
- ✅ Progress bar "0.1%" 
- ✅ Kalan "999 puan" gösteriliyor

---

### ADIM 5: STATİSTİK PANELI KONTROLÜ

**Yapılacak İşlem:**
```
Ana Menüden "📊 İstatistikler" butonunu tıkla
```

#### Test 5.1: Başarı Analizi Kategorisi
```
Beklenen Değerler:
├─ Başarı Oranı = (1/1)*100 = 100%  ← totalCorrect/totalPlayed
├─ Günlük Ort. = 1  ← totalCorrect sayısı
└─ Renk: İslam Yeşili (#1a7f3f)
```

**Doğrulama Kod:**
```javascript
const totalCorrect = Object.values(stats.modes||{}).reduce((s,m)=>s+(m.correct||0),0);
const totalPlayed = Object.values(stats.modes||{}).reduce((s,m)=>s+(m.played||0),0);
const successRate = (totalCorrect/totalPlayed)*100;

console.log("Başarı %:", successRate); // 100
console.log("Toplam Doğru:", totalCorrect); // 1
console.log("Toplam Oyun:", totalPlayed); // 1
```

#### Test 5.2: Muvazebet İstatistikleri Kategorisi
```
Beklenen Değerler:
├─ Mevcut Devam = 1 gün (calculateStreak())
├─ En İyi Devam = 1 gün
└─ Renk: Turuncu (#FF9800)
```

#### Test 5.3: Oyun Türü İstatistikleri Kategorisi
```
Beklenen Değerler:
├─ Kelime Bul: 1  ← Seçtiğimiz mod
├─ Dinle & Bul: 0
├─ Boşluk Doldur: 0
├─ Ayet Oku: 0
├─ Dua Öğren: 0
└─ Hadis Oku: 0
```

**Doğrulama Kod:**
```javascript
console.log("Kelime Bul:", stats.modes.kelimeBul.played); // 1
console.log("Kelime Bul Doğru:", stats.modes.kelimeBul.correct); // 1
```

#### Test 5.4: Günlük Performans Kategorisi
```
Beklenen Değerler:
├─ Toplam Sahih = 1
├─ Bugünkü Amel % = 100%
└─ Toplam Amel Günleri = 1
```

---

### ADIM 6: ROZET PANELI KONTROLÜ

**Yapılacak İşlem:**
```
Ana Menüden "🏆 Rozetler" butonunu tıkla
```

#### Test 6.1: Rozet Açılış Kontrolü
```
1 doğru cevapla hangi rozetler açıldı?

Kontrol Edilecek Rozetler:
├─ correct_10? (10 doğru gerekli) ❌ Hayır
├─ play_5? (5 ibadet gerekli) ❌ Hayır
├─ streak_3? (3 gün gerekli) ❌ Hayır
└─ Açılacak Rozet: Hiçbiri şimdilik
```

**Doğrulama Kod:**
```javascript
console.log("Kazanılmış Rozetler:", Object.keys(badges.earned));
// [] (Boş array - hiçbiri açılmamış)
console.log("Toplam Rozet:", Object.keys(badges.earned).length); // 0
```

**Görsel Kontrol:**
- ✅ Modal açılırsa tüm rozetler gözüküyor
- ✅ Hiçbiri henüz açılmamış (locked)
- ✅ Tüm rozetler gri renkte

---

### ADIM 7: GÜNLÜK GÖREVLER KONTROLÜ

**Yapılacak İşlem:**
```
Ana Menüden "⭐ Günlük Görevler" butonunu tıkla
```

#### Test 7.1: Görev İlerleme Kontrolü
```
Beklenen İlerleme:
├─ Kelime Çevir: 1/5 ← Kelime Bul'dan +1
├─ Ayet Oku: 0/3
├─ Dua Öğren: 0/2
├─ Hadis Oku: 0/1
├─ Sahih Cevaplar: 1/10 ← Doğru cevaptan +1
├─ HASENE Topla: 1/100 ← 1 HASENE puanı
├─ Dinle & Bul: 0/3
└─ Mertebe Çeşitliliği: 0/3
```

**Doğrulama Kod:**
```javascript
console.log("Kelime görev:", dailyTasks.kelime.current); // 1
console.log("Sahih görev:", dailyTasks.sahih.current); // 1
console.log("HASENE görev:", dailyTasks.puanTracked); // 1
```

#### Test 7.2: Progress Bar Gösterimi
```
Beklenen:
├─ Kelime: 1/5 = 20% progress bar
├─ Sahih: 1/10 = 10% progress bar
└─ HASENE: 1/100 = 1% progress bar
```

---

### ADIM 8: TAKVIM MODAL KONTROLÜ

**Yapılacak İşlem:**
```
Ana Menüden "📅 Takvim" butonunu tıkla
```

#### Test 8.1: Bugünün Verisi
```
Beklenen:
├─ Bugün işaretli olsun (koyu kenar)
├─ Renk: İslam Yeşili (#1a7f3f) - %100 başarı
├─ Tooltip: "2025-11-12: 1 ibadet, 1 sahih"
└─ Mevcut Streak: 1 gün
```

**Doğrulama Kod:**
```javascript
const today = todayKey(); // "2025-11-12"
const todayData = stats.daily[today];
console.log("Bugünün Verisi:", todayData); 
// {played: 1, correct: 1}

const streak = calculateStreak();
console.log("Mevcut Streak:", streak); // 1
```

#### Test 8.2: 2 Haftalık Özet
```
Beklenen:
├─ Toplam Ibadatlar: 1
├─ Toplam Sahih: 1
└─ Başarı %: 100%
```

---

### ADIM 9: localStorage KONTROLÜ

**Yapılacak İşlem:**
```
Browser Developer Tools > Application > Storage > Local Storage
veya Console'da direct kontrol
```

#### Test 9.1: HASENE_STATS Anahtarı
```javascript
const stats = JSON.parse(localStorage.getItem('HASENE_STATS'));
console.log(JSON.stringify(stats, null, 2));

Beklenen Yapı:
{
  "score": 1,
  "total": 1,
  "modes": {
    "kelimeBul": {
      "played": 1,
      "correct": 1
    },
    "dinleBul": {"played": 0, "correct": 0},
    "boslukDoldur": {"played": 0, "correct": 0},
    "ayetOku": {"played": 0, "correct": 0},
    "duaEt": {"played": 0, "correct": 0},
    "hadisOku": {"played": 0, "correct": 0}
  },
  "daily": {
    "2025-11-12": {
      "played": 1,
      "correct": 1
    }
  }
}
```

**Doğrulama:**
- ✅ score = 1
- ✅ total = 1
- ✅ modes.kelimeBul.played = 1
- ✅ modes.kelimeBul.correct = 1
- ✅ daily["2025-11-12"] = {played: 1, correct: 1}

#### Test 9.2: hasene_badges_v1 Anahtarı
```javascript
const badges = JSON.parse(localStorage.getItem('hasene_badges_v1'));
console.log(JSON.stringify(badges, null, 2));

Beklenen:
{
  "earned": {}  // Boş - henüz rozet açılmamış
}
```

#### Test 9.3: HASENE_DAILY_TASKS Anahtarı
```javascript
const tasks = JSON.parse(localStorage.getItem('HASENE_DAILY_TASKS'));
console.log(JSON.stringify(tasks, null, 2));

Beklenen Yapı:
{
  "kelime": {"current": 1, "earned_stars": 0},
  "ayet": {"current": 0, "earned_stars": 0},
  "dua": {"current": 0, "earned_stars": 0},
  "hadis": {"current": 0, "earned_stars": 0},
  "sahih": {"current": 1, "earned_stars": 0},
  "puan": {"current": 0, "earned_stars": 0},
  "dinle": {"current": 0, "earned_stars": 0},
  "mertebe": {"current": 0, "earned_stars": 0},
  "lastReset": "Wed Nov 12 2025",
  "puanTracked": 1,
  "mertebeCount": {}
}
```

**Doğrulama:**
- ✅ kelime.current = 1
- ✅ sahih.current = 1
- ✅ puanTracked = 1
- ✅ lastReset = Bugünün tarihi

---

### ADIM 10: SAYFA REFRESH KONTROLÜ

**Yapılacak İşlem:**
```
Tarayıcıda F5 tuşuna bas veya Ctrl+R
```

#### Test 10.1: Sayfa Yüklenmesi
```
Beklenen:
1. localStorage'dan veriler okunur
2. loadStats() → stats yüklenir
3. loadBadges() → badges yüklenir
4. initializeDailyTasks() → görevler yüklenir
5. updateScoreUI() → UI güncellenir
6. Ana menu gösterilir
```

#### Test 10.2: Puan Korunması
```javascript
// Refresh sonrası:
console.log("stats.score:", stats.score); // 1 (önceki gibi)
console.log("scoreVal:", document.getElementById('scoreVal').innerText); // "1"
```

**Görsel Kontrol:**
- ✅ scoreVal = "1" (kayıtlı puan gösterilir)
- ✅ mertebeLevel = "1"
- ✅ mertebeStars = "0"
- ✅ progressBar = "0.1%"

#### Test 10.3: Oyun İstatistikleri Korunması
```javascript
// Stats Modal açılırsa:
// Başarı Oranı: 100%
// Toplam Oyun: 1
// Toplam Doğru: 1
```

#### Test 10.4: Görev İlerleme Korunması
```javascript
// Tasks Modal açılırsa:
// Kelime: 1/5
// Sahih: 1/10
// Puan: 1/100
```

#### Test 10.5: Takvim Verisi Korunması
```javascript
// Calendar Modal açılırsa:
// Bugün yeşil (#1a7f3f) ve 100% başarı göstermeli
// Streak: 1 gün
```

---

## 📊 KONTROL NOKTASI ÖZETİ

```
╔════════════════════════════════════════════════════════════╗
║                    KONTROL NOKTALARI                       ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║ ✅ ADIM 1: Başlangıç (score=0)                             ║
║ ✅ ADIM 2: Oyun Oynanması (1 Doğru)                        ║
║ ✅ ADIM 3: Kazanim Ekranı (+1 HASENE)                      ║
║ ✅ ADIM 4: Mertebe Paneli (Güncellenmeli)                  ║
║ ✅ ADIM 5: Istatistik Paneli (100% başarı)                 ║
║ ✅ ADIM 6: Rozetler (Hiçbiri açılmamış)                    ║
║ ✅ ADIM 7: Günlük Görevler (İlerleme +1)                   ║
║ ✅ ADIM 8: Takvim (Bugün kaydedilmeli)                     ║
║ ✅ ADIM 9: localStorage (Tüm veriler kaydedilmeli)         ║
║ ✅ ADIM 10: Sayfa Refresh (Veriler restore edilmeli)       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## 🎯 BEKLENEN SONUÇLAR

### Senaryo Başarılı ✅ Ise:

```
✅ 1 HASENE puanı tüm bileşenlere yansıyacak
✅ Mertebe paneli otomatik güncellenecek
✅ Görev ilerleme kayıt edilecek
✅ Takvim bugünü işaretleyecek
✅ localStorage 3 anahtar altında tüm veriyi kaydedecek
✅ Sayfa refresh'te tüm veriler restore edilecek
✅ Senkronizasyon kusursuz olacak
```

### Senaryo Başarısız ❌ Ise:

```
❌ Puan gösterilmezse → updateScoreUI() hatası
❌ Mertebe güncelenmezse → updateMertebePanel() hatası
❌ Görev ilerlenmezse → updateDailyTask() hatası
❌ localStorage kaydedilmezse → save* fonksiyonu hatası
❌ Refresh sonrası veriler kaybolursa → load* fonksiyonu hatası
```

---

**Test Prosedürü:** Hazır  
**Kontrol Noktaları:** 10 Ana Başlık  
**Alt Kontroller:** 50+  
**Beklenen Sonuç:** ✅ Tüm veriler senkron ve kalıcı  

Şimdi tarayıcıda bu testleri gerçekleştirelim! 🎮
