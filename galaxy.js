window.addEventListener('load', function() { 
    onLoadTab();
    setTotal(); 
    setToughness();
    setStress();
});

function getTotal() {
    let total;

    total = parseInt(document.getElementsByName('quick')[0].value);
    total += parseInt(document.getElementsByName('cunning')[0].value);
    total += parseInt(document.getElementsByName('discreet')[0].value);
    total += parseInt(document.getElementsByName('strong')[0].value);
    total += parseInt(document.getElementsByName('persuasive')[0].value);
    total += parseInt(document.getElementsByName('accurate')[0].value);
    total += parseInt(document.getElementsByName('vigilant')[0].value);
    total += parseInt(document.getElementsByName('resolute')[0].value);

    return total
}

function setTotal() {
    let field, total, warning;

    field = document.getElementsByName('total')[0];
    total = getTotal();

    if (total > 80) {
        warning = "La somme des caratéritiques est > 80, veuillez vérifier avec le mj que c'est en accord avec les règles";
        
        field.setAttribute('title', warning);
    }
    else {
        field.setAttribute('title', "");
    }
    
    field.value = total;
}

function checkCharacteristic(field) {
    let value = field.value;

    field.style.borderColor = (value === "" || value < 5 || value > 15) ? "#8b1538" : "white";
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