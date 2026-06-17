# Change Survivors - Log rozmowy i rozwoju gry

## Podsumowanie projektu
Gra typu **Bullet Heaven** (w stylu Vampire Survivors) z motywem **Amazon Change Management / Approvals**.

**Live URL:** https://thenulltape.github.io/change-survivors/
**Repo:** https://github.com/thenulltape/change-survivors

---

## Chronologia rozwoju

### 1. Tower Defense (pierwsza gra)
- Zbudowana gra tower defense w stylu korporacyjnym (HTML5 Canvas + JS)
- Ścieżka z zakrętami, wieże z różnymi zdolnościami, system walut/fal/HP
- Pliki: `index.html`, `styles.css`, `game.js` (w głównym folderze `tower`)

### 2. Bullet Heaven - wersja bazowa
- Gra w stylu Vampire Survivors z motywem Change/Approvals
- Gracz jako engineer, automatyczne strzelanie, fale wrogów
- 6 broni, system level-up, 10 minut przetrwania

### 3. Zmiany nazewnictwa
- **Bronie:** Approve, Layout Change, Add Correspondence, Request for Info, Change Support, REJECT!
- **Wrogowie:** Change Request, Pending Approval, On Hold!, Layout, Reminder!, GBS!
- **Bossy:** ASANA INTAKE, APPROVAL PLAN

### 4. Auto-aim
- Zmieniono typ broni "Approve" z `radial` na `aimed` (celuje w najbliższych wrogów)
- Beam (Request for Info) również auto-aim

### 5. Zwiększone tempo
- Szybszy spawn rate (0.8s start, agresywna eskalacja)
- Wcześniejsze pojawianie się nowych typów wrogów
- Szybsze fire rate broni
- Więcej pocisków bazowo

### 6. Tło biurowe
- Podłoga w kratkę z meblami biurowymi (biurka, szafki, rośliny, drukarki)
- Proceduralnie generowane na podstawie pozycji

### 7. Duża aktualizacja - nowe systemy

#### Postacie (3):
| ID | Nazwa | Opis |
|----|-------|------|
| change_manager | Change Manager | Zbalansowany, +20% AOE radius |
| change_support | Change Support | Szybki, kruchy, +30% XP, +20% speed |
| ops | OPS | Tanky, 2 bronie na start, +30% HP |

#### Pasywne boosty (8, max 5 lvl każdy):
| Nazwa | Emoji | Efekt |
|-------|-------|-------|
| Quick Steps | 👟 | +12% speed |
| Magnet Badge | 🧲 | +25% pickup radius |
| Growth Plan | 📈 | +15% XP |
| Sharp Pen | 🖊️ | +10% damage |
| Espresso Shot | ☕ | -8% cooldowns |
| Health Plan | 💚 | +15 max HP |
| Thick Skin | 🦺 | +5% DR |
| Fast Track | ⚡ | +12% proj speed |

#### Ewolucje broni (broń max lvl + pasyw):
| Broń + Pasyw | Ewolucja |
|--------------|----------|
| Approve + Espresso Shot | Bulk Approve |
| Layout Change + Sharp Pen | Total Restructure |
| Add Correspondence + Quick Steps | Mail Storm |
| Request for Info + Fast Track | Interrogation |
| Change Support + Thick Skin | Fortress |
| REJECT! + Growth Plan | Mass Rejection |

#### Eventy:
- **Chest** (📦) - co ~55s, daje losowy weapon upgrade
- **Coffee Break** (☕) - co ~40s, 8s double fire rate
- **SLA Timer** - co ~70s, mini-quest "resolve X in 15s" za bonus XP

#### Inne systemy:
- **Minimap** - prawy dolny róg
- **Achievements** - 10 achievementów (localStorage)
- **Kill milestones** - 100/300/500/1000/2000 = "FULLY APPROVED!" + bonus XP
- **Screen shake** - przy damage i boss kill
- **Trail** - niebieski ślad za graczem
- **Escalation** - po boss kill spawnują się 3 mini-bossy (nie chainują dalej)
- **SFX/Muzyka** - Web Audio API (strzały, hity, level up, boss, milestones, bass beat)

### 8. Fix: Escalation infinite loop
- Dodano warunek: escalation mini-bossy NIE spawnują kolejnych po śmierci

### 9. System pauzy
- Przycisk ⏸ w HUD (widoczny podczas gry)
- Skrót: Escape
- Modal z Resume i Quit to Menu

### 10. Grafiki / Assety
- **Czcionka:** Press Start 2P (Google Fonts, pixel art style)
- **Logo:** `assets/logo.png` (wygenerowane w PartyRock)
- **Postacie:** `main_change_am.png`, `main_support.png`, `main_ops.png`
- **Wrogowie:** `change_request.png`, `pending_approval.png`, `on_hold.png`, `layout.png`, `reminder.png`, `gbs.png`, `asana_intake.png`, `approval_plan.png`, `escalation.png`
- **Bronie/Pociski:** `approve.png`, `layout_change.png`, `add_correspondence.png`, `request_for_info.png`, `reject.png`

#### Rozmiary sprite'ów w grze:
- Gracz: 64px
- Wrogowie: size × 2.8
- Pociski: size × 3
- Orbitery: 28px
- Menu postaci: 80px

### 11. Deployment
- GitHub repo: `thenulltape/change-survivors`
- GitHub Pages: https://thenulltape.github.io/change-survivors/

---

## Prompty PartyRock (jeszcze nieużyte)

### Pickupy:
- **Coffee Break:** `Pixel art coffee cup pickup item, steaming hot cup, brown and white, cozy warm glow, collectible item style, 16-bit game style, transparent background, 64x64`
- **Chest:** `Pixel art treasure chest, golden package box with ribbon, glowing, loot drop style, 16-bit game style, transparent background, 64x64`
- **XP Orb:** `Pixel art small blue experience gem, diamond shaped, glowing cyan, simple collectible, 16-bit game style, transparent background, 32x32`

### Efekty:
- **Explosion/Death:** `Pixel art explosion effect sprite sheet, orange and yellow burst, 4 frames in a row, 16-bit game style, transparent background, 256x64`
- **Fire Zone:** `Pixel art fire zone ground effect, small burning flames on ground, red and orange, top-down view, 16-bit game style, transparent background, 64x64`

---

## Jak aktualizować grę online
```bash
cd bullet-heaven
git add -A
git commit -m "opis zmian"
git push
```
GitHub Pages odświeży się automatycznie w 1-2 minuty.

---

## Struktura plików
```
bullet-heaven/
├── index.html          # HTML strony
├── styles.css          # Style CSS (pixel font)
├── game.js             # Cała logika gry
└── assets/
    ├── logo.png
    ├── main_change_am.png
    ├── main_support.png
    ├── main_ops.png
    ├── change_request.png
    ├── pending_approval.png
    ├── on_hold.png
    ├── layout.png
    ├── reminder.png
    ├── gbs.png
    ├── asana_intake.png
    ├── approval_plan.png
    ├── escalation.png
    ├── approve.png
    ├── layout_change.png
    ├── add_correspondence.png
    ├── request_for_info.png
    └── reject.png
```
