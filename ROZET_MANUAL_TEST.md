# 🎮 HASENE Rozetler - Manual Test Prosedürü

## Test Planı

### Test 1: İlk Rozeti Açma (correct_10)
**Amaç**: 10 doğru cevap vererek "📖 Kur'an'a İlk Adım" rozetini açmak

**Adımlar**:
1. Browser'ı aç: http://localhost:3001
2. DevTools'u aç (F12) ve Console sekmesine git
3. Başarılar panelinde "localStorage temizle" işlemi yap:
   ```javascript
   localStorage.clear()
   location.reload()
   ```
4. Herhangi bir oyun modunu seç (örn: Kelime Bul - Kolay)
5. **10 kez doğru cevap ver** (basit kelimeler seç Kolay seviyede)
6. Son oyunda "Tebrikler!" modalı görünecek
7. "🏆 Başarılar" butonuna tıkla
8. **Beklenen Sonuç**:
   - Browser console'da: `✅ ROZET AÇILDI: 📖 Kur'an'a İlk Adım (10 doğru cevap)`
   - Modal'da: "📖 Kur'an'a İlk Adım" - "✓ Kazanıldı: 2025-11-12"
   - Diğer rozetler: "🔒 Kilitli" (gri, yarı saydam)

---

### Test 2: Çoklu Rozetler (correct_50)
**Amaç**: 50 doğru cevap vererek 2. rozeti açmak

**Adımlar**:
1. Önceki test sonucundan devam et (11-50 cevap ara)
2. Çeşitli oyun modları oyna (çeşitlilik için)
3. 50. doğru cevaptan sonra Başarılar panelini aç
4. **Beklenen Sonuç**:
   - Console: `✅ ROZET AÇILDI: 📚 Bilgi Toplayıcı (50 doğru cevap)`
   - Modal: 2 rozet açık:
     - ✓ 📖 Kur'an'a İlk Adım
     - ✓ 📚 Bilgi Toplayıcı
   - Diğerleri: 🔒 Kilitli

---

### Test 3: Mod Uzmanı Rozeti (kelime_master)
**Amaç**: 30 kez Kelime Bul oynayarak "📘 Kelime Bilgesi" rozetini açmak

**Adımlar**:
1. localStorage temizle
2. SADECE Kelime Bul modunu seç (Kolay seviyesi)
3. 30 kez oyun tamamla (doğru/yanlış farketmiyor)
4. Başarılar panelini aç
5. **Beklenen Sonuç**:
   - Console: `✅ ROZET AÇILDI: 📘 Kelime Bilgesi (30 Kelime Bul oyunu)`
   - Modal: "⭐ Mod Ustalığı Rozetleri" kategorisinde açık
   - "📘 Kelime Bilgesi" - "✓ Kazanıldı: [tarih]"

---

### Test 4: Streak Rozeti (streak_3)
**Amaç**: 3 gün art arda ibadet yaparak streak rozetini açmak

**Adımlar**:
1. localStorage temizle
2. **Gün 1**: En az 1 oyun oyna
3. **Gün 2**: En az 1 oyun oyna
4. **Gün 3**: En az 1 oyun oyna (Başarılar panelini aç)
5. **Beklenen Sonuç**:
   - Console: `✅ ROZET AÇILDI: 🤲 Üç Günlük Seri (3 gün art arda ibadet)`
   - Modal: "✨ İbadet Streaki Rozetleri" kategorisinde açık
   - "🤲 Üç Günlük Seri" - "✓ Kazanıldı: [tarih]"

---

### Test 5: Kilitli Rozetlerin Görsel Kontrolü
**Amaç**: Kilitli rozetlerin doğru gösterildiklerini kontrol et

**Kontrol Edilecek Özellikler**:
- [ ] Kilitli rozetler **yarı saydam** (%40 opacity)
- [ ] Kilitli rozetler **gri arka plan** (#f5f5f5)
- [ ] Kilitli rozetler **gri border** (#ddd)
- [ ] "🔒 Kilitli" yazısı gösterilir
- [ ] Açık rozetler **tam saydam** (%100 opacity)
- [ ] Açık rozetler **beyazımsı arka plan** (#fff8f0)
- [ ] Açık rozetler **altın border** (#D4AF37)
- [ ] "✓ Kazanıldı: [tarih]" yazısı gösterilir

---

### Test 6: Console Logging Kontrolü
**Amaç**: Debug mesajlarının doğru gösterildiğini kontrol et

**Oyun oynamak sırasında Console'da görülmesi gereken mesajlar**:

1. **Oyun sonunda**:
   ```
   ✅ ROZET AÇILDI: [rozet adı] ([eşik değeri])
   ```
   (Eğer rozet açılacaksa)

2. **Başarılar paneli açıldığında**:
   ```
   🏆 Rozet Kontrolü: [X] doğru, [Y] toplam
   📊 Rozetler Modal Açıldı
   ```

---

## Otomatik Test Script (Console'da çalıştır)

### localStorage'ı temizle:
```javascript
localStorage.clear()
location.reload()
```

### Hızlı istatistik ekle (test için):
```javascript
// 10 doğru cevap simüle et
let stats = JSON.parse(localStorage.getItem('HASENE_STATS') || '{}');
stats.modes = { kelimeBul: { played: 10, correct: 10 } };
stats.score = 20;
stats.total = 10;
stats.daily = {};
const today = new Date().toISOString().slice(0, 10);
stats.daily[today] = { played: 10, correct: 10 };
localStorage.setItem('HASENE_STATS', JSON.stringify(stats));
location.reload()
```

---

## Beklenen Sonuçlar Özeti

| Test | Beklenen Rozet | Şart | Durum |
|------|----------------|------|-------|
| 1 | 📖 Kur'an'a İlk Adım | 10 doğru | ✅ Açılmalı |
| 2 | 📚 Bilgi Toplayıcı | 50 doğru | ✅ Açılmalı |
| 3 | 📘 Kelime Bilgesi | 30x Kelime Bul | ✅ Açılmalı |
| 4 | 🤲 Üç Günlük Seri | 3 gün streak | ✅ Açılmalı |
| 5 | Kilitli Görseli | Açılmayan rozet | ✅ Gri, Yarı saydam |
| 6 | Console Mesajları | Rozet açılırsa | ✅ Doğru mesaj |

---

## Sorun Giderme

### Rozetler açılmıyorsa:
1. Browser console'ı kontrol et (F12)
2. "✅ ROZET AÇILDI" mesajı görüp görmediğini kontrol et
3. localStorage'da rozet var mı kontrol et:
   ```javascript
   JSON.parse(localStorage.getItem('hasene_badges_v1'))
   ```

### Görsel sorunlar varsa:
1. DevTools'da elemento kontrol et (F12 → Elements)
2. `opacity` ve `background-color` CSS'ini kontrol et
3. `showBadgesModal()` fonksiyonundaki CSS'i kontrol et (lines 634-644)

### Veri sorunları varsa:
1. localStorage'ı temizle:
   ```javascript
   localStorage.clear()
   location.reload()
   ```
2. Sayfayı yeniyle (Ctrl+F5)

---

**Test Başlangıç Tarihi**: 12 Kasım 2025  
**Kontrol Edenler**: [İsim/Team]  
**Sonuç**: [ ] Başarılı [ ] Başarısız
