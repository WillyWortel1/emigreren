(() => {
  const STORAGE = "emigreren.v1";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const defaultState = () => ({
    profile: {
      naam: "",
      email: "",
      telefoon: "",
      geboortedatum: "",
      bsn: "",
      adres_nl: "",
      adres_buitenland: "",
      bestemming: "",
      datum: "",
      polis: "",
      rekeningen: "",
      klantnummer: "",
      ean: "",
      unit: "",
      flags: { woning: false, auto: false, camper: false, caravan: false, boot: false, trailer: false, huisdier: false, uitkering: false, vermogen: false, ab: false, pensioen: false, crypto: false },
    },
    done: {},
    notes: "",
    tab: "plan",
    filterPhase: "all",
    filterCat: "all",
    ties: {},
    people: [],
    media: {},
    mediaExtra: [],
  });

  let state = load();

  function load() {
    const base = defaultState();
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return base;
      const parsed = JSON.parse(raw);
      return {
        ...base,
        ...parsed,
        profile: {
          ...base.profile,
          ...(parsed.profile || {}),
          flags: { ...base.profile.flags, ...((parsed.profile && parsed.profile.flags) || {}) },
        },
        ties: { ...base.ties, ...(parsed.ties || {}) },
        people: Array.isArray(parsed.people) ? parsed.people : [],
        media: { ...(parsed.media || {}) },
        mediaExtra: Array.isArray(parsed.mediaExtra) ? parsed.mediaExtra : [],
      };
    } catch {
      return base;
    }
  }
  function save() {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  }

  function dest() {
    return (
      EMIGREER_DATA.destinations[state.profile.bestemming] || {
        id: "",
        name: "Geen bestemming",
        region: "",
        notes: "Kies eerst een bestemming in het dossier. Taken en e-mails volgen daarna het land.",
      }
    );
  }

  function destOptions() {
    const none = `<option value="" ${!state.profile.bestemming ? "selected" : ""}>Kies een bestemming</option>`;
    const all = Object.values(EMIGREER_DATA.destinations);
    const pick = (group) =>
      all
        .filter((d) => d.group === group && d.id !== "eu" && d.id !== "world")
        .sort((a, b) => a.name.localeCompare(b.name, "nl"))
        .map((d) => `<option value="${d.id}" ${state.profile.bestemming === d.id ? "selected" : ""}>${d.name}</option>`)
        .join("");
    const generic = (id) => {
      const d = EMIGREER_DATA.destinations[id];
      return `<option value="${d.id}" ${state.profile.bestemming === d.id ? "selected" : ""}>${d.name}</option>`;
    };
    return `${none}<optgroup label="EU, EER en Zwitserland">${pick("eu")}${generic("eu")}</optgroup><optgroup label="Buiten de EU">${pick("world")}${generic("world")}</optgroup>`;
  }

  function visibleTasks() {
    const d = dest();
    return EMIGREER_DATA.tasks.filter((t) => {
      if (t.dest && t.dest.length && !t.dest.includes(d.id) && !t.dest.includes(d.region)) {
        /* show world-only only for world; hr-only for hr; eu tasks for eu+hr */
        const ok =
          t.dest.includes(d.id) ||
          (d.region === "eu" && t.dest.includes("eu")) ||
          (d.id === "hr" && t.dest.includes("hr"));
        if (!ok) return false;
      }
      if (t.flags && t.flags.length && !t.flags.some((f) => state.profile.flags[f])) return false;
      return true;
    });
  }

  function fillTemplate(str) {
    const p = state.profile;
    const map = {
      naam: p.naam || "[naam]",
      email: p.email || "[e-mail]",
      telefoon: p.telefoon || "[telefoon]",
      geboortedatum: p.geboortedatum || "[geboortedatum]",
      bsn: p.bsn || "[BSN]",
      adres_nl: p.adres_nl || "[adres in Nederland]",
      adres_buitenland: p.adres_buitenland || "[adres in het buitenland]",
      bestemming: dest().id ? dest().name : "[bestemming]",
      datum: formatDate(p.datum) || "[vertrekdatum]",
      polis: p.polis || "[polisnummer]",
      rekeningen: p.rekeningen || "[IBAN]",
      klantnummer: p.klantnummer || "[klantnummer]",
      ean: p.ean || "[EAN]",
      unit: p.unit || "[unit / adres VvE]",
    };
    return str.replace(/\{\{(\w+)\}\}/g, (_, k) => map[k] ?? "");
  }

  function formatDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}-${m}-${y}`;
  }

  function daysUntil() {
    if (!state.profile.datum) return null;
    const t = new Date(state.profile.datum + "T12:00:00");
    const n = new Date();
    return Math.ceil((t - n) / 86400000);
  }

  function progress() {
    const tasks = visibleTasks();
    const done = tasks.filter((t) => state.done[t.id]).length;
    return { done, total: tasks.length, pct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 };
  }

  function phaseProgress(phaseId) {
    const tasks = visibleTasks().filter((t) => t.phase === phaseId);
    const done = tasks.filter((t) => state.done[t.id]).length;
    return { done, total: tasks.length, pct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 };
  }

  function setTab(tab) {
    state.tab = tab;
    save();
    render();
  }

  function renderHeader() {
    const p = progress();
    const days = daysUntil();
    const daysTxt =
      days == null ? "Nog geen vertrekdatum" : days > 0 ? `${days} dagen tot vertrek` : days === 0 ? "Vandaag vertrek" : `${Math.abs(days)} dagen onderweg`;
    $("#progress-label").textContent = `${p.done} van ${p.total} taken · ${p.pct}%`;
    $("#progress-days").textContent = dest().id ? `${dest().name} · ${daysTxt}` : daysTxt;
    const bar = $(".progress-bar span");
    if (bar) bar.style.width = p.pct + "%";
    $$("nav.tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === state.tab));
  }

  function renderPlan() {
    const phases = EMIGREER_DATA.phases
      .map((ph) => {
        const pr = phaseProgress(ph.id);
        return `<button type="button" class="phase" data-open-phase="${ph.id}">
          <div class="when">${ph.when}</div>
          <div>
            <h3>${ph.title}</h3>
            <div class="muted">${ph.blurb}</div>
          </div>
          <div class="donut" style="--p:${pr.pct}"><span>${pr.done}/${pr.total}</span></div>
        </button>`;
      })
      .join("");
    return `<section class="grid-2">
      <article class="card">
        <h2>Stappenplan</h2>
        <p class="muted">${dest().notes}</p>
        <div class="phase-list">${phases}</div>
        <div class="row-actions">
          <button class="btn" data-go="lijst">Naar afvinklijst</button>
          <button class="btn ghost" data-go="fiscaal">Fiscale laag</button>
        </div>
      </article>
      <article class="card">
        <h2>Jouw dossier</h2>
        <p class="muted">Deze gegevens vullen de e-mails. Alles blijft in deze browser.</p>
        ${field("naam", "Naam", "text")}
        ${field("email", "E-mail", "email")}
        ${field("telefoon", "Telefoon", "tel")}
        ${field("datum", "Vertrekdatum", "date")}
        <label class="field">Bestemming</label>
        <select id="bestemming" class="dest-select">${destOptions()}</select>
        ${field("adres_nl", "Adres in Nederland", "text")}
        ${field("adres_buitenland", "Adres / postadres buitenland", "text")}
        ${field("bsn", "BSN (alleen lokaal op dit apparaat)", "text")}
        <label class="field">Situatie</label>
        <div class="checks">
          ${flag("woning", "Woning in NL houden")}
          ${flag("auto", "Auto")}
          ${flag("camper", "Camper")}
          ${flag("caravan", "Caravan")}
          ${flag("boot", "Boot")}
          ${flag("trailer", "Trailer")}
          ${flag("huisdier", "Huisdier")}
          ${flag("uitkering", "Uitkering uit NL")}
          ${flag("pensioen", "NL-pensioen of lijfrente")}
          ${flag("vermogen", "Aanzienlijk box 3-vermogen")}
          ${flag("crypto", "Crypto in privé")}
          ${flag("ab", "BV / aanmerkelijk belang")}
        </div>
        <label class="field">Notities</label>
        <textarea id="notes">${escapeHtml(state.notes)}</textarea>
      </article>
    </section>`;
  }

  function field(key, label, type) {
    return `<label class="field">${label}</label><input type="${type}" data-profile="${key}" value="${escapeAttr(state.profile[key] || "")}">`;
  }
  function flag(key, label) {
    return `<label><input type="checkbox" data-flag="${key}" ${state.profile.flags[key] ? "checked" : ""}> ${label}</label>`;
  }

  function renderList() {
    let tasks = visibleTasks();
    if (state.filterPhase !== "all") tasks = tasks.filter((t) => t.phase === state.filterPhase);
    if (state.filterCat !== "all") tasks = tasks.filter((t) => t.cat === state.filterCat);
    const phaseChips = ["all", ...EMIGREER_DATA.phases.map((p) => p.id)]
      .map((id) => {
        const label = id === "all" ? "Alle fases" : EMIGREER_DATA.phases.find((p) => p.id === id).title;
        return `<button class="chip ${state.filterPhase === id ? "on" : ""}" data-phase="${id}">${label}</button>`;
      })
      .join("");
    const catChips = ["all", "administratief", "financieel", "praktisch", "sociaal"]
      .map((id) => `<button class="chip ${state.filterCat === id ? "on" : ""}" data-cat="${id}">${id === "all" ? "Alle soorten" : id}</button>`)
      .join("");
    const items = tasks
      .map((t) => {
        const phase = EMIGREER_DATA.phases.find((p) => p.id === t.phase);
        const links = (t.links || [])
          .map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`)
          .join(" · ");
        const mail = t.email ? ` · <a href="#" data-open-mail="${t.email}">E-mailsjabloon</a>` : "";
        return `<article class="task ${state.done[t.id] ? "done" : ""}">
          <input type="checkbox" data-task="${t.id}" ${state.done[t.id] ? "checked" : ""}>
          <div>
            <h3>${t.title}</h3>
            <div class="meta">
              <span class="tag">${phase.title}</span>
              <span class="tag">${t.cat}</span>
            </div>
            ${t.why ? `<p class="muted">${t.why}</p>` : ""}
            <div class="tiny">${links}${mail}</div>
          </div>
        </article>`;
      })
      .join("");
    return `<div class="toolbar">${phaseChips}<span style="flex:1"></span>${catChips}</div>
      ${items || `<p class="muted">Geen taken in deze filter. Zet een situatie-vinkje aan of kies een andere fase.</p>`}`;
  }

  function renderMail() {
    return `<div class="email-list">${EMIGREER_DATA.emails
      .map((e) => {
        const subject = fillTemplate(e.subject);
        const body = fillTemplate(e.body);
        const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return `<article class="email-item" id="mail-${e.id}">
          <h3>${e.title}</h3>
          <p class="tiny">Aan: ${e.toHint}</p>
          <p><strong>${escapeHtml(subject)}</strong></p>
          <div class="preview">${escapeHtml(body)}</div>
          <div class="row-actions">
            <button class="btn small" data-copy="${e.id}">Kopieer tekst</button>
            <a class="btn ghost small" href="${mailto}">Open in mailprogramma</a>
          </div>
        </article>`;
      })
      .join("")}</div>
      <p class="muted" style="margin-top:16px">Vul eerst je dossier op het tabblad Stappenplan. Plaatshouders tussen haakjes zijn nog leeg.</p>`;
  }

  function renderFiscal() {
    const ties = (window.EMIGREER_FISCAL && EMIGREER_FISCAL.ties) || [];
    const boxes = (window.EMIGREER_FISCAL && EMIGREER_FISCAL.afterBoxes) || [];
    const riskN = ties.filter((t) => state.ties[t.id]).length;
    const riskClass = riskN >= 4 ? "high" : riskN >= 2 ? "mid" : "low";
    const riskTxt =
      riskN >= 4
        ? "Veel rode lampen. Formele uitschrijving alleen is hier waarschijnlijk niet genoeg. Laat de woonplaats toetsen vóór je grote stappen zet."
        : riskN >= 2
          ? "Gemengd beeld. Documenteer het nieuwe tehuis (huur/koop, arts, bank, tijd ter plaatse) en wees zuinig met een altijd-klare NL-woning."
          : "Weinig aanknopingspunten aangevinkt. Dat is geen vrijbrief: de inspecteur kijkt naar het geheel, inclusief wat je níet aanvinkt.";

    const destId = dest().id;
    const hrBlock =
      destId === "hr"
        ? `<article class="card">
        <h2>Verdrag Nederland–Kroatië</h2>
        <p class="muted">Verdrag van 23 mei 2000, in werking 6 april 2001. OECD-model met een protocol bij pensioen. Geen advies — de artikelen wijzen alleen de heffingsbevoegdheid.</p>
        <table class="grid">
          <tr><th>Soort</th><th>Wie mag heffen</th></tr>
          <tr><td>Onroerend goed</td><td>Liggingstaat (art. 6 en 22). Een woning of bedrijfsunit in Nederland blijft in NL belastbaar; vastgoed in het woonland daar.</td></tr>
          <tr><td>Vermogen i.h.a.</td><td>Roerend vermogen volgt doorgaans de woonstaat. NL-box 3 over bank/crypto/effecten valt voor een echte niet-inwoner meestal weg.</td></tr>
          <tr><td>Pensioen / lijfrente</td><td>Hoofdregel woonstaat, maar het protocol staat bronheffing door NL toe boven een oude drempel (ƒ12.000 per jaar). Laat de actuele toepassing toetsen.</td></tr>
          <tr><td>Overig inkomen</td><td>Art. 21: in beginsel alleen woonstaat, tenzij vast bedrijf / vast middelpunt.</td></tr>
          <tr><td>Dubbele belasting</td><td>Kroatië verrekent NL-belasting (credit). Nederland gebruikt intern vrijstelling of verrekening per inkomenssoort.</td></tr>
        </table>
        <p class="tiny"><a href="https://verdragenbank.overheid.nl/nl/Verdrag/Details/009276.html" target="_blank" rel="noopener">Verdragenbank 009276</a> · <a href="https://wetten.overheid.nl/BWBV0001453/2001-04-06" target="_blank" rel="noopener">Tekst op wetten.nl</a></p>
      </article>
      <article class="card">
        <h2>Als Kroatië woonstaat wordt</h2>
        <p>Kroatië hanteert wél een 183-dagenregel naast de gewone verblijfplaats. Dat is hun toets, niet die van Nederland. Twee landen kunnen je allebei als inwoner zien; dan beslist het verdrag (tie-breaker: duurzaam tehuis, middelpunt van levensbelangen, gewoonlijk verblijf, nationaliteit).</p>
        <ul>
          <li>Inwoner Kroatië: wereldinkomen in de Kroatische aangifte, met credit voor wat NL nog mag heffen.</li>
          <li>Lokaal tarief arbeid/pensioen hangt van de općina af (grofweg 15–23% tot €60.000, daarna 25–33%; pensioen vaak halvering van de verschuldigde belasting — lokaal laten bevestigen).</li>
          <li>Kapitaalinkomen (dividend, rente, koerswinst): in de regel 12%. Koerswinst op financiële stukken en crypto is voor particulieren vaak vrij als de holdingperiode langer is dan twee jaar.</li>
          <li>Onroerend goed in Kroatië: overdracht en lokale heffingen los van NL. NL heft niet over Kroatisch vastgoed van een niet-inwoner.</li>
        </ul>
        <div class="callout"><strong>Volgorde van de klok</strong>Word je eerst Kroatisch inwoner en verkoop je daarna crypto die je korter dan twee jaar hebt, dan kijkt Porezna uprava mee. NL heft over diezelfde privé-crypto na echte emigratie doorgaans niet meer in box 3. Kostprijs en aankoopdata nu vastleggen.</div>
      </article>`
        : `<article class="card">
        <h2>Belastingverdrag</h2>
        <p>Zoek het verdrag van jouw woonland in de <a href="https://verdragenbank.overheid.nl/" target="_blank" rel="noopener">Verdragenbank</a>. Zonder verdrag is het risico op dubbele heffing groter, vooral bij pensioen en vastgoed.</p>
      </article>`;

    return `<div class="fiscal-stack">
      <article class="card">
        <h2>Drie klokken, drie data</h2>
        <p>Uitschrijven bij de gemeente is geen fiscale emigratie. De Belastingdienst kijkt of er een <em>duurzame band van persoonlijke aard</em> met Nederland rest (art. 4 AWR). Dagen tellen mee als bewijs, niet als drempel. De 183-dagenregel leeft in verdragen en in sommige woonlanden — niet in de Nederlandse wet zelf.</p>
        <table class="grid">
          <tr><th>Klok</th><th>Wie</th><th>Kenmerkende datum</th></tr>
          <tr><td>BRP → RNI</td><td>Gemeente</td><td>Laatste 5 dagen; >8 maanden weg in 12 maanden</td></tr>
          <tr><td>Fiscale woonplaats</td><td>Belastingdienst / rechter</td><td>Feitelijke verbreking van de band — kan eerder of later zijn</td></tr>
          <tr><td>Zorg / SVB</td><td>Zorgverzekeraar, CAK, SVB</td><td>Vaak de uitschrijfdatum, soms langer bij NL-werk of -pensioen</td></tr>
        </table>
        <p class="tiny"><a href="https://www.belastingdienst.nl/wps/wcm/connect/en/individuals/content/moving-abroad-emigration" target="_blank" rel="noopener">Belastingdienst: wanneer woon je permanent elders?</a></p>
      </article>

      <article class="card">
        <h2>Zelftoets duurzame band</h2>
        <p class="muted">Vink wat ná vertrek nog waar is. Dit is een risicosignaal, geen score van de inspecteur.</p>
        <div class="tie-list">
          ${ties
            .map(
              (t) =>
                `<label><input type="checkbox" data-tie="${t.id}" ${state.ties[t.id] ? "checked" : ""}><span>${t.label}</span></label>`
            )
            .join("")}
        </div>
        <div class="risk ${riskClass}"><strong>${riskN} van ${ties.length} aanknopingspunten.</strong> ${riskTxt}</div>
      </article>

      <article class="card">
        <h2>Het jaar van vertrek</h2>
        <p>In het emigratiejaar ben je een deel van het jaar binnenlands belastingplichtige (wereldinkomen) en daarna buitenlands belastingplichtige (alleen Nederlands inkomen). Dat is de aangifte M / part-year.</p>
        <ul>
          <li>Box 3: peildatum blijft <strong>1 januari 00:00</strong> van dat jaar, ook als je in maart vertrekt.</li>
          <li>Heffingskortingen en premie volksverzekeringen lopen tijdsevenredig tot de emigratiedatum (of langer als je in NL blijft werken).</li>
          <li>Verdeling van box 3 met een fiscale partner mag alleen als jullie dezelfde binnenlandse periode hebben, of allebei het hele jaar kwalificerend buitenlands belastingplichtige zijn.</li>
          <li>Vul te conserveren inkomen altijd in. De M-aangifte geldt doorgaans als verzoek om uitstel van betaling.</li>
        </ul>
      </article>

      <article class="card">
        <h2>Na emigratie: wat NL nog heft</h2>
        <p class="muted">Buitenlands belastingplichtige = alleen inkomen dat Nederland mag belasten. Geen wereldwijd box 3 meer.</p>
        <table class="grid">
          <tr><th>Box</th><th>Blijft vaak in NL</th><th>Valt meestal af</th></tr>
          ${boxes
            .map((b) => `<tr><td><strong>${b.box}</strong></td><td>${b.blijft}</td><td>${b.valtAf}</td></tr>`)
            .join("")}
        </table>
        <p class="tiny">2026 box 3 (inwoner, forfait): banktegoeden volgens de voorlopige aanslag 1,28%; overige bezittingen 6,00% (daaronder tweede woning en crypto); schulden 2,70%; tarief 36%. Heffingsvrij vermogen circa €59.357 p.p. Percentages wijzigen jaarlijks.</p>
        <p class="tiny"><a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/wonen-in-het-buitenland-nederlands-inkomen" target="_blank" rel="noopener">Wonen in het buitenland — Nederlands inkomen</a></p>
      </article>

      <article class="card">
        <h2>Conserverende aanslag</h2>
        <p>Geen rekening die je nu betaalt, maar een claim op later. Je krijgt hem na de emigratieaangifte over te conserveren inkomen. Dat inkomen wordt tegen het toptarief in de berekening gezet.</p>
        <table class="grid">
          <tr><th>Bron</th><th>Grondslag</th><th>Uitstel</th><th>Kwijtschelding</th></tr>
          <tr><td>Pensioen / lijfrente (premie afgetrokken)</td><td>Waarde of eerder genoten aftrek, afhankelijk van het verdrag</td><td>Max. 10 jaar. EU/EER: automatisch, zonder zekerheid</td><td>Na 10 jaar op verzoek, als je niet hebt afgekocht of verpand</td></tr>
          <tr><td>Kapitaalverzekering eigen woning e.d.</td><td>Waarde minus stortingen, boven de vrijstelling</td><td>Zolang het een eigen woning blijft</td><td>Na 10 jaar mogelijk</td></tr>
          <tr><td>Aanmerkelijk belang (≥5%)</td><td>Fictieve vervreemdingswinst box 2 (2026: 24,5% tot €68.843, daarboven 31%)</td><td>EU/EER automatisch. Dividend/verkoop breekt uitstel (deels) open</td><td>Emigratie ná 15-09-2015: in beginsel <em>onbeperkt</em> geldig, geen 10-jaarskwijtschelding</td></tr>
          <tr><td>AOW</td><td colspan="3">Geen conserverende aanslag over de AOW-aanspraak. Wel minder opbouw na vertrek (2% per jaar) tenzij vrijwillig verzekerd.</td></tr>
          <tr><td>Box 3 privé (spaar, ETF, crypto)</td><td colspan="3">Geen exit tax onder huidig recht. Een beperkt exit-idee zit in nog niet ingevoerd box 3-nieuw; dat is geen geldend recht.</td></tr>
        </table>
        <div class="callout"><strong>EU versus derde land</strong>Naar Kroatië of een ander EU/EER-land: uitstel zonder bankgarantie. Verhuis je later naar buiten de EU, dan kan uitstel worden ingetrokken of alleen met zekerheid doorgaan. Afkoop lijfrente kan invordering plus revisierente (tot 20%) openen.</div>
        <p class="tiny"><a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/conserverende-aanslag-bij-emigratie" target="_blank" rel="noopener">Belastingdienst — conserverende aanslag</a></p>
      </article>

      <article class="card">
        <h2>Kwalificerend buitenlands belastingplichtige</h2>
        <p>Alleen als je in de EU/EER/Zwitserland/BES woont <em>én</em> minstens 90% van je wereldinkomen in Nederland in de heffing komt (of je inkomen alleen uit NL-pensioen/uitkering bestaat en daar onbelast is). Dan krijg je inwoner-achtige aftrek en heffingskortingen.</p>
        <p>Wie vermogen, buitenlandse huur of lokale inkomsten heeft, zakt meestal onder de 90%. Vanaf 2026 is de model-inkomensverklaring van het woonland geen harde voorwaarde meer; de inspecteur mag ander bewijs accepteren.</p>
      </article>

      ${hrBlock}

      <article class="card">
        <h2>Box 3 nu en de plannen vanaf 2028</h2>
        <p><strong>Geldend recht 2026:</strong> forfaitair rendement, 36% over het forfait, werkelijk rendement als tegenbewijs in de aangifte. Crypto valt onder overige bezittingen (6,00%).</p>
        <p><strong>Nog geen wet:</strong> de Tweede Kamer nam een wetsvoorstel werkelijk rendement aan; de Eerste Kamer heeft niet afgerond. Eind september 2026 cirkelt het kabinet om een vermogenswinstbelasting vanaf 2028 voor financiële instrumenten, met latere uitbreiding. Crypto is in die stukken niet eenduidig ondergebracht. Bouw geen emigratieplanning op een novelle die er nog niet is.</p>
      </article>

      <article class="card">
        <h2>Wat je een fiscalist nu kunt vragen</h2>
        <ol>
          <li>Is mijn beoogde datum ook de fiscale emigratiedatum, gegeven woning X en aanwezigheidspatroon Y?</li>
          <li>Welke NL-bronnen blijven belast en welke vrijstellingsverklaring heb ik nodig?</li>
          <li>Volgt een conserverende aanslag, en waarover precies?</li>
          <li>Doet een holding / Beleggings-BV de exit-claim groter of kleiner?</li>
          <li>Hoe voorkom ik dat twee woonstaten mij tegelijk claimen?</li>
        </ol>
        <div class="row-actions">
          <button class="btn" data-open-mail="fiscalist">E-mailsjabloon fiscalist</button>
          <button class="btn ghost" data-go="lijst">Open fiscale taken in de lijst</button>
        </div>
      </article>
    </div>`;
  }

  function renderInfo() {
    return `<article class="card">
      <h2>Hoe deze app bedoeld is</h2>
      <p>Emigreren uit Nederland is geen enkele knop. Drie klokken lopen naast elkaar:</p>
      <ul>
        <li><strong>BRP / RNI</strong> — waar je woont volgens de gemeente (>8 maanden weg = uitschrijven, meestal laatste 5 dagen).</li>
        <li><strong>Fiscale woonplaats</strong> — waar de Belastingdienst vindt dat je woont. Die datum kan afwijken van de uitschrijving.</li>
        <li><strong>Sociale zekerheid en zorg</strong> — SVB, CAK, zorgverzekeraar. Stoppen op de verkeerde dag kost geld of dekking.</li>
      </ul>
      <p>Dit hulpmiddel houdt die drie bij in één afvinklijst, met e-mails die je alleen nog hoeft te controleren. Het is geen advies en geen vervanging van een fiscalist, notaris of de officiële sites.</p>
      <p class="muted">Officiële bronnen die in de taken zitten: Belastingdienst-checklist emigreren, Nederland Wereldwijd, DigiD, SVB, RDW, Het CAK.</p>
    </article>`;
  }

  function render() {
    try {
      renderHeader();
      const root = $("#view");
      if (!root) return;
      if (state.tab === "plan") root.innerHTML = renderPlan();
      if (state.tab === "lijst") root.innerHTML = renderList();
      if (state.tab === "fiscaal") root.innerHTML = renderFiscal();
      if (state.tab === "mail") root.innerHTML = renderMail();
      if (state.tab === "sociaal") root.innerHTML = renderSocial();
      if (state.tab === "info") root.innerHTML = renderInfo();
      bind();
    } catch (err) {
      const root = $("#view");
      if (root) root.innerHTML = `<article class="card"><h2>Er ging iets mis</h2><p class="muted">${String(err)}</p></article>`;
      console.error(err);
    }
  }

  function bind() {
    $$("nav.tabs [data-tab]").forEach((b) => (b.onclick = () => setTab(b.dataset.tab)));
    $$("[data-go]").forEach((b) => (b.onclick = () => setTab(b.dataset.go)));
    $$("[data-go-social]").forEach((b) => {
      b.onclick = () => {
        state.tab = "lijst";
        state.filterPhase = "all";
        state.filterCat = "sociaal";
        save();
        render();
      };
    });
    $$("[data-profile]").forEach((el) => {
      el.addEventListener("change", () => {
        state.profile[el.dataset.profile] = el.value;
        save();
        renderHeader();
      });
    });
    const destSel = $("#bestemming");
    if (destSel) {
      destSel.onchange = () => {
        state.profile.bestemming = destSel.value;
        save();
        render();
      };
    }
    const notes = $("#notes");
    if (notes) {
      notes.oninput = () => {
        state.notes = notes.value;
        save();
      };
    }
    $$("[data-flag]").forEach((el) => {
      el.onchange = () => {
        state.profile.flags[el.dataset.flag] = el.checked;
        save();
      };
    });
    $$("[data-tie]").forEach((el) => {
      el.onchange = () => {
        state.ties[el.dataset.tie] = el.checked;
        save();
        render();
      };
    });
    $$("[data-phase]").forEach((el) => {
      el.onclick = () => {
        state.filterPhase = el.dataset.phase;
        save();
        render();
      };
    });
    $$("[data-open-phase]").forEach((el) => {
      el.onclick = () => {
        state.filterPhase = el.dataset.openPhase;
        state.filterCat = "all";
        state.tab = "lijst";
        save();
        render();
      };
    });
    $$("[data-cat]").forEach((el) => {
      el.onclick = () => {
        state.filterCat = el.dataset.cat;
        save();
        render();
      };
    });
    $$("[data-task]").forEach((el) => {
      el.onchange = () => {
        state.done[el.dataset.task] = el.checked;
        save();
        render();
      };
    });
    $$("[data-open-mail]").forEach((el) => {
      el.onclick = (e) => {
        e.preventDefault();
        state.tab = "mail";
        save();
        render();
        const node = document.getElementById("mail-" + el.dataset.openMail);
        if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    });
    $$("[data-copy]").forEach((el) => {
      el.onclick = async () => {
        const mail = EMIGREER_DATA.emails.find((m) => m.id === el.dataset.copy);
        const text = fillTemplate(mail.subject) + "\n\n" + fillTemplate(mail.body);
        await navigator.clipboard.writeText(text);
        el.textContent = "Gekopieerd";
        setTimeout(() => (el.textContent = "Kopieer tekst"), 1500);
      };
    });
    const personForm = $("#person-form");
    if (personForm) {
      personForm.onsubmit = (e) => {
        e.preventDefault();
        const data = new FormData(personForm);
        const name = String(data.get("name") || "").trim();
        if (!name) return;
        state.people.push({
          id: String(Date.now()),
          name,
          circle: String(data.get("circle") || "vrienden"),
          told: false,
        });
        save();
        render();
      };
    }
    $$("[data-person-told]").forEach((el) => {
      el.onchange = () => {
        const person = state.people.find((p) => p.id === el.dataset.personTold);
        if (!person) return;
        person.told = el.checked;
        save();
        render();
      };
    });
    $$("[data-person-del]").forEach((el) => {
      el.onclick = () => {
        state.people = state.people.filter((p) => p.id !== el.dataset.personDel);
        save();
        render();
      };
    });
    $$("[data-copy-person]").forEach((el) => {
      el.onclick = async () => {
        const person = state.people.find((p) => p.id === el.dataset.copyPerson);
        if (!person) return;
        const mail = EMIGREER_DATA.emails.find((m) => m.id === "kring");
        const body = fillTemplate(mail.body).replace(/^Hoi,/, "Hoi " + person.name + ",");
        await navigator.clipboard.writeText(body);
        el.textContent = "Gekopieerd";
        setTimeout(() => (el.textContent = "Bericht"), 1500);
      };
    });
    $$("[data-media]").forEach((el) => {
      el.onchange = () => {
        state.media[el.dataset.media] = el.checked;
        save();
        render();
      };
    });
    const mediaForm = $("#media-form");
    if (mediaForm) {
      mediaForm.onsubmit = (e) => {
        e.preventDefault();
        const name = String(new FormData(mediaForm).get("name") || "").trim();
        if (!name) return;
        state.mediaExtra.push({ id: "x" + Date.now(), name });
        save();
        render();
      };
    }
    $$("[data-media-del]").forEach((el) => {
      el.onclick = () => {
        const id = el.dataset.mediaDel;
        state.mediaExtra = state.mediaExtra.filter((m) => m.id !== id);
        delete state.media[id];
        save();
        render();
      };
    });
  }

  const CIRCLES = [
    ["familie", "Familie"],
    ["vrienden", "Vrienden"],
    ["kennissen", "Kennissen"],
    ["werk", "Werk"],
    ["buren", "Buren"],
  ];

  const MEDIA = [
    ["whatsapp", "WhatsApp", "Status, groepen, nieuw nummer."],
    ["signal", "Signal", "Zelfde kring, ander kanaal."],
    ["facebook", "Facebook", "Woonplaats, check-ins, foto's van je oude adres."],
    ["instagram", "Instagram", "Bio en locatie-tags."],
    ["x", "X", "Bio en locatie. Een bericht is niet verplicht."],
    ["linkedin", "LinkedIn", "Locatie alleen als je die openbaar wilt."],
    ["youtube", "YouTube", "Land van het kanaal, als je er een hebt."],
    ["tiktok", "TikTok", "Bio en locatie."],
  ];

  function mediaRows(list, extra) {
    return list
      .map(([id, name, hint]) => {
        const on = !!state.media[id];
        return `<div class="person ${on ? "told" : ""}">
          <label><input type="checkbox" data-media="${escapeAttr(id)}" ${on ? "checked" : ""}> klaar</label>
          <div><strong>${escapeHtml(name)}</strong><div class="tiny">${hint}</div></div>
          ${extra ? `<button type="button" class="btn ghost small" data-media-del="${escapeAttr(id)}">Weg</button>` : "<span></span>"}
        </div>`;
      })
      .join("");
  }

  function renderSocial() {
    const told = state.people.filter((p) => p.told).length;
    const options = CIRCLES.map(([id, label]) => `<option value="${id}">${label}</option>`).join("");
    const groups = CIRCLES.map(([id, label]) => {
      const rows = state.people.filter((p) => p.circle === id);
      const items = rows
        .map(
          (p) => `<div class="person ${p.told ? "told" : ""}">
            <label><input type="checkbox" data-person-told="${escapeAttr(p.id)}" ${p.told ? "checked" : ""}> verteld</label>
            <strong>${escapeHtml(p.name)}</strong>
            <span class="person-actions">
              <button type="button" class="btn ghost small" data-copy-person="${escapeAttr(p.id)}">Bericht</button>
              <button type="button" class="btn ghost small" data-person-del="${escapeAttr(p.id)}">Weg</button>
            </span>
          </div>`
        )
        .join("");
      return `<section class="circle">
        <h3>${label} <span class="tiny">${rows.filter((p) => p.told).length}/${rows.length}</span></h3>
        ${items || `<p class="muted">Nog niemand.</p>`}
      </section>`;
    }).join("");
    const mail = EMIGREER_DATA.emails.find((m) => m.id === "kring");
    return `<div class="fiscal-stack">
      <article class="card">
        <h2>Wie het moet weten</h2>
        <p class="muted">${told} van ${state.people.length} verteld. Namen blijven in deze browser. Eerst familie en naaste vrienden, daarna kennissen, werk en buren.</p>
        <form id="person-form" class="person-form">
          <input type="text" name="name" placeholder="Naam" required maxlength="80" autocomplete="off">
          <select name="circle">${options}</select>
          <button class="btn" type="submit">Toevoegen</button>
        </form>
        ${groups}
      </article>
      <article class="card">
        <h2>Bericht</h2>
        <p class="muted">Zelfde tekst als in de e-maillijst. Per persoon begint hij met hun naam.</p>
        <div class="preview">${escapeHtml(fillTemplate(mail.body))}</div>
        <div class="row-actions">
          <button class="btn" type="button" data-copy="kring">Kopieer tekst</button>
          <button class="btn ghost" type="button" data-go-social>Sociale taken</button>
        </div>
      </article>
      <article class="card">
        <h2>Social media</h2>
        <p class="muted">${Object.values(state.media).filter(Boolean).length} bijgewerkt. Zet locatie en oude adressen uit voordat je een vertrek deelt. Niets hier wordt online gezet.</p>
        ${mediaRows(MEDIA, false)}
        ${mediaRows(state.mediaExtra.map((m) => [m.id, m.name, "Zelf toegevoegd."]), true)}
        <form id="media-form" class="person-form">
          <input type="text" name="name" placeholder="Ander netwerk" maxlength="40" autocomplete="off">
          <button class="btn" type="submit">Toevoegen</button>
        </form>
        <p class="muted">Kort bericht, als je het wilt delen:</p>
        <div class="preview">${escapeHtml(fillTemplate("Per {{datum}} woon ik in {{bestemming}}."))}</div>
        <div class="row-actions">
          <button class="btn" type="button" data-copy="media">Kopieer bericht</button>
        </div>
      </article>
    </div>`;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, String.fromCharCode(38,97,109,112,59))
      .replace(/</g, String.fromCharCode(38,108,116,59))
      .replace(/>/g, String.fromCharCode(38,103,116,59));
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, String.fromCharCode(38,113,117,111,116,59));
  }

  function initTheme() {
    const btn = document.getElementById("theme-toggle");
    const sun = btn && btn.querySelector(".icon-sun");
    const moon = btn && btn.querySelector(".icon-moon");
    const apply = (dark) => {
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? "#0a0a0a" : "#ffffff");
      if (sun) sun.style.display = dark ? "none" : "block";
      if (moon) moon.style.display = dark ? "block" : "none";
      try {
        localStorage.setItem("emigreren-theme", dark ? "dark" : "light");
      } catch (_) {}
    };
    apply(document.documentElement.classList.contains("dark"));
    if (btn) {
      btn.onclick = () => apply(!document.documentElement.classList.contains("dark"));
    }
  }

  function initReset() {
    const btn = document.getElementById("reset-data");
    if (!btn) return;
    btn.onclick = () => {
      const ok = window.confirm("Alle gegevens in deze browser wissen? Dossier, afvinklijst en notities gaan weg. Dit kan niet ongedaan.");
      if (!ok) return;
      try {
        localStorage.removeItem(STORAGE);
      } catch (_) {}
      state = defaultState();
      render();
    };
    const reload = document.getElementById("reload-app");
    if (reload) reload.onclick = () => location.reload();
  }

  render();
  initTheme();
  initReset();
})();
