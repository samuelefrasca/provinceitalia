// Funzioni di ordinamento
function ordinaPerAbitantiDecrescente(comuniProvincia) {
    let copiaComuni = [...comuniProvincia];
    copiaComuni.sort((a, b) => {
        return a.popolazione_totale - b.popolazione_totale;
    });
    scritturaComuni(provinciaCorrente, copiaComuni, nomeRegione);
}

function ordinaPerAbitantiCrescente(comuniProvincia) {
    let copiaComuni = [...comuniProvincia];
    copiaComuni.sort((a, b) => {
        return b.popolazione_totale - a.popolazione_totale;
    });
    scritturaComuni(provinciaCorrente, copiaComuni, nomeRegione);
}

function ordinaPerSuperficieDecrescente(comuniProvincia) {
    let copiaComuni = [...comuniProvincia];
    copiaComuni.sort((a, b) => {
        return a.superficie - b.superficie;
    });
    scritturaComuni(provinciaCorrente, copiaComuni, nomeRegione);
}

function ordinaPerSuperficieCrescente(comuniProvincia) {
    let copiaComuni = [...comuniProvincia];
    copiaComuni.sort((a, b) => {
        return b.superficie - a.superficie;
    });
    scritturaComuni(provinciaCorrente, copiaComuni, nomeRegione);
}

function ordinaPerAbitanti(flag) {
    if (flag) {
        ordinaPerAbitantiDecrescente(comuniProvincia);
        flagAbitanti = false;
        flagAlfabetico = false;
        flagSuperficie = false;
    }
    if (!flag) {
        ordinaPerAbitantiCrescente(comuniProvincia);
        flagAbitanti = true;
        flagAlfabetico = false;
        flagSuperficie = false;
    }
}

function ordinaPerSuperficie(flag) {
    if (flag) {
        ordinaPerSuperficieDecrescente(comuniProvincia);
        flagSuperficie = false;
        flagAbitanti = false;
        flagAlfabetico = false;
    }
    if (!flag) {
        ordinaPerSuperficieCrescente(comuniProvincia);
        flagSuperficie = true;
        flagAbitanti = false;
        flagAlfabetico = false;
    }
}

function ordinaPerNome(flag) {
    // parte dal presupposto che l'oggetto di riferimento sia già ordinato in ordine alfabetico
    if (flag) {
        scritturaComuni(provinciaCorrente, comuniProvincia.toReversed(), nomeRegione);
        flagAlfabetico = false;
        flagAbitanti = false;
        flagSuperficie = false;
    }
    if (!flag) {
        scritturaComuni(provinciaCorrente, comuniProvincia, nomeRegione);
        flagAlfabetico = true;
        flagAbitanti = false;
        flagSuperficie = false;
    }
}