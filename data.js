/* Emigreren — data: stappen, taken, e-mails */
window.EMIGREER_DATA = {
  destinations: (function () {
    const euNote =
      "EU/EER of Zwitserland. Geen visum voor vestiging als EU-burger. Wel lokale inschrijving, zorgregeling en fiscale woonplaats. Check het belastingverdrag met Nederland.";
    const worldNote =
      "Buiten de EU. Vaak visum of verblijfsvergunning nodig. Internationale zorgverzekering. Documenten soms legaliseren (apostille).";
    const extra = {
      hr: "EU-lidstaat. Geen visum. Na vestiging: inschrijving bij de općina, OIB aanvragen, lokale zorg en fiscale woonplaats checken. Nederlands rijbewijs is in de EU geldig.",
      be: "Buurland. Inschrijving gemeente, Rijksregister, mutualiteit. Fiscale woonplaats en 183-dagenregel goed vastleggen.",
      de: "Anmeldung bij het Einwohnermeldeamt. Steuer-ID, zorgkas, eventueel Splitting. Check het NL–DE-verdrag.",
      fr: "Inschrijving gemeente, numéro fiscal, CPAM/S1. Let op exit tax en box 3 versus Frans vermogen.",
      es: "Empadronamiento, NIE, Seguridad Social. Beckham-regeling is iets anders dan emigreren; toets fiscale woonplaats.",
      it: "Iscrizione anagrafica, codice fiscale, AIRE als je de Italiaanse nationaliteit hebt. Check het NL–IT-verdrag.",
      pt: "NIF, inschrijving junta de freguesia, SNS. NHR is afgebouwd; reken niet op oude regimes.",
      ie: "PPS-nummer, Revenue, PPS/HSE. Engels, EU-regels, eigen zorgstelsel.",
      at: "Meldezettel, Sozialversicherung, Finanzamt. Let op woonplaats en Immobilien.",
      pl: "PESEL, ZUS, Urząd Skarbowy. EU, lagere kosten, eigen taalbarrière.",
      se: "Personnummer, Skatteverket, Försäkringskassan. Hoge belasting, sterke zekerheid.",
      dk: "CPR, SKAT, yellow card. Strenge woonplaats.",
      fi: "Henkilötunnus, Kela, Vero. EU, winter, sterke publieke zorg.",
      gr: "AMKA, AFM, inschrijving dimos. Non-dom bestaat; toets of je echt emigreert.",
      cz: "Rodné číslo / rodné, zdravotní pojišťovna. EU.",
      hu: "TAJ, adóazonosító. EU.",
      ro: "CNP, CNAS. EU.",
      bg: "EGN, NHIF. EU.",
      cy: "ARC, Social Insurance. Engels breed in gebruik.",
      mt: "ID-kaart, CFR. Engels, EU.",
      lu: "CNS, matrikelnr. EU, veel grenswerkers.",
      si: "EMŠO, ZZZS. EU, dicht bij Kroatië.",
      sk: "Rodné číslo, Sociálna poisťovňa. EU.",
      ee: "Isikukood, Haigekassa. EU, digitaal.",
      lv: "Personas kods. EU.",
      lt: "Asmens kodas. EU.",
      no: "EER. D-nummer/fødselsnummer, NAV, Skatteetaten. Geen EU maar bijna dezelfde vrijheden.",
      is: "EER. Kennitala, Sjúkratryggingar.",
      li: "EER. Klein, douane met CH.",
      ch: "Niet-EU. Verblijfsvergunning nodig (quota). Hoge kosten, verdrag met NL.",
      gb: "Niet meer EU. Visa, NHS surcharge, apostille. Check het NL–VK-verdrag.",
      us: "Visa/green card. FATCA, wereldwijd inkomen als je US-person wordt. Apostille, rijbewijs per staat.",
      ca: "PR/visa, SIN, provinciale zorg. Koude start, puntensysteem.",
      au: "Visa, Medicare (soms), TFN. Afstand, apostille.",
      nz: "Visa, IRD, publieke zorg na wachttijd.",
      za: "Visa, SARS. Box 3 en valuta meenemen in de planning.",
      th: "Visa/retirement. Lange toeristenstatus is geen emigratie. Bank en zorg privé.",
      id: "KITAS/KITAP. Apostille, lokale regels per eiland.",
      my: "MM2H of werkvisa. Engels breed.",
      sg: "EP/PR. Streng, duur, efficiënt.",
      ae: "Visa via sponsor of golden visa. Geen IB zoals NL; wel NL-exit en CA.",
      tr: "Verblijf via ikamet. Niet-EU.",
      al: "Niet-EU, wel populair als woonland. Verblijfsvergunning.",
      me: "Niet-EU. Verblijf via eigendom of werk.",
      rs: "Niet-EU. Verblijfsvergunning.",
      ua: "Niet-EU. Situatie ter plaatse checken.",
      cw: "Land binnen het Koninkrijk. Eigen belastingstelsel, geen EU. Geen ‘emigratie EU’.",
      aw: "Land binnen het Koninkrijk. Eigen belastingstelsel, geen EU.",
      sx: "Land binnen het Koninkrijk. Eigen regels, geen EU.",
      bq: "Caribisch Nederland (BES). Bijzondere fiscale status, geen standaard-emigratie.",
      sr: "Nederlands veel gesproken. Visa/verblijf, geen EU.",
    };
    const eu = [
      ["at", "Oostenrijk"], ["be", "België"], ["bg", "Bulgarije"], ["hr", "Kroatië"], ["cy", "Cyprus"],
      ["cz", "Tsjechië"], ["dk", "Denemarken"], ["ee", "Estland"], ["fi", "Finland"], ["fr", "Frankrijk"],
      ["de", "Duitsland"], ["gr", "Griekenland"], ["hu", "Hongarije"], ["ie", "Ierland"], ["it", "Italië"],
      ["lv", "Letland"], ["lt", "Litouwen"], ["lu", "Luxemburg"], ["mt", "Malta"], ["pl", "Polen"],
      ["pt", "Portugal"], ["ro", "Roemenië"], ["sk", "Slowakije"], ["si", "Slovenië"], ["es", "Spanje"],
      ["se", "Zweden"], ["no", "Noorwegen"], ["is", "IJsland"], ["li", "Liechtenstein"], ["ch", "Zwitserland"],
    ];
    const world = [
      ["af", "Afghanistan"], ["al", "Albanië"], ["dz", "Algerije"], ["ad", "Andorra"], ["ao", "Angola"],
      ["ag", "Antigua en Barbuda"], ["ar", "Argentinië"], ["am", "Armenië"], ["aw", "Aruba"],
      ["au", "Australië"], ["az", "Azerbeidzjan"], ["bs", "Bahama’s"], ["bh", "Bahrein"], ["bd", "Bangladesh"],
      ["bb", "Barbados"], ["by", "Belarus"], ["bz", "Belize"], ["bj", "Benin"], ["bt", "Bhutan"],
      ["bo", "Bolivia"], ["ba", "Bosnië en Herzegovina"], ["bw", "Botswana"], ["br", "Brazilië"],
      ["bn", "Brunei"], ["bf", "Burkina Faso"], ["bi", "Burundi"], ["kh", "Cambodja"], ["cm", "Kameroen"],
      ["ca", "Canada"], ["cv", "Kaapverdië"], ["bq", "Caribisch Nederland"], ["cf", "Centraal-Afrikaanse Republiek"],
      ["td", "Tsjaad"], ["cl", "Chili"], ["cn", "China"], ["co", "Colombia"], ["km", "Comoren"],
      ["cg", "Congo-Brazzaville"], ["cd", "Congo-Kinshasa"], ["cr", "Costa Rica"], ["cu", "Cuba"],
      ["cw", "Curaçao"], ["dj", "Djibouti"], ["dm", "Dominica"], ["do", "Dominicaanse Republiek"],
      ["ec", "Ecuador"], ["eg", "Egypte"], ["sv", "El Salvador"], ["gq", "Equatoriaal-Guinea"],
      ["er", "Eritrea"], ["sz", "Eswatini"], ["et", "Ethiopië"], ["fj", "Fiji"], ["ga", "Gabon"],
      ["gm", "Gambia"], ["ge", "Georgië"], ["gh", "Ghana"], ["gd", "Grenada"], ["gt", "Guatemala"],
      ["gn", "Guinee"], ["gw", "Guinee-Bissau"], ["gy", "Guyana"], ["ht", "Haïti"], ["hn", "Honduras"],
      ["hk", "Hongkong"], ["in", "India"], ["id", "Indonesië"], ["iq", "Irak"], ["ir", "Iran"],
      ["il", "Israël"], ["ci", "Ivoorkust"], ["jm", "Jamaica"], ["jp", "Japan"], ["ye", "Jemen"],
      ["jo", "Jordanië"], ["kz", "Kazachstan"], ["ke", "Kenia"], ["kg", "Kirgizië"], ["ki", "Kiribati"],
      ["kw", "Koeweit"], ["xk", "Kosovo"], ["hrx", ""], ["la", "Laos"], ["ls", "Lesotho"],
      ["lb", "Libanon"], ["lr", "Liberia"], ["ly", "Libië"], ["mo", "Macau"], ["mg", "Madagaskar"],
      ["mw", "Malawi"], ["mv", "Maldiven"], ["my", "Maleisië"], ["ml", "Mali"], ["ma", "Marokko"],
      ["mh", "Marshalleilanden"], ["mr", "Mauritanië"], ["mu", "Mauritius"], ["mx", "Mexico"],
      ["fm", "Micronesië"], ["md", "Moldavië"], ["mc", "Monaco"], ["mn", "Mongolië"], ["me", "Montenegro"],
      ["mz", "Mozambique"], ["mm", "Myanmar"], ["na", "Namibië"], ["nr", "Nauru"], ["np", "Nepal"],
      ["ni", "Nicaragua"], ["ne", "Niger"], ["ng", "Nigeria"], ["kp", "Noord-Korea"], ["mk", "Noord-Macedonië"],
      ["nz", "Nieuw-Zeeland"], ["om", "Oman"], ["ug", "Oeganda"], ["ua", "Oekraïne"], ["uz", "Oezbekistan"],
      ["pw", "Palau"], ["ps", "Palestijnse gebieden"], ["pa", "Panama"], ["pg", "Papoea-Nieuw-Guinea"],
      ["py", "Paraguay"], ["pe", "Peru"], ["ph", "Filipijnen"], ["qa", "Qatar"], ["ru", "Rusland"],
      ["rw", "Rwanda"], ["sb", "Salomonseilanden"], ["ws", "Samoa"], ["sm", "San Marino"],
      ["st", "Sao Tomé en Principe"], ["sa", "Saoedi-Arabië"], ["sn", "Senegal"], ["rs", "Servië"],
      ["sc", "Seychellen"], ["sl", "Sierra Leone"], ["sg", "Singapore"], ["sx", "Sint Maarten"],
      ["lc", "Saint Lucia"], ["kn", "Saint Kitts en Nevis"], ["vc", "Saint Vincent en de Grenadines"],
      ["so", "Somalië"], ["lk", "Sri Lanka"], ["sd", "Soedan"], ["ss", "Zuid-Soedan"], ["sr", "Suriname"],
      ["sy", "Syrië"], ["tj", "Tadzjikistan"], ["tw", "Taiwan"], ["tz", "Tanzania"], ["th", "Thailand"],
      ["tl", "Oost-Timor"], ["tg", "Togo"], ["to", "Tonga"], ["tt", "Trinidad en Tobago"], ["tn", "Tunesië"],
      ["tr", "Turkije"], ["tm", "Turkmenistan"], ["tv", "Tuvalu"], ["uy", "Uruguay"], ["vu", "Vanuatu"],
      ["va", "Vaticaanstad"], ["ve", "Venezuela"], ["ae", "Verenigde Arabische Emiraten"],
      ["gb", "Verenigd Koninkrijk"], ["us", "Verenigde Staten"], ["vn", "Vietnam"], ["zm", "Zambia"],
      ["zw", "Zimbabwe"], ["za", "Zuid-Afrika"], ["kr", "Zuid-Korea"],
    ];
    const out = {
      eu: { id: "eu", name: "Ander EU-/EER-land", region: "eu", group: "eu", notes: euNote },
      world: { id: "world", name: "Ander land buiten de EU", region: "world", group: "world", notes: worldNote },
    };
    eu.forEach(([id, name]) => {
      if (!name) return;
      out[id] = { id, name, region: "eu", group: "eu", notes: extra[id] || euNote };
    });
    world.forEach(([id, name]) => {
      if (!name || id === "hrx") return;
      out[id] = { id, name, region: "world", group: "world", notes: extra[id] || worldNote };
    });
    return out;
  })(),

  phases: [
    {
      id: "orientatie",
      title: "Oriëntatie",
      when: "6–12 maanden voor vertrek",
      blurb: "Beslissen, land kiezen, fiscale en praktische haalbaarheid toetsen.",
    },
    {
      id: "voorbereiden",
      title: "Voorbereiden",
      when: "3–6 maanden voor vertrek",
      blurb: "Documenten, verzekeringen, AOW, woning en geldstromen vastzetten.",
    },
    {
      id: "afronden",
      title: "Afronden in NL",
      when: "1–3 maanden voor vertrek",
      blurb: "Abonnementen, bank, auto, zorg en belasting klaarzetten.",
    },
    {
      id: "vertrek",
      title: "Vertrekweek",
      when: "Laatste 5 dagen",
      blurb: "Uitschrijven BRP, bewijs bewaren, laatste sleutels en meters.",
    },
    {
      id: "aankomst",
      title: "Aankomst",
      when: "Eerste 30 dagen",
      blurb: "Inschrijven ter plaatse, adres doorgeven, lokale basis op orde.",
    },
    {
      id: "eerstejaar",
      title: "Eerste jaar",
      when: "Tot aangiftejaar + 1",
      blurb: "Emigratieaangifte, conserverende aanslag, RNI-adres, stemmen.",
    },
  ],

  tasks: [
    /* —— Oriëntatie —— */
    {
      id: "land-onderzoek",
      phase: "orientatie",
      cat: "praktisch",
      title: "Bestemming toetsen: wonen, zorg, belasting, bankieren",
      why: "Emigreren is drie systemen tegelijk: BRP, fiscale woonplaats en sociale zekerheid. Die vallen zelden op dezelfde dag samen.",
      links: [
        { label: "Nederland Wereldwijd — checklist", href: "https://www.nederlandwereldwijd.nl/checklist-verhuizen-buitenland-emigreren" },
        { label: "Belastingdienst — emigreren", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/emigreren-checklist" },
      ],
    },
    {
      id: "fiscaal-advies",
      phase: "orientatie",
      cat: "financieel",
      title: "Fiscale woonplaats en Box 3 / BV-structuur laten toetsen",
      why: "De gemeente schrijft je uit; de Belastingdienst bepaalt waar je woont voor de belasting. Bij vermogen, BV of aanmerkelijk belang is dat het duurste misverstand.",
      links: [
        { label: "Voorkomen dubbele belasting", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/voorkomen-dubbel-belasting-betalen" },
        { label: "Conserverende aanslag", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/conserverende-aanslag-bij-emigratie" },
      ],
    },
    {
      id: "aow-check",
      phase: "orientatie",
      cat: "financieel",
      title: "AOW-opbouw checken en vrijwillige verzekering overwegen",
      why: "Na uitschrijving bouw je meestal geen AOW meer op (2% korting per gemist jaar). Vrijwillig verzekeren bij de SVB kan, aanvraag vaak binnen 1 jaar na emigratie.",
      links: [
        { label: "AOW buiten Nederland", href: "https://www.nederlandwereldwijd.nl/aow-buiten-nederland/aow-krijgen" },
        { label: "Vrijwillig verzekeren SVB", href: "https://www.svb.nl/nl/aow/aow-opbouwen/vrijwillig-verzekeren" },
      ],
    },
    {
      id: "zorg-scenario",
      phase: "orientatie",
      cat: "administratief",
      title: "Zorgscenario bepalen (stopzetten, S1/CAK, of internationaal)",
      why: "Wonen + geen NL-inkomen: basisverzekering stopt meestal op uitschrijfdatum. Pensioen/uitkering in een verdragsland: vaak S1 via het CAK. Te vroeg opzeggen kan een CAK-boete geven.",
      links: [
        { label: "Zorgverzekering buitenland", href: "https://www.nederlandwereldwijd.nl/zorgverzekering-buitenland/check" },
        { label: "Het CAK — buitenland", href: "https://www.hetcak.nl/regelingen/buitenland" },
      ],
    },
    {
      id: "paspoort",
      phase: "orientatie",
      cat: "administratief",
      title: "Paspoort en ID-kaart checken / vernieuwen vóór vertrek",
      why: "Vanuit het buitenland is vernieuwen duurder en langzamer. ID-kaart is niet overal geldig; paspoort wel.",
      links: [
        { label: "Paspoort aanvragen", href: "https://www.rijksoverheid.nl/onderwerpen/paspoort-en-identiteitskaart" },
      ],
    },
    {
      id: "rijbewijs",
      phase: "orientatie",
      cat: "praktisch",
      title: "Rijbewijs vernieuwen als het bijna verloopt",
      why: "In de EU blijft een Nederlands rijbewijs geldig tot de einddatum. Buiten de EU gelden andere regels; vernieuw liever in Nederland.",
      links: [
        { label: "Rijbewijs in het buitenland", href: "https://www.nederlandwereldwijd.nl/rijbewijs-buitenland/geldig" },
      ],
    },
    {
      id: "woning-besluit",
      phase: "orientatie",
      cat: "praktisch",
      title: "Besluit: NL-woning verkopen, verhuren of aanhouden",
      why: "Aanhouden betekent VvE, verzekering, box 3 of eigenwoningregime, meterstanden en post. Verhuren heeft extra fiscale en VvE-regels.",
      flags: ["woning"],
    },
    {
      id: "visum",
      phase: "orientatie",
      cat: "administratief",
      title: "Visum of verblijfsvergunning aanvragen",
      why: "Buiten de EU/EER vaak verplicht en traag. Begin met de ambassade van het bestemmingsland.",
      dest: ["world"],
      links: [
        { label: "Ambassades overzicht", href: "https://www.rijksoverheid.nl/onderwerpen/ambassades-consulaten-en-overige-vertegenwoordigingen/overzicht-landen-en-gebieden" },
      ],
    },

    /* —— Voorbereiden —— */
    {
      id: "digid",
      phase: "voorbereiden",
      cat: "administratief",
      title: "DigiD versterken: app, ID-check, telefoonnummer, sms",
      why: "Zonder werkende DigiD val je na vertrek buiten MijnOverheid, Belastingdienst, SVB en RNI-adreswijziging. Doe ID-check terwijl je nog in NL bent.",
      links: [
        { label: "DigiD aanvragen", href: "https://www.digid.nl/aanvragen" },
        { label: "ID-check toevoegen", href: "https://www.digid.nl/stappenplan/id-check-toevoegen-aan-de-digid-app" },
      ],
    },
    {
      id: "berichtenbox",
      phase: "voorbereiden",
      cat: "administratief",
      title: "MijnOverheid Berichtenbox: RvIG aanvinken",
      why: "Zo krijg je herinneringen voor de periodieke RNI-adrescontrole.",
      links: [{ label: "MijnOverheid", href: "https://www.mijnoverheid.nl/" }],
    },
    {
      id: "documenten-map",
      phase: "voorbereiden",
      cat: "administratief",
      title: "Dossier maken: BSN, uitschrijfbewijs, aktes, polissen, jaaropgaven",
      why: "Je hebt het bewijs van uitschrijving later nodig bij zorgverzekeraar, bank, buitenlandse gemeente en soms de Belastingdienst. Scan alles dubbel (cloud + USB).",
    },
    {
      id: "legaliseren",
      phase: "voorbereiden",
      cat: "administratief",
      title: "Aktes legaliseren / apostille (geboorte, huwelijk, uittreksel BRP)",
      why: "Sommige landen willen een apostille van de rechtbank. Dat regel je het makkelijkst vanuit Nederland.",
      dest: ["world", "hr"],
      links: [
        { label: "Legaliseren Nederlandse documenten", href: "https://www.nederlandwereldwijd.nl/legaliseren/nederlandse-documenten" },
      ],
    },
    {
      id: "svb-vrijwillig",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Vrijwillige AOW/Anw-verzekering aanvragen bij de SVB",
      why: "Premie is inkomensafhankelijk. Aanvraagtermijn is krap; niet wachten tot na aankomst.",
      links: [{ label: "SVB vrijwillig verzekeren", href: "https://www.svb.nl/nl/aow/aow-opbouwen/vrijwillig-verzekeren" }],
    },
    {
      id: "bank-gesprek",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Bank: niet-ingezetene, buitenlands adres, extra rekening",
      why: "Sommige banken sluiten of beperken rekeningen van niet-ingezetenen. Vraag schriftelijk wat er gebeurt met iDEAL, creditcard, beleggen en een eventuele BV-rekening.",
      email: "bank-niet-ingezetene",
    },
    {
      id: "voorlopige-aanslag",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Voorlopige aanslag stopzetten of aanpassen",
      why: "Maandelijkse teruggave of betaling is gebaseerd op wonen in Nederland. Laat die niet doorlopen.",
      links: [
        { label: "Voorlopige aanslag wijzigen", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/hoe-kan-ik-mijn-voorlopige-aanslag-stoppen" },
      ],
    },
    {
      id: "toeslagen",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Toeslagen controleren en wijziging doorgeven",
      why: "Zorg-, huur- en kinderopvangtoeslag stoppen of wijzigen vaak per emigratiedatum. Te laat doorgeven = terugvordering.",
      links: [
        { label: "Toeslagen bij verhuizing naar buitenland", href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/toeslagen/wijzigingen_doorgeven/welke_wijzigingen_moet_ik_doorgeven/wonen/ik_verhuis_naar_het_buitenland/ik_verhuis_naar_het_buitenland" },
      ],
      email: "toeslagen",
    },
    {
      id: "verhuizer",
      phase: "voorbereiden",
      cat: "praktisch",
      title: "Internationale verhuizer of container plannen",
      why: "Inboedel naar een EU-land is eenvoudiger dan naar buiten de EU (douane). Plan 8–12 weken vooruit in het seizoen.",
    },
    {
      id: "huisdieren",
      phase: "voorbereiden",
      cat: "praktisch",
      title: "Huisdieren: chip, EU-paspoort, rabiës, timing dierenarts",
      why: "Binnen de EU: dierenpaspoort en geldige rabiësenting. Timing is strikt.",
      flags: ["huisdier"],
    },
    {
      id: "hr-woning",
      phase: "voorbereiden",
      cat: "praktisch",
      title: "Kroatië: woning, notaris, landregister en nuts aansluiten",
      why: "Koop loopt via javni bilježnik (notaris) en zemljišne knjige. Reserveer tijd voor OIB vóór de akte.",
      dest: ["hr"],
    },

    /* —— Afronden —— */
    {
      id: "zorg-opzeggen",
      phase: "afronden",
      cat: "administratief",
      title: "Zorgverzekeraar informeren — opzeggen ná uitschrijving, niet ervoor",
      why: "De verplichting loopt tot de uitschrijfdatum. Te vroeg stopzetten kan een boete van het CAK opleveren. Stuur het uitschrijfbewijs mee.",
      email: "zorgverzekeraar",
      links: [{ label: "Check jouw situatie", href: "https://www.nederlandwereldwijd.nl/zorgverzekering-buitenland/check" }],
    },
    {
      id: "overige-verzekeringen",
      phase: "afronden",
      cat: "financieel",
      title: "Inboedel, WA, rechtsbijstand, reis- en autoverzekering wijzigen",
      why: "Een NL-inboedelpolis dekt zelden een buitenlandse woning. Auto die meegaat heeft een andere dekking nodig vanaf uitvoer.",
      email: "verzekeraar",
    },
    {
      id: "abonnementen",
      phase: "afronden",
      cat: "praktisch",
      title: "Abonnementen opzeggen: energie, water, internet, tv, sport, tijdschriften",
      why: "Energie en telecom hebben opzegtermijnen. Noteer meterstanden op de vertrekdag.",
      email: "energie",
    },
    {
      id: "post",
      phase: "afronden",
      cat: "praktisch",
      title: "Post doorsturen of een postadres in NL regelen",
      why: "Overheid en banken sturen soms nog papier. Een vast NL-contactadres plus RNI-adres voorkomt kwijtgeraakte brieven.",
    },
    {
      id: "auto-export",
      phase: "afronden",
      cat: "praktisch",
      title: "Auto: uitvoer bij RDW of schorsen / overschrijven",
      why: "Meenemen: uitvoer bij RDW vóór inschrijving in het nieuwe land, check BPM-teruggaaf. Achterlaten: schorsen of overschrijven.",
      links: [
        { label: "Voertuig exporteren — RDW", href: "https://www.rdw.nl/invoeren-exporteren-doorvoeren/voertuig-exporteren" },
        { label: "BPM-teruggaaf export", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/teruggaaf-bpm-export-gebruikt-motorrijtuig" },
      ],
    },
    {
      id: "camper-export",
      phase: "afronden",
      cat: "praktisch",
      title: "Camper: uitvoer bij RDW of schorsen / overschrijven",
      why: "Een camper is een motorrijtuig. Meenemen: RDW-uitvoer vóór lokale inschrijving, BPM-teruggaaf checken. Achterlaten: schorsen of op naam van een ander.",
      links: [
        { label: "Voertuig exporteren — RDW", href: "https://www.rdw.nl/invoeren-exporteren-doorvoeren/voertuig-exporteren" },
        { label: "BPM-teruggaaf export", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/teruggaaf-bpm-export-gebruikt-motorrijtuig" },
      ],
    },
    {
      id: "caravan-export",
      phase: "afronden",
      cat: "praktisch",
      title: "Caravan: RDW-kenteken, verzekering en stalling",
      why: "Heeft de caravan een NL-kenteken: uitvoer, schorsen of overschrijven bij de RDW. Geen kenteken: eigendomsbewijs, verzekering en stallingcontract opzeggen of meenemen. Check of het nieuwe land een aanhanger apart inschrijft.",
      links: [
        { label: "Voertuig exporteren — RDW", href: "https://www.rdw.nl/invoeren-exporteren-doorvoeren/voertuig-exporteren" },
      ],
    },
    {
      id: "boot-export",
      phase: "afronden",
      cat: "praktisch",
      title: "Boot: RDW-registratie, ligplaats en uitvoer",
      why: "Een snelle RIB met registratienummer staat bij de RDW als (klein) pleziervaartuig. Meenemen: uitvoer of wijziging van de registratie vóór lokale inschrijving, plus casco/WA. Achterlaten: registratie wijzigen of beëindigen. Ligplaats- of stallingcontract opzeggen. Trailer met kenteken apart via de RDW. Uitvoer uit de EU: BTW-status meenemen.",
      links: [
        { label: "RDW — vaartuig registreren", href: "https://www.rdw.nl/vaartuig/kopen-en-verkopen/vaartuig-registreren" },
        { label: "RDW — registratie aanpassen of stoppen", href: "https://www.rdw.nl/vaartuig/registratie-aanpassen" },
      ],
    },
    {
      id: "trailer-export",
      phase: "afronden",
      cat: "praktisch",
      title: "Trailer: uitvoer bij RDW of schorsen / overschrijven",
      why: "Een boottrailer heeft een eigen kenteken, los van de RIB. Meenemen: RDW-uitvoer vóór inschrijving in het nieuwe land. Achterlaten: schorsen of overschrijven. Check verzekering en APK-plicht.",
      links: [
        { label: "Voertuig exporteren — RDW", href: "https://www.rdw.nl/invoeren-exporteren-doorvoeren/voertuig-exporteren" },
      ],
    },
    {
      id: "vve",
      phase: "afronden",
      cat: "administratief",
      title: "VvE en eventuele huurders informeren over adres en volmacht",
      why: "Een VvE moet je kunnen bereiken. Regel een volmacht als je ALV’s niet zelf bijwoont.",
      flags: ["woning"],
      email: "vve",
    },
    {
      id: "werk-uitkering",
      phase: "afronden",
      cat: "financieel",
      title: "UWV / pensioenfonds / uitkeringsinstantie melden",
      why: "WAO/WIA, pensioen of WW hebben eigen exportregels. Melden vóór vertrek voorkomt terugvordering.",
      flags: ["uitkering"],
      email: "uwv",
    },
    {
      id: "duo",
      phase: "afronden",
      cat: "financieel",
      title: "DUO: contactgegevens en aflossing bij studieschuld",
      dest: [],
      links: [{ label: "Mijn DUO", href: "https://duo.nl/particulier/inloggen-op-mijn-duo.jsp" }],
    },
    {
      id: "gemeente-afspraak",
      phase: "afronden",
      cat: "administratief",
      title: "Afspraak Burgerzaken maken voor uitschrijving",
      why: "Vaak alleen aan de balie, in de laatste 5 dagen voor vertrek. Neem paspoort mee en het buitenlandse adres (of een postadres).",
      links: [{ label: "Hoe uitschrijven BRP", href: "https://www.nederlandwereldwijd.nl/brp/hoe-uitschrijven-brp" }],
    },

    /* —— Vertrekweek —— */
    {
      id: "uitschrijven",
      phase: "vertrek",
      cat: "administratief",
      title: "Uitschrijven bij de gemeente (BRP → RNI)",
      why: "Verplicht bij >8 maanden buiten NL in 12 maanden. Doe het in de laatste 5 dagen. Vraag altijd een bewijs van uitschrijving.",
      links: [
        { label: "Wanneer uitschrijven", href: "https://www.nederlandwereldwijd.nl/brp/wanneer-uitschrijven-gemeente" },
        { label: "Bewijs van uitschrijving", href: "https://www.nederlandwereldwijd.nl/brp/bewijs-uitschrijving-gemeente" },
      ],
    },
    {
      id: "bewijs-bewaren",
      phase: "vertrek",
      cat: "administratief",
      title: "Bewijs van uitschrijving scannen en op twee plekken bewaren",
      why: "Zorgverzekeraar, bank, Belastingdienst en buitenlandse gemeente vragen erom. Papier alleen is te kwetsbaar.",
    },
    {
      id: "meters-sleutels",
      phase: "vertrek",
      cat: "praktisch",
      title: "Meterstanden, sleutels, alarmcodes, laatste foto’s van de staat",
      why: "Voorkomt nazorgdiscussies met koper, huurder of VvE.",
    },
    {
      id: "reisadvies",
      phase: "vertrek",
      cat: "praktisch",
      title: "Aanmelden bij de Informatiesservice van Nederland Wereldwijd",
      links: [{ label: "Informatieservice", href: "https://informatieservice.nederlandwereldwijd.nl/" }],
    },

    /* —— Aankomst —— */
    {
      id: "lokaal-inschrijven",
      phase: "aankomst",
      cat: "administratief",
      title: "Inschrijven bij de lokale gemeente (niet bij de NL-ambassade)",
      why: "In Kroatië: općina / grad, prebivalište. Bewijs van NL-uitschrijving meenemen.",
      dest: ["hr", "eu", "world"],
    },
    {
      id: "oib",
      phase: "aankomst",
      cat: "administratief",
      title: "Kroatië: OIB (persoonsnummer) aanvragen",
      why: "Nodig voor bank, notaris, nuts, belasting. Vaak via Porezna uprava of via de notaris bij aankoop.",
      dest: ["hr"],
    },
    {
      id: "rni-adres",
      phase: "aankomst",
      cat: "administratief",
      title: "Buitenlands adres doorgeven in de RNI",
      why: "De gemeente geeft het door, maar controleer zelf. Later wijzigen kan online met DigiD.",
      links: [{ label: "RNI-adres wijzigen", href: "https://www.nederlandwereldwijd.nl/rni/adres-wijzigen" }],
    },
    {
      id: "lokale-zorg",
      phase: "aankomst",
      cat: "administratief",
      title: "Lokale of internationale zorgverzekering activeren",
      why: "Gat tussen NL-stop en lokale start is voor eigen rekening. Bij NL-pensioen in de EU: S1 / CAK eerst.",
    },
    {
      id: "lokale-bank",
      phase: "aankomst",
      cat: "financieel",
      title: "Lokale bankrekening openen en vaste lasten omzetten",
    },
    {
      id: "auto-inschrijven",
      phase: "aankomst",
      cat: "praktisch",
      title: "Auto lokaal inschrijven na RDW-uitvoer",
    },
    {
      id: "camper-inschrijven",
      phase: "aankomst",
      cat: "praktisch",
      title: "Camper lokaal inschrijven na RDW-uitvoer",
    },
    {
      id: "caravan-inschrijven",
      phase: "aankomst",
      cat: "praktisch",
      title: "Caravan ter plaatse stallen of inschrijven",
    },
    {
      id: "boot-ligplaats",
      phase: "aankomst",
      cat: "praktisch",
      title: "Boot: lokale registratie of RDW-status afronden, ligplaats regelen",
      why: "Na RDW-uitvoer inschrijven of melden in het nieuwe land als dat verplicht is. Ligplaats vastleggen. Bewaar het oude registratienummer en de uitvoerbevestiging.",
    },
    {
      id: "trailer-inschrijven",
      phase: "aankomst",
      cat: "praktisch",
      title: "Trailer lokaal inschrijven na RDW-uitvoer",
    },

    /* —— Eerste jaar —— */
    {
      id: "emigratieaangifte",
      phase: "eerstejaar",
      cat: "financieel",
      title: "Aangifte doen over het jaar van emigratie (M-biljet / part year)",
      why: "In het emigratiejaar ben je een deel van het jaar binnenlands belastingplichtig. De aangifte is anders dan een gewoon jaar.",
      links: [
        { label: "Aangifte jaar van emigratie", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/deels-niet-in-nederland-wonen-m-aangifte-doen" },
      ],
    },
    {
      id: "buitenlands-plichtig",
      phase: "eerstejaar",
      cat: "financieel",
      title: "Check: buitenlands belastingplichtig voor NL-inkomen of -bezit",
      why: "Woning, box 3, pensioen of BV in Nederland kunnen aangifteplicht houden. Vraag zo nodig een vrijstellingsverklaring loonheffing.",
      links: [
        { label: "Wonen in het buitenland — NL-inkomen", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/wonen-in-het-buitenland-nederlands-inkomen" },
      ],
    },
    {
      id: "stemmen",
      phase: "eerstejaar",
      cat: "administratief",
      title: "Kiesregister gemeente Den Haag — stemmen vanuit het buitenland",
      links: [{ label: "Stemmen buiten Nederland", href: "https://www.nederlandwereldwijd.nl/stemmen-buiten-nederland" }],
    },
    {
      id: "rni-onderhouden",
      phase: "eerstejaar",
      cat: "administratief",
      title: "RNI-adres jaarlijks controleren",
      why: "Verouderd adres = kwijtgeraakte post van Belastingdienst en SVB.",
    },
  ],

  emails: [
    {
      id: "gemeente-uitschrijving",
      title: "Gemeente — afspraak uitschrijving BRP",
      toHint: "Burgerzaken van je woongemeente",
      subject: "Afspraak uitschrijving BRP / emigratie per {{datum}}",
      body: `Geachte heer/mevrouw,

Ik woon op {{adres_nl}} en emigreer per {{datum}} naar {{bestemming}}.

Graag maak ik een afspraak om mij uit te schrijven uit de Basisregistratie Personen in de laatste vijf dagen voor vertrek. Wilt u bevestigen:

1. of uitschrijving aan de balie moet of ook schriftelijk/online kan;
2. welke documenten ik meeneem (paspoort, nieuw adres / postadres);
3. of ik ter plaatse een bewijs van uitschrijving meekrijg;
4. of mijn gegevens in de Registratie Niet-Ingezetenen (RNI) worden opgenomen.

Nieuw (post)adres:
{{adres_buitenland}}

Met vriendelijke groet,
{{naam}}
{{telefoon}}
{{email}}
BSN: {{bsn}}`,
    },
    {
      id: "zorgverzekeraar",
      title: "Zorgverzekeraar — emigratie doorgeven",
      toHint: "Klantenservice van je zorgverzekeraar",
      subject: "Emigratie per {{datum}} — beëindigen basisverzekering",
      body: `Geachte heer/mevrouw,

Hierbij meld ik dat ik per {{datum}} emigreer naar {{bestemming}} en mij op die datum laat uitschrijven bij mijn Nederlandse gemeente.

Polisnummer: {{polis}}
Naam: {{naam}}
Geboortedatum: {{geboortedatum}}
BSN: {{bsn}}

Wilt u de basisverzekering (en eventuele aanvullende verzekering) beëindigen per de uitschrijfdatum — niet eerder — en mij een schriftelijke bevestiging sturen?

In de bijlage vindt u het bewijs van uitschrijving zodra ik dat van de gemeente heb. Als u dat bewijs nodig heeft vóór verwerking, hoor ik graag hoe ik het kan aanleveren.

Met vriendelijke groet,
{{naam}}
{{telefoon}}
{{email}}`,
    },
    {
      id: "bank-niet-ingezetene",
      title: "Bank — status niet-ingezetene",
      toHint: "Je private banker of klantenservice",
      subject: "Woonadres buitenland per {{datum}} — voortzetting rekeningen",
      body: `Geachte heer/mevrouw,

Per {{datum}} verhuis ik naar {{bestemming}} en schrijf ik mij uit bij mijn Nederlandse gemeente. Ik wil mijn bankrelatie graag voortzetten.

Rekeningnummers:
{{rekeningen}}

Kunt u schriftelijk bevestigen:
1. of particuliere rekeningen van een niet-ingezetene open mogen blijven;
2. welke identificatie of bron-van-vermogen u opnieuw nodig heeft;
3. of beleggen, iDEAL en creditcard wijzigen;
4. welk correspondentieadres u wilt voeren;
5. of er gevolgen zijn voor een eventuele zakelijke rekening.

Nieuw correspondentieadres:
{{adres_buitenland}}

Met vriendelijke groet,
{{naam}}
{{telefoon}}
{{email}}`,
    },
    {
      id: "belastingdienst",
      title: "Belastingdienst — adres en emigratie",
      toHint: "Belastingdienst/Kennis- en Expertisecentrum Buitenland, Postbus 2891, 6401 DJ Heerlen",
      subject: "Adreswijziging buiten Nederland / emigratie per {{datum}}",
      body: `Geachte heer/mevrouw,

Ik emigreer per {{datum}} naar {{bestemming}}. Mijn gemeente geeft de uitschrijving door; ter zekerheid geef ik mijn correspondentieadres zelf door.

Naam: {{naam}}
BSN: {{bsn}}
Oud adres: {{adres_nl}}
Nieuw adres: {{adres_buitenland}}

Wilt u dit adres gebruiken voor alle post, inclusief de aangifte over het jaar van emigratie?

Met vriendelijke groet,
{{naam}}
{{telefoon}}
{{email}}`,
    },
    {
      id: "svb",
      title: "SVB — AOW / vrijwillige verzekering",
      toHint: "Sociale Verzekeringsbank",
      subject: "Emigratie per {{datum}} — AOW-opbouw en vrijwillige verzekering",
      body: `Geachte heer/mevrouw,

Per {{datum}} emigreer ik naar {{bestemming}}.

Naam: {{naam}}
BSN: {{bsn}}
Geboortedatum: {{geboortedatum}}

Ik verzoek u:
1. te bevestigen tot welke datum ik verplicht verzekerd ben voor de AOW;
2. mij te informeren over vrijwillige verzekering AOW/Anw, premie en aanvraagtermijn;
3. mijn correspondentieadres te wijzigen naar:
{{adres_buitenland}}

Met vriendelijke groet,
{{naam}}
{{telefoon}}
{{email}}`,
    },
    {
      id: "toeslagen",
      title: "Belastingdienst Toeslagen — wijziging doorgeven",
      toHint: "Toeslagen via MijnToeslagen of schriftelijk",
      subject: "Wijziging: verhuizing naar het buitenland per {{datum}}",
      body: `Geachte heer/mevrouw,

Per {{datum}} verhuis ik naar {{bestemming}} en woon ik niet langer in Nederland.

Naam: {{naam}}
BSN: {{bsn}}

Wilt u beoordelen of zorgtoeslag, huurtoeslag of andere toeslagen stoppen of wijzigen per die datum, en mij een bevestiging sturen?

Met vriendelijke groet,
{{naam}}`,
    },
    {
      id: "energie",
      title: "Energie / water / netbeheerder — einde levering",
      toHint: "Je energieleverancier",
      subject: "Einde levering per {{datum}} wegens emigratie — {{adres_nl}}",
      body: `Geachte heer/mevrouw,

Per {{datum}} vertrek ik van {{adres_nl}} omdat ik emigreer naar {{bestemming}}.

Klantnummer: {{klantnummer}}
EAN-codes: {{ean}}

Wilt u de levering beëindigen per die datum? Meterstanden stuur ik op de vertrekdag na. Eindafrekening graag naar:
{{adres_buitenland}}
of per e-mail naar {{email}}.

Met vriendelijke groet,
{{naam}}
{{telefoon}}`,
    },
    {
      id: "verzekeraar",
      title: "Schadeverzekeraar — polissen wijzigen",
      toHint: "Inboedel / WA / auto / rechtsbijstand",
      subject: "Emigratie per {{datum}} — aanpassen of beëindigen polissen",
      body: `Geachte heer/mevrouw,

Per {{datum}} emigreer ik naar {{bestemming}}.

Polisnummers:
{{polis}}

Wilt u per polis aangeven of beëindigen, schorsen of aanpassen nodig is (woning achterblijft / auto mee / WA in het nieuwe land)? Bevestiging graag schriftelijk.

Correspondentie:
{{adres_buitenland}}

Met vriendelijke groet,
{{naam}}`,
    },
    {
      id: "vve",
      title: "VvE-beheerder — nieuw adres en volmacht",
      toHint: "Bestuur of beheerder van de VvE",
      subject: "Adreswijziging eigenaar / emigratie per {{datum}}",
      body: `Beste bestuur / beheerder,

Per {{datum}} woon ik niet langer in Nederland ({{bestemming}}). Unit: {{unit}}.

Correspondentieadres:
{{adres_buitenland}}
E-mail: {{email}}
Telefoon: {{telefoon}}

Ik blijf eigenaar. Wilt u dit adres in de ledenadministratie zetten? Als de splitsingsakte of het HR een volmacht voor de ALV verlangt, stuur ik die na.

Met vriendelijke groet,
{{naam}}`,
    },
    {
      id: "uwv",
      title: "UWV — verhuizing naar het buitenland",
      toHint: "UWV, indien uitkering",
      subject: "Verhuizing naar {{bestemming}} per {{datum}}",
      body: `Geachte heer/mevrouw,

Per {{datum}} verhuis ik naar {{bestemming}}.

Naam: {{naam}}
BSN: {{bsn}}
Klantnummer: {{klantnummer}}

Wilt u bevestigen wat dit betekent voor mijn uitkering en welke documenten u nodig heeft vóór vertrek?

Nieuw adres:
{{adres_buitenland}}

Met vriendelijke groet,
{{naam}}`,
    },
    {
      id: "hr-opcine",
      title: "Kroatië — općina / inschrijving prebivalište",
      toHint: "Lokale općina of grad waar je gaat wonen",
      subject: "Prijava prebivališta / registration of residence — {{naam}}",
      body: `Poštovani,

Doseljavam u vašu općinu / I am moving to your municipality.

Ime i prezime / Name: {{naam}}
Datum dolaska / Arrival: {{datum}}
Adresa / Address: {{adres_buitenland}}
Državljanstvo / Citizenship: Nizozemsko / Dutch

Molim informacije koje dokumente trebam za prijavu prebivališta i zahtjev za OIB
(proof of deregistration from the Netherlands, passport, lease or deed, etc.).

Hvala,
{{naam}}
{{email}}
{{telefoon}}`,
    },
  ],
};
