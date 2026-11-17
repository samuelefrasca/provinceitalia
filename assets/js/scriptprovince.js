// Script condiviso per le singole pagine delle province.
// Le variabili globali nomeRegione, nomeProvincia, slugRegione, slugProvincia,
// provinciaCorrente, comuniProvincia, flagAlfabetico, flagAbitanti e flagSuperficie
// vengono definite nella pagina HTML generata.

function caricaComuniProvincia() {
    const url = `../data/${slugRegione}/${slugProvincia}.json`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Impossibile caricare ${url}: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            comuniProvincia = data;
            scritturaComuni(nomeProvincia, comuniProvincia, nomeRegione);
        })
        .catch(err => {
            console.error(err);
            const elencoComuni = document.getElementById('elenco-comuni');
            if (elencoComuni) {
                elencoComuni.innerHTML = '<tr><td colspan="4">Errore nel caricamento dei dati.</td></tr>';
            }
        });
}

function scritturaComuni(provincia, comuniDati, nomeRegione) {
    const elencoComuni = document.getElementById('elenco-comuni');
    const elementiTrovati = document.getElementById('elementi-trovati');
    if (!elencoComuni || !elementiTrovati) {
        return;
    }

    let table = '<tr>' +
        '<th class="index"></th>' +
        '<th class="hel nome pointer select-none" onclick="ordinaPerNome(flagAlfabetico)">Comune <i class="fa-solid fa-sort"></i></th>' +
        '<th class="hel abitanti pointer select-none" onclick="ordinaPerAbitanti(flagAbitanti)">Popolazione <i class="fa-solid fa-sort"></i></th>' +
        '<th class="hel superficie pointer select-none" onclick="ordinaPerSuperficie(flagSuperficie)">Superficie <i class="fa-solid fa-sort"></i></th>' +
        '</tr>';

    let popolazioneTotale = 0;
    let superficieTotale = 0;
    let index = 1;

    for (let comune of comuniDati) {
        const popolazione = comune.popolazione_totale.toLocaleString('it-IT', { useGrouping: 'always' });
        const supVal = Number(comune.superficie);
        const superficie = supVal.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if (comune.capoluogo) {
            table += `<tr><td class="el index"><strong>${index}</strong></td><td class="el nome"><strong>${comune.comune}</strong></td><td class="el abitanti"><strong>${popolazione}</strong></td><td class="el superficie"><strong>${superficie} km<sup>2</sup></strong></td></tr>`;
        } else {
            table += `<tr><td class="el index">${index}</td><td class="el nome">${comune.comune}</td><td class="el abitanti">${popolazione}</td><td class="el superficie">${superficie} km<sup>2</sup></td></tr>`;
        }

        popolazioneTotale += comune.popolazione_totale;
        superficieTotale += supVal;
        index++;
    }

    const superficieTotaleStr = superficieTotale.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    table += `<tr><td class="index"></td><td class="fel nome"><strong>Totale</strong></td><td class="fel abitanti"><strong>${popolazioneTotale.toLocaleString('it-IT', { useGrouping: 'always' })}</strong></td><td class="fel superficie"><strong>${superficieTotaleStr} km<sup>2</sup></strong></td></tr>`;
    elencoComuni.innerHTML = table;
    elementiTrovati.textContent = `${index - 1} comuni`;
}

function slugify(nome) {
    return nome
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[\'’]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/-+/g, '-');
}

function inizializzaNavigazioneMappa() {
    document.querySelectorAll('g[id]').forEach(g => {
        g.style.cursor = 'pointer';
        g.addEventListener('click', () => {
            const slug = slugify(g.id);
            window.location.href = slug;
        });
    });
}

function initPaginaProvincia() {
    caricaComuniProvincia();
    inizializzaNavigazioneMappa();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPaginaProvincia);
} else {
    initPaginaProvincia();
}