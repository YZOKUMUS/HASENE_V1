#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
from collections import Counter

# Kelime datasını yükle
with open('kelimebul.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"📊 TOPLAM KELİME SAYISI: {len(data)}")
print("=" * 50)

# Zorluk seviyelerini say
difficulty_counts = Counter()
for item in data:
    difficulty = item.get('difficulty', 0)
    difficulty_counts[difficulty] += 1

# Sırala ve göster
print("🔢 ZORLUK SEVİYESİ DAĞILIMI:")
for diff in sorted(difficulty_counts.keys()):
    count = difficulty_counts[diff]
    percentage = (count / len(data)) * 100
    print(f"Zorluk {diff:2d}: {count:5d} kelime ({percentage:5.1f}%)")

print("\n" + "=" * 50)

# Kategorilere göre grupla
kolay_count = sum(difficulty_counts[i] for i in range(5, 10))  # 5-9
orta_count = sum(difficulty_counts[i] for i in range(10, 12))  # 10-11
zor_count = sum(difficulty_counts[i] for i in range(12, 22))   # 12-21

total_categorized = kolay_count + orta_count + zor_count

print("🎯 KATEGORİ DAĞILIMI:")
print(f"🌱 KOLAY  (5-9):   {kolay_count:5d} kelime ({(kolay_count/len(data)*100):5.1f}%)")
print(f"😐 ORTA   (10-11): {orta_count:5d} kelime ({(orta_count/len(data)*100):5.1f}%)")
print(f"🔥 ZOR    (12-21): {zor_count:5d} kelime ({(zor_count/len(data)*100):5.1f}%)")
print(f"📋 DİĞER:          {len(data)-total_categorized:5d} kelime ({((len(data)-total_categorized)/len(data)*100):5.1f}%)")

print("\n" + "=" * 50)
print("📈 ANALİZ SONUCU:")
if kolay_count > orta_count and kolay_count > zor_count:
    print("✅ En çok KOLAY kelime var")
elif orta_count > kolay_count and orta_count > zor_count:
    print("⚖️ En çok ORTA kelime var")
else:
    print("🔥 En çok ZOR kelime var")

# Dağılım dengeli mi?
max_cat = max(kolay_count, orta_count, zor_count)
min_cat = min(kolay_count, orta_count, zor_count)
if max_cat / min_cat < 2:
    print("✅ Kategoriler arasında dengeli dağılım var")
else:
    print("⚠️ Kategoriler arasında dengesizlik var")