$(document).ready(function(){
	console.log('iniciando formsNovo');


  //1. coonfigurar inputs (incluindoo label)
  var modalidade = $(".modalidade");
  var teorMatOrg = $(".teorMatOrg");
  var texturaSolo = $(".texturaSolo");
  var epoca = $(".epoca");
  var estadioCana = $(".estadioCana");
  var varSensivel = $(".varSensivel");
  var palha = $(".palha");
  var novaCultura = $(".novaCultura");
  var revolvimento = $(".revolvimento");
  var incorp = $(".incorp"); 
  var areaRestrita = $(".areaRestrita");
  var plantioDias = $(".plantioDias");
 

  //2. inputs só o inpuut
  var id_modalidade = $("#select_modalidade");
  var id_teorMatOrg = $("#select_teorMatOrg");
  var id_texturaSolo = $("#select_texturaSolo");
  var id_epoca = $("#select_epoca");
  var id_estadioCana = $("#select_estadioCana");
  var id_varSensivel = $("#select_varSensivel");
  var id_palha = $("#select_palha");
  var id_novaCultura = $("#select_novaCultura");
  var id_revolvimento = $("#select_revolvimento");
  var id_incorp = $("#select_incorp");
  var id_areaRestrita = $("#select_areaRestrita");
  var id_plantioDias = $("#select_plantioDias");


  //2 esconder todos menos modalidades, texturaSolo,teorMatOrg e os de seleção de mato
  epoca.hide();
  estadioCana.hide();
  varSensivel.hide();
  palha.hide();
  novaCultura.hide();
  revolvimento.hide();
  incorp.hide();
  areaRestrita.hide();
  plantioDias.hide();

  
  //funções
  function ativar(campo,id_campo) {
  	console.log('ativando');
	campo.show();
	id_campo.prop('required',true);
	return;
  }

function desativar(campo,id_campo) {
	console.log('desativando');
	campo.hide();
	id_campo.prop('required',false);
	return;
  }

  //3. adicionar um event listener pra cada uma das opções da select box, que vai tirar o Hide de alguns campos, 
  //dependendo da modalidade escolhida, e torná-los required, e vai colocar um valor default pros campos que estãoo hidden,
  //pra que todos os valores sejam submetidos na form no final

	id_modalidade.change(function () {
	var valor = id_modalidade.val()
  if (valor == "ppi") {
	desativar(epoca,id_epoca);
	desativar(estadioCana,id_estadioCana);
	desativar(varSensivel,id_varSensivel);
	desativar(palha,id_palha);
	desativar(novaCultura,id_novaCultura);
	ativar(revolvimento,id_revolvimento);
	ativar(incorp,id_incorp);
	ativar(areaRestrita,id_areaRestrita);
	ativar(plantioDias,id_plantioDias);
  }
  
  else if (valor == "preMPB") {
	ativar(epoca,id_epoca);
	  desativar(estadioCana,id_estadioCana);
	  desativar(varSensivel,id_varSensivel);
	  desativar(palha,id_palha);
	  desativar(novaCultura,id_novaCultura);
	  desativar(revolvimento,id_revolvimento);
	  desativar(incorp,id_incorp);
	  ativar(areaRestrita,id_areaRestrita);
	  desativar(plantioDias,id_plantioDias);
  }

  else if (valor == "teste") {
	ativar(epoca,id_epoca);
	  ativar(estadioCana,id_estadioCana);
	  ativar(varSensivel,id_varSensivel);
	  ativar(palha,id_palha);
	  ativar(novaCultura,id_novaCultura);
	  ativar(revolvimento,id_revolvimento);
	  ativar(incorp,id_incorp);
	  ativar(areaRestrita,id_areaRestrita);
	  ativar(plantioDias,id_plantioDias);
  }
  else if (valor == "posMPB") {
	ativar(epoca,id_epoca);
	  desativar(estadioCana,id_estadioCana);
	  desativar(varSensivel,id_varSensivel);
	  desativar(palha,id_palha);
	  desativar(novaCultura,id_novaCultura);
	  desativar(revolvimento,id_revolvimento);
	  desativar(incorp,id_incorp);
	  ativar(areaRestrita,id_areaRestrita);
	  desativar(plantioDias,id_plantioDias);
  }
  else if (valor == "quebraLombo") {
	ativar(epoca,id_epoca);
	  desativar(estadioCana,id_estadioCana);
	  ativar(varSensivel,id_varSensivel);
	  desativar(palha,id_palha);
	  desativar(novaCultura,id_novaCultura);
	  desativar(revolvimento,id_revolvimento);
	  ativar(incorp,id_incorp);
	  desativar(areaRestrita,id_areaRestrita);
	  desativar(plantioDias,id_plantioDias);
  }
  else if (valor == "sequencial") {
	ativar(epoca,id_epoca);
	  desativar(estadioCana,id_estadioCana);
	  ativar(varSensivel,id_varSensivel);
	  ativar(palha,id_palha);
	  ativar(novaCultura,id_novaCultura);
	  desativar(revolvimento,id_revolvimento);
	  desativar(incorp,id_incorp);
	  desativar(areaRestrita,id_areaRestrita);
	  desativar(plantioDias,id_plantioDias);
  }
  else if (valor == "canaPlanta") {
	ativar(epoca,id_epoca);
	ativar(estadioCana,id_estadioCana);
	ativar(varSensivel,id_varSensivel);
	desativar(palha,id_palha);
	desativar(novaCultura,id_novaCultura);
	ativar(revolvimento,id_revolvimento);
	desativar(incorp,id_incorp);
	ativar(areaRestrita,id_areaRestrita);
	desativar(plantioDias,id_plantioDias);
  }
  else if (valor == "dessecaDesinfesta") {
	desativar(epoca,id_epoca);
	  desativar(estadioCana,id_estadioCana);
	  desativar(varSensivel,id_varSensivel);
	  desativar(palha,id_palha);
	  desativar(novaCultura,id_novaCultura);
	  desativar(revolvimento,id_revolvimento);
	  desativar(incorp,id_incorp);
	  ativar(areaRestrita,id_areaRestrita);
	  ativar(plantioDias,id_plantioDias);
  }
  else if (valor == "canaSoca") {
	ativar(epoca,id_epoca);
	  ativar(estadioCana,id_estadioCana);
	  ativar(varSensivel,id_varSensivel);
	  ativar(palha,id_palha);
	  ativar(novaCultura,id_novaCultura);
	  desativar(revolvimento,id_revolvimento);
	  desativar(incorp,id_incorp);
	  ativar(areaRestrita,id_areaRestrita);
	  desativar(plantioDias,id_plantioDias);
  }
  })
  //4. função que verifica manos quando o botão submit é apertado
}); 