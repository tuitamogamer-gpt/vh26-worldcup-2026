# 🏆 VH26 — World Cup 2026 Dashboard

Kompletna web aplikacija za praćenje **FIFA Svjetskog prvenstva 2026** (SAD · Kanada · Meksiko, 11. juni – 19. juli 2026). Dizajn: **VH26** — tamna tema sa lime akcentom, kružni grbovi reprezentacija, font Bricolage Grotesque + Archivo.

> 🔗 **Live demo:** https://goal-inky.vercel.app  
> 📦 **Kod:** https://github.com/tuitamogamer-gpt/vh26-worldcup-2026

Sve je već uvezeno i spremno: svih **48 reprezentacija**, svih **12 grupa**, kompletan raspored od **104 utakmice**, **16 stadiona** i automatske tabele, plasman i statistika.

---

## ▶️ Brzo pokretanje (Windows)

Dvoklik na **`start-app.bat`**.

Skripta će (ako treba) instalirati zavisnosti, pokrenuti aplikaciju i sama otvoriti preglednik na `http://localhost:5173`.

### Ručno pokretanje

```bash
npm install      # samo prvi put
npm run dev      # razvojni server na http://localhost:5173
```

### Statička verzija (za hosting / offline build)

```bash
npm run build    # generiše /dist
npm run preview  # pregled produkcijske verzije
```

Sadržaj foldera `dist` možeš postaviti na bilo koji web hosting (Netlify, Vercel, GitHub Pages…).

---

## 📦 Šta aplikacija nudi

| Stranica | Sadržaj |
|---|---|
| **Pregled** | Odbrojavanje do otvaranja, ključni podaci, prve utakmice, „Moj tim" banner, napredak turnira |
| **Moj tim** | Tvoji favoriti + posebna statistika za glavni tim (bodovi, plasman, golovi, strijelci, raspored, status prolaza) |
| **Grupe i tabele** | 12 grupa sa živim tabelama (bodovi, gol-razlika, forma) + trka za 3. mjesto |
| **Raspored** | Svih 104 utakmice po datumima, sa kickoff vremenima u tvojoj zoni, filteri po fazi / grupi / reprezentaciji |
| **Nokaut faza** | Vizuelni žrijeb (1/16 → finale) koji se sam popunjava iz rezultata grupa |
| **Reprezentacije** | Svih 48 timova, pretraga i filteri, profil sa **kompletnim sastavom (rosterom)**, rasporedom i rezultatima |
| **Stadioni** | 16 stadiona po državama, kapaciteti i broj utakmica |
| **Statistika** | Najbolji strijelci, najefikasniji timovi, ishodi, rekordi meča |

### 🕒 Vremenska zona
Gore desno biraš vremensku zonu (podrazumijevano **Sarajevo · Beograd · Skoplje / CET**). Sva kickoff vremena i datumi u rasporedu se preračunavaju u izabranu zonu — npr. otvaranje u Mexico Cityju (13:00 lokalno) prikazuje se kao **21:00** po CET-u.

### ⭐ Favoriti i „Moj tim"
Klikni ⭐ na bilo kojoj reprezentaciji (kartica ili profil) da je dodaš u favorite. Jedan tim postaviš kao **glavni** — on dobija posvećenu stranicu *Moj tim* sa svojom statistikom i pojavljuje se kao banner na Pregledu. Sastavi (rosteri) svih 48 reprezentacija su uvezeni, grupisani po pozicijama (golmani / odbrana / vezni / napad) sa klubovima i kapitenom.

### 📡 Live rezultati (API-Football)
Gore desno klikni **„Live isključen" → unesi API ključ → Uključi live**. Tada aplikacija svakih ~90 s povlači rezultate uživo i automatski ažurira: rezultate utakmica (uz „UŽIVO" oznaku i minut), tabele, plasman, nokaut žrijeb i najbolje strijelce.

