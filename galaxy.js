window.addEventListener('load', function() { 
    onLoadTab();
    setTotal(); 
    setToughness();
    setStress();
});

function checkEmpty(field) {
    field.style.borderColor = (field.value === "") ? "#8b1538" : "#083E47";
}

function getTotal() {
    let quick = parseInt(document.getElementsByName('quick')[0].value);
    let cunning = parseInt(document.getElementsByName('cunning')[0].value);
    let discreet = parseInt(document.getElementsByName('discreet')[0].value);
    let strong = parseInt(document.getElementsByName('strong')[0].value);
    let persuasive = parseInt(document.getElementsByName('persuasive')[0].value);
    let accurate = parseInt(document.getElementsByName('accurate')[0].value);
    let vigilant = parseInt(document.getElementsByName('vigilant')[0].value);
    let resolute = parseInt(document.getElementsByName('resolute')[0].value);

    return [quick, cunning, discreet, strong, persuasive, accurate, vigilant, resolute]
}

function sum(arr) {
    let somme = 0;
    arr.forEach(value => {
        somme += value;
    });
    return somme;
}

function counter(arr, number) {
    let occ = 0;
    arr.forEach(value => {
        if (value === number) { occ++; } 
    });
    return occ;
}

function setTotal(field) {
    let total = sum(getTotal());

    if (total > 80) {
        field.value = 10;
        let err = document.getElementById("characteristic-error");
        let msg = "La somme des caratéritiques ne doit pas excéder 80 !"
        showErrMessage(err, msg);
    }
    else {
        document.getElementsByName('total')[0].value = total;
    }
}

function checkCharacteristic(characteristic) {
    let val  = characteristic.value;
    let err = document.getElementById("characteristic-error");
    if (val < 5 || val > 20) {
        characteristic.value = 10;
        let msg = "Les charactéristiques doivent être comprise entre 5 et 20 inclus !"
        showErrMessage(err, msg);
    }
    else if (val == 5) {
        if (counter(getTotal(), 5) > 1) {
            characteristic.value++;
            let msg = "Une seule charactéristique peut être égal à 5 !"
            showErrMessage(err, msg);
        }
    } else if (val == 15) {
        if (counter(getTotal(), 15) > 1) {
            characteristic.value--;
            let msg = "Une seule charactéristique peut être égal à 15 !"
            showErrMessage(err, msg);
        }
    }
}

function showErrMessage(err, msg) {
    err.innerHTML = msg;
    setTimeout(function() {
        err.innerHTML = ""
    }, 5000);
}

function setToughness() {
    let force = parseInt(document.getElementsByName('strong')[0].value);
    let toughness = document.getElementsByName('current');
    let toughness_max = document.getElementsByName('toughness_max');
    let threshold = document.getElementsByName('pain_threshold');

    // Set Toughness Maximum
    (force <= 10) ? toughness_max[0].value = 10 : toughness_max[0].value = force;
    
    // Set threshold
    threshold[0].value = Math.ceil(force / 2)

    // Set max property of input toughness
    toughness[0].max = toughness_max[0].value;
    if (force >= 10 && toughness[0].value > toughness_max[0].value) {
        toughness[0].value--;
    }
    setToughnessGauge();
}

function setStress() {
    let resolute = parseInt(document.getElementsByName('resolute')[0].value);
    let threshold = document.getElementsByName('stress_threshold');

    threshold[0].value = Math.ceil(resolute / 2)
}

function setStressPerm(field) {
    let stress = field.value;
    let threshold = document.getElementsByName('stress_threshold')[0].value;
    let perm = document.getElementsByName('stress_perm');

    console.log(threshold)

    if (stress > threshold) {
        perm[0].value = parseInt(perm[0].value) + 1;
        /* set stress temporaire à 0 ? */
    }
}
/* ADD ENDURANCE ACTUELLE NE PEUT EXEDER ENDU MAX */


/************************************************************************/
/* Jauge endurance & stress                                             */
/************************************************************************/
function setToughnessGauge() {
    let toughness = parseInt(document.getElementsByName('current')[0].value);
    let toughness_max = parseInt(document.getElementsByName('toughness_max')[0].value);
    let gauge = document.getElementById('endurance-progresse');

    gauge.style.width = (toughness / toughness_max) * 100 + "%"
}

function setStressGauge() {
    let stress = parseInt(document.getElementsByName('stress_tmp')[0].value);
    let threshold = parseInt(document.getElementsByName('stress_threshold')[0].value);
    let gauge = document.getElementById('stress_tmp-progress');

    gauge.style.width = (stress / threshold) * 100 + "%"
}


/************************************************************************/
/* Tab hide and show                                                    */
/************************************************************************/
function onLoadTab() {
    // On loaddisplay the default one (section 1)
    document.getElementById('default-tab').click();
}

function openTab(ele, section_name) {
    let i, tablinks, subsections, section;

    // Hide all subsections
    subsections = document.getElementsByClassName('subsection');
    for (i = 0; i < subsections.length; i++) {
        subsections[i].style.display = "none";
    }

    // Remove active element to all section
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Display current section
    section = document.getElementsByClassName(section_name);
    for (i = 0; i < section.length; i++) {
        section[i].style.display = 'flex';
    }

    // Add active element to curent section
    ele.className += " active";
}


/************************************************************************/
/* Inventory section                                                    */
/************************************************************************/
function addNewField(id) {
    const div = document.createElement('div');
    let contents;

    // Objet
    contents = `<div class="text_field"><input type="text"></div>`
    // Quantité
    contents += `<div class="number_field"><input type="number"></div>`
    // Prix
    contents += `<div class="number_field" onchange="getTotalValue('${id}', 'price');">
    <input type="number" name="price" min="0" value="0"></div>`
    // Poids
    contents += `<div class="number_field" onchange="getTotalValue('${id}', 'weight');">
    <input type="number" name="weight" min="0" value="0"></div>`
    // Equipé
    contents += `<div class="check_field"><input type="checkbox"></div>`
    // Suppr
    contents += `<div class="button_field">
    <input type="button" value="suppr." onclick="removeField(this, '${id}');"></div>`

    div.className = 'item';
    div.innerHTML = contents;

    document.getElementById(id).appendChild(div)
}

function removeField(input, id) {
    document.getElementById(id).removeChild(input.parentNode.parentNode);
    
    getTotalValue(id, 'price');
    getTotalValue(id, 'weight');
}

function getTotalValue(id, name) {
    let i, element, total = 0;

    element = document.getElementsByName(name);
    for (i = 0; i < element.length; i++) {
        total += parseInt(element[i].value);
    }
    document.getElementById(`${name}-${id}`).innerHTML = total;
}