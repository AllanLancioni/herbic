const form = document.getElementById("configConsulta");
form.addEventListener('submit', (e)  => {
	var matos =  document.getElementsByClassName("matoEscolhido");
	if (matos.length == 0 || matos == null) {
		console.log('erro 1');
		e.preventDefault();
		return;
	}
	for (var i=0;i<matos.length;i++) {
		if (matos[i].style.display == "none") { continue; }
		else {
			var nomeMato = matos[i].id;
			var preCB_id = 'pre_' + nomeMato;
			var posCB_id = 'pos_' + nomeMato;
			var radiosPreName = 'pressao_' + nomeMato;
			var radiosPosName = 'estadio_' + nomeMato;

			var preCB = document.getElementById(preCB_id);
			var posCB = document.getElementById(posCB_id);
			var radiosPre = document.getElementsByName(radiosPreName);
			var radiosPos = document.getElementsByName(radiosPosName);

			if (preCB.checked == false) {
				console.log('erro 2');
				e.preventDefault();
				return;
			} else {
				for (var m=0;m<radiosPre.length;m++) {
					if (radiosPre[m].checked == true) {
						var marcou_1 = 1;
					}
				}
				if (marcou_1 == 0) {
					console.log('erro 3');
					e.preventDefault();
					return;
				}
			}

			if (posCB.checked == true) {
				if (preCB.checked == false) {
					console.log('erro 4');
					e.preventDefault();
					return;
				}
				for (var j=0;j<radiosPos.length;j++) {
					if (radiosPos[j].checked == true) {
						var marcou_2 = 1;
					}
				}
				if (marcou_2 == 0) {
					console.log('erro 5');
					e.preventDefault();
					return;
				}

			}
		}
	}
})



function checkPosPre(id_coletada) {
	var mato = id_coletada.slice(4); // nome do mato
	var cboxpre = "pre_" + mato;
	var pre = document.getElementById(cboxpre);
	var pos = document.getElementById(id_coletada);
	if (pos.checked == true && pre.checked == false) {
		pre.checked = true;
		controlRadio(cboxpre);
	}

	return;
 }	



function controlRadio(id_coletada) {
	var emergencia = id_coletada.slice(0,3); // pre ou pós
	var mato = id_coletada.slice(4); // nome do mato	
	var cbox = document.getElementById(id_coletada);

	if (emergencia == "pre") {
		var x = "pressao_" + mato;
	} else if (emergencia == "pos") {
		var x = "estadio_" + mato;
	}

	var rbuttons = document.getElementsByName(x);
	
	if (cbox.checked == false) {
		for (var i=0;i<rbuttons.length;i++) {
			rbuttons[i].disabled = true;
		}
	} else if (cbox.checked == true) {
		for (var i=0;i<rbuttons.length;i++) {
			rbuttons[i].disabled = false;
		}
	}

	return;	
}


function addMato() {
	var selBox = document.getElementById("select_matos");
	var matoSel = selBox.options[selBox.selectedIndex].value;

	var selID = selBox.options[selBox.selectedIndex].id;
	if (selID == "errada") {
		console.log('null');
		return;
	}
	
	// se o elemento já existir, colocar display block:
	var fSet = document.getElementById(matoSel);
	if (fSet != null && fSet.style.display == "none") {
		fSet.style.display = "block";
		return;
	} else if (fSet != null) {
		return;
	}

	// se o elemento não existir, criar:
	var miniForm = '<fieldset class="matoEscolhido" id=' + matoSel +
		'><legend><h3>' + matoSel + '</h3></legend>'+
		'<p>Pressão: baixa, média, alta</p>'+
		'<label for="pre_' + matoSel +
		'"><b>Pré</b></label>' +
		'<input type="checkbox" id="pre_' + matoSel + '" name="pre_' + matoSel +
		'" value="sim" class="PRE" onchange="controlRadio(this.id)">' +
		'<input type="radio" id="baixa_' + matoSel + '" name="pressao_' + matoSel +
		'" value="pressao_baixa_' + matoSel + '" disabled>' +
	    '<input type="radio" id="media_' + matoSel + '" name="pressao_' + matoSel +
	    '" value="pressao_media_' + matoSel + '" disabled>' +
	    '<input type="radio" id="alta_' + matoSel + '" name="pressao_' + matoSel +
	    '" value="pressao_alta_' + matoSel + '" disabled>' +
	    '<br><p>Estádio: inicial, médio, tardio</p>' +
		'<label for="pos_' + matoSel + '"><b>Pós</b></label>' +
		'<input type="checkbox" id="pos_' + matoSel + '" name="pos_' + matoSel +
		'" value="sim" onchange="controlRadio(this.id);checkPosPre(this.id)">' +
		'<input type="radio" id="inicial_' + matoSel + '" name="estadio_' + matoSel +
		'" value="pos_estadio_inicial_' + matoSel + '" disabled>' +
	    '<input type="radio" id="medio_' + matoSel + '" name="estadio_' + matoSel +
	    '" value="pos_estadio_medio_' + matoSel + '" disabled>' +
	    '<input type="radio" id="tardio_' + matoSel + '" name="estadio_' + matoSel +
	    '" value="pos_estadio_tardio_' + matoSel + '" disabled><br></fieldset>';
	var selecaoMatos = document.getElementById("selecaoMatos");
	selecaoMatos.innerHTML += miniForm;
	verificaBotaoSubmit();
	return;
}



function removeMato() { 		// se o elemento já existir, colocar display none
	var selBox = document.getElementById("select_matos");
	var matoSel = selBox.options[selBox.selectedIndex].value;
	var fSet = document.getElementById(matoSel);
	if (fSet != null) {
		fSet.style.display = "none";
	}
	verificaBotaoSubmit();
	return;

}  



function resetForm() {
	var formMatos = document.getElementById("selecaoMatos");
	formMatos.innerHTML = ""
	verificaBotaoSubmit();
	return;

}


function quantosMatosAtivados() {
	var matos =  document.getElementsByClassName("matoEscolhido");
	var x = 0;

	if (matos.length == 0 || matos == null) {
		return 0;
	}

	for (var i=0;i<matos.length;i++) {
		if (matos[i].style.display == "none") { continue ;}
		else { x++; }
	}
	return x;
}



function verificaBotaoSubmit() {
	var botaoSubmit = document.getElementById("submiter");

	if ( botaoSubmit.style.display == "none" && quantosMatosAtivados() > 0 ) {
		botaoSubmit.style.display = "block";
	}
	else if (botaoSubmit.style.display == "block" && quantosMatosAtivados() == 0) {
		botaoSubmit.style.display = "none";
	}
	return;
}
