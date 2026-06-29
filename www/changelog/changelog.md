## Aplicație Desktop [6.1.2] - 2026-06-26

### 🚀 Funcționalități

- Fereastră nouă pentru eFactura
- *(eFactura)* Trimite facturi la ANAF și descarcă răspunsul: https://videos.flexbiz.ro/wiki/efactura-raportare/
- *(eFactura)* Recepționează facturile primite prin eFactura: https://videos.flexbiz.ro/wiki/efactura-receptie/
- Personalizează logo-ul per gestiune
- *(eFactura)* Afișează toate mesajele primite prin eFactura, nu doar facturile
- *(eFactura)* Descarcă mesajele prin click pe coloana ID
- Trimite facturile prin Email: https://videos.flexbiz.ro/wiki/email/

### 🐛 Corecții

- Testare și fixare erori eFactura
- Diacriticile nu apar când se salvează certificatul de conformitate ca și PDF

## Aplicație Desktop [6.0.5] - 2026-06-09

### 🚀 Funcționalități

- *(securitate)* Salvarea sesiunii de autentificare în locul trimiterii parolei la fiecare operațiune
- Adaugă autentificarea cu doi factori
- Adăugat funcționalitate pentru dispozitive de încredere care pot sări peste autentificarea cu doi factori
- Deschide doar interfața de Vânzare configurată
- Setare: Printează numărul comenzii cu bonul de casă(Doar pentru driverul FiscalNet)

### 🐛 Corecții

- Rezolvă eroare la logare dacă serverul Moqui nu este configurat
- Aplicația îngheață când se încearcă actualizarea automată a sesiunii de autentificare
- Mesaj de notificare pentru încasări a produselor vândute în altă gestiune
- Adaugă spațiu liber la finalul bonului nefiscal cu numărul de comandă(Doar pentru driverul FiscalNet)
- Deschide o fereastră cu interfața de Vânzare la prima deschidere după actualizarea programului
- Eroare la comenzile date la furnizori dacă pentru un anumit produs nu este configurat furnizorul
- Adăugat iconița pentru printarea etichetelor în interfața standard de Vânzare

## Aplicație Desktop [6.0.4] - 2026-05-15

### 🚀 Funcționalități

- Printează declarația de conformitate odată cu factura
- Exclude produsele care aparțin anumitor raioane configurate să fie calculate la punctele de fidelitate
- Logo personalizat pe companie

### 🐛 Corecții

- Fereastra de login - arată doar utilizatorii care aparțin de compania ultimului utilizator logat
- Încărcare foarte lentă a produselor în Catalog Produse
- Aplicația se oprește dacă URL-ul NATS este configurat dar serverul nu funcționează
- Eroare care apare la fiecare încărcare de facturi la Urmărire Parteneri sau Contabilitate dacă modulul eFactura nu este instalat

## Aplicație Desktop [6.0.0] - 2026-05-07

### 🚀 Funcționalități

- Program de afiliere Partener Colibri
- Sterge diacriticile din SMS-urile trimise pentru a reduce costul mesajelor
- Recepție - Arată procentul de TVA la achiziție și vânzare pentru fiecare linie
- [**Schimbare majoră**] Schimbarea modulului de comunicație între calculatoare
- Rebranding al aplicației la Flexbiz

### 🐛 Corecții

- Fixează titlul paginii de setări Tremol
- Arată Jurnalul de Modificări când se face update automat
- Butonul 'Ajutor' -> 'Manualul utilizatorului' din bara de meniu deschide Manualul Flexbiz corect
- Eroare la închiderea bonului
- Setarea NATS URL nu era salvată
- Nu întrerupe programul dacă sunt erori de comunicație între calculatoare
- Fereastra de recepție a liniilor de pe eFactura taie din casuțe când numele produsului e prea lung

### 📚 Documente

- Șablon GDPR pentru partenerii Colibri

## Server Gestiune/POS [1.0.0] - 2026-05-07

### 🚀 Funcționalități

- Îmbunătățește viteza de încărcare a ferestrei de Încasări
- Funcții noi pentru căutarea discounturilor
- [**Schimbare majoră**] Schimbarea modulului de comunicație între calculatoare de la JMS la NATS

### 🐛 Corecții

- Eroare la modificarea conexiunilor pentru un document
- Discountul de afiliat nu este afișat dacă clientul nu are bonuri neachitate
- Ștergerea unui document conectat șterge doar conexiunile, nu și documentul

## Aplicație Desktop [5.2.1] - 2026-04-21

### 🚀 Funcționalități

- Driver nou ZPFLabServer pentru casele de marcat Tremol

### 🐛 Corecții

- Rezolva erorile care tot apar uneori, desi programul functioneaza

## Aplicație Desktop [5.1.1] - 2026-04-14

### 🚀 Funcționalități 

- Adăugare IBAN specific gestiunii pe facturi

## Aplicație Desktop [5.1.0] - 2026-04-09

### 🚀 Funcționalități

- Citire bonuri fiscale din casa de marcat
- Reconciliere bonuri fiscale

### 💼 Altele

- Imprimare etichete Brother
- Trei dimensiuni pentru etichetele Brother

## Server Linic [0.1.0] - 2026-04-09

### 🚀 Funcționalități

- Reconciliere bonuri de casă
- Creare pagină de noutăți

### 🐛 Corecții

- Adăugare rol client/furnizor la importul partenerilor
- Eliminare filtru care excludea județele corecte
- Sincronizare corectă a numelui cu contactele din Nextcloud

### ⚙️ Diverse

- Înregistrare informații pentru depanarea grupului de Whatsapp de audit