**Postavljanje (jednom):**
1. Besplatna registracija na [dashboard.api-football.com](https://dashboard.api-football.com) → kopiraj svoj API ključ.
2. U aplikaciji: Live → zalijepi ključ → „Testiraj ključ" (potvrda) → „Uključi live".

Kako radi (tehnički): pošto API blokira pozive iz browsera i ključ ne smije biti u kodu, ugrađen je **mali proxy u Vite dev-server** (`/fapi`) koji prosljeđuje zahtjeve i ključ. Zato live radi dok je app pokrenut preko `start-app.bat` (dev-server). Ključ se čuva lokalno (localStorage), opcionalno u `.env` (`WC_API_KEY`).

Napomene: besplatni plan ima dnevni limit poziva (veći interval troši manje); **ručno uneseni rezultati se nikad ne prepisuju** live podacima; podaci stvarno teku tek kad mečevi počnu (11.6.).

## ⚽ Unos rezultata

Klikni na **bilo koju utakmicu** da uneseš rezultat (i opcionalno strijelce).
- Tabele, plasman i statistika se **računaju automatski**.
- Pobjednici i drugoplasirani iz grupa **automatski ulaze** u nokaut žrijeb.
- Sve se čuva lokalno u tvom pregledniku (`localStorage`) — ostaje i nakon zatvaranja.

> 💡 Dugme **„Popuni demo rezultate"** (na Pregledu) odmah popuni vjerodostojne rezultate cijele grupne faze da vidiš kako sve izgleda u punom pogonu. **„Obriši sve"** vraća na čisto stanje.

---

## 🧱 Tehnologija

- **React 18 + TypeScript + Vite**
- React Router (HashRouter — radi i bez servera)
- Bez težih zavisnosti; grafici su izrađeni ručno (CSS/SVG)
- Zastave: [flagcdn.com](https://flagcdn.com) (uz fallback na kod ako nema interneta)

## 📁 Struktura

```
src/
  data/        # timovi, grupe, stadioni, raspored (104 utakmice)
  utils/       # tabele, žrijeb, statistika, formatiranje
  components/  # Flag, MatchCard, StandingsTable, MatchEditor…
  pages/       # Pregled, Grupe, Raspored, Nokaut, Timovi, Stadioni, Statistika
  store/       # rezultati (localStorage)
```

## 📝 Napomene o podacima

- **Grupe i parovi grupne faze su zvanični** (žrijeb od 5. decembra 2025), kao i datumi i gradovi domaćini.
- Protivnici sa **3. mjesta** u nokautu se određuju prema zvaničnoj FIFA tabeli 8 najboljih trećih nakon grupne faze — do tada stoje kao oznake (npr. „3. mj. C/E/F/H/I").
- **Kickoff vremena** su lokalna vremena stadiona iz zvaničnog rasporeda, preračunata u izabranu vremensku zonu.
- **Sastavi (rosteri)** su okvirni — sastavljeni iz javnih izvora u junu 2026; konačne liste od 26 igrača FIFA potvrđuje na početku turnira, a klubovi se mogu promijeniti s transferima.
- **FIFA rang** je okviran, radi prikaza nosilaca.

---

## ☁️ Deploy (GitHub + Vercel)

Aplikacija je već postavljena:
- **GitHub:** https://github.com/tuitamogamer-gpt/vh26-worldcup-2026
- **Vercel (produkcija):** https://goal-inky.vercel.app

Svaki `git push` na `main` Vercel može automatski deployati (poveži repo u Vercel dashboardu). Ručni deploy: `vercel --prod`.

**Live rezultati u produkciji** rade kroz Vercel serverless funkciju ([`api/fapi/[...path].ts`](api/fapi/%5B...path%5D.ts)) koja prosljeđuje pozive na API-Football — isto kao lokalni Vite proxy. Ključ možeš:
- unijeti u aplikaciji (čuva se lokalno u pregledniku), **ili**
- postaviti kao Vercel env varijablu `WC_API_KEY` (Project → Settings → Environment Variables) da svi posjetioci dijele isti ključ.

---

*Napravljeno za praćenje Mundijala 2026. Uživaj! ⚽*
