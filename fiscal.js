/* Fiscale laag — geen advies, wel de kaart van het terrein */
(function () {
  const extraTasks = [
    {
      id: "woonplaats-dossier",
      phase: "orientatie",
      cat: "financieel",
      title: "Dossier fiscale woonplaats: banden met NL verbreken of documenteren",
      why: "Art. 4 AWR: woonplaats naar omstandigheden. Geen 183-dagenknop. Een beschikbare woning, gezin of feitelijke leiding van een BV in NL kan de emigratie onderuit halen.",
      links: [
        { label: "Emigreer ik? (Belastingdienst)", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/emigreren-checklist" },
      ],
    },
    {
      id: "peildatum-box3",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Peildatum 1 januari: box 3-foto van het emigratiejaar vastleggen",
      why: "Ook in een gebroken jaar blijft 1 januari de peildatum voor de grondslag sparen en beleggen. Screenshot/export van bank, broker en crypto-wallets op die datum bewaren.",
      flags: ["vermogen", "crypto"],
    },
    {
      id: "ab-exit",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Aanmerkelijk belang: fictieve vervreemding en conserverende aanslag box 2",
      why: "Emigratie van een AB-houder (≥5%) is een fictieve vervreemding. De claim is in beginsel onbeperkt geldig. Dividend na vertrek kan uitstel naar rato beëindigen.",
      flags: ["ab"],
      links: [
        { label: "Conserverende aanslag", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/conserverende-aanslag-bij-emigratie" },
      ],
    },
    {
      id: "ca-pensioen",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Pensioen en lijfrente: waarde opvragen voor te conserveren inkomen",
      why: "Bij afgetrokken premies volgt bijna altijd een conserverende aanslag. AOW zelf zit daar niet in. Afkoop in de eerste tien jaar kan invordering + revisierente triggeren.",
      flags: ["pensioen", "uitkering"],
    },
    {
      id: "bronheffing-vrijstelling",
      phase: "afronden",
      cat: "financieel",
      title: "Vrijstellingsverklaring loonheffing aanvragen (pensioen/uitkering)",
      why: "Woont het verdrag de heffing (deels) toe aan het woonland, dan voorkom je dat NL te veel inhoudt. Formulier Aanvraag vrijstellingsverklaring.",
      flags: ["uitkering", "pensioen"],
      links: [
        { label: "Vrijstellingsverklaring", href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/programmas_en_formulieren/verzoek_vrijstelling_inhouding_loonbelasting_premie_volksverzekeringen" },
      ],
    },
    {
      id: "m-biljet",
      phase: "eerstejaar",
      cat: "financieel",
      title: "Aangifte M / jaar van emigratie: te conserveren inkomen invullen",
      why: "Vraag 95 e.d. op het M-biljet is verplicht bij emigratie. De aangifte geldt vaak als verzoek om uitstel van betaling van de conserverende aanslag.",
      links: [
        { label: "Aangifte jaar van emigratie", href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/deels-niet-in-nederland-wonen-m-aangifte-doen" },
      ],
    },
    {
      id: "kbb-toets",
      phase: "eerstejaar",
      cat: "financieel",
      title: "Toets kwalificerend buitenlands belastingplichtige (90%-regel)",
      why: "Alleen relevant als bijna al je wereldinkomen in NL belast blijft. Bij vermogen of buitenlands inkomen val je er meestal buiten — dan geen NL-schijven/heffingskortingen zoals een inwoner.",
    },
    {
      id: "crypto-basis",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Crypto: kostprijs per lot, aankoopdata en wallets vastleggen vóór vertrek",
      why: "NL kent nu geen exit tax op privé-crypto in box 3. Het nieuwe woonland wel een vermogenswinstbelasting (Kroatië: 12% binnen 2 jaar, daarna vaak vrij). Zonder kostprijs betaal je te veel.",
      flags: ["crypto"],
    },
    {
      id: "box3-schets",
      phase: "orientatie",
      cat: "financieel",
      title: "Box 3-schets invullen op het tabblad Fiscaal",
      why: "Peildatum 1 januari van het emigratiejaar. Bank, beleggingen (incl. crypto) en schulden apart. Na echte emigratie valt roerend vermogen meestal buiten NL-box 3; NL-vastgoed blijft.",
      flags: ["vermogen", "crypto"],
    },
    {
      id: "aow-jaren",
      phase: "orientatie",
      cat: "financieel",
      title: "AOW-jaren tot nu zetten en korting bij stopzetten inschatten",
      why: "Per jaar zonder verzekering 2% minder AOW. Vrijwillig verzekeren bij de SVB kan, meestal aanvragen binnen een jaar na emigratie.",
    },
    {
      id: "budget-jaar1",
      phase: "voorbereiden",
      cat: "financieel",
      title: "Eerstejaarsbegroting: zorg, wonen, verhuizing, reservepot",
      why: "Nederlandse zorgpremie stopt meestal op uitschrijfdatum. CAK/S1 is iets anders dan een premie bij een zorgverzekeraar. Zet beide scenario’s in de schets.",
    },
  ];

  const extraEmails = [
    {
      id: "fiscalist",
      title: "Fiscalist — intake emigratie",
      toHint: "Je belastingadviseur of een specialist internationaal",
      subject: "Intake fiscale emigratie naar {{bestemming}} per {{datum}}",
      body: `Beste,

Ik bereid fiscale emigratie voor naar {{bestemming}}, beoogde datum {{datum}}.

Graag een schriftelijke analyse van:
1. fiscale woonplaats (art. 4 AWR) versus BRP-uitschrijving;
2. wat na vertrek in Nederland belast blijft (woning, box 3-onroerend goed, box 2);
3. of een conserverende aanslag volgt (pensioen, lijfrente, aanmerkelijk belang);
4. toepassing van het belastingverdrag NL–woonland op pensioen, dividend en vermogen;
5. peildatum box 3 in het emigratiejaar en aangifte M;
6. of een Beleggings-BV / holding de positie verbetert of verslechtert.

Correspondentie:
{{adres_buitenland}}
{{email}}
{{telefoon}}

Met vriendelijke groet,
{{naam}}`,
    },
  ];

  if (window.EMIGREER_DATA) {
    EMIGREER_DATA.tasks = EMIGREER_DATA.tasks.concat(extraTasks);
    EMIGREER_DATA.emails = EMIGREER_DATA.emails.concat(extraEmails);
  }

  window.EMIGREER_CIJFERS = {
    jaar: 2026,
    bijgewerkt: "2026-09-30",
    box3: {
      bankPct: 1.28,
      belegPct: 6,
      schuldPct: 2.7,
      tariefPct: 36,
      heffingvrij: 59357,
      schuldDrempel: 3800,
    },
    aow: {
      alleenstaandBruto: 1662.16,
      alleenstaandNetto: 1581.55,
      vanaf: "2026-07-01",
      bron: "https://www.svb.nl/nl/aow/bedragen-aow/aow-bedragen",
    },
    bronBox3: "https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/berekening-box-3-inkomen-2026",
  };

  window.EMIGREER_FISCAL = {
    ties: [
      { id: "woning-nl", label: "Ik houd een gemeubileerde woning in NL die voor mij beschikbaar blijft" },
      { id: "gezin-nl", label: "Partner of gezin blijft in Nederland wonen" },
      { id: "tijd-nl", label: "Ik verwacht een groot deel van het jaar in Nederland door te brengen" },
      { id: "werk-nl", label: "Werk, klanten of feitelijke leiding van een BV blijven in NL" },
      { id: "arts-nl", label: "Huisarts, specialist of vaste zorg blijven in Nederland" },
      { id: "sociaal-nl", label: "Verenigingen, kerk, club of vast sociaal leven blijven in NL" },
      { id: "bank-nl", label: "Hoofdbankieren, creditcardpatroon en post blijven Nederlands" },
      { id: "intentie", label: "Ik heb nog geen duurzaam tehuis in het nieuwe land" },
    ],
    afterBoxes: [
      {
        box: "Box 1",
        blijft: "Nederlandse eigen woning (als die nog ‘eigen woning’ is), bepaalde NL-arbeid, soms pensioen als het verdrag bronheffing toestaat.",
        valtAf: "Wereldinkomen uit arbeid of onderneming die na echte emigratie in het woonland thuishoort.",
      },
      {
        box: "Box 2",
        blijft: "Aanmerkelijk belang in een in NL gevestigde vennootschap. Emigratie = fictieve vervreemding + conserverende aanslag. Dividend kan uitstel deels openbreken.",
        valtAf: "—",
      },
      {
        box: "Box 3",
        blijft: "Onroerend goed in Nederland (vakantiehuis, verhuurde unit, erfpacht, vruchtgebruik) en daarbij horende schulden. Peildatum blijft 1 januari.",
        valtAf: "NL-bankrekening, effecten, crypto in privé, buitenlands vastgoed — die laat NL als niet-inwoner doorgaans los.",
      },
    ],
  };
})();
