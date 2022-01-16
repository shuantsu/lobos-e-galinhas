$(function(){

var movimentos = 0, evt;

function criarBicho(bicho) {
	return $("<div/>", {class: bicho}).click(function(e){
		evt = e;
		e.stopPropagation();
	});
}

function barcoLado() {
	if ($("#barco").css('margin-left') == '0px') {
		return 'esquerda';
	}
	return 'direita';
}

function descarregarNoLado(lado) {
	var n_lobos = $("#barco .lobo").length, 
		n_galinhas = $("#barco .galinha").length;
	for (var n = 0; n < n_lobos; n++) {
		criarBicho('lobo').appendTo("#"+lado+" .lobos").click(bichoClicado);
	}
	for (var n = 0; n < n_galinhas; n++) {
		criarBicho('galinha').appendTo("#"+lado+" .galinhas").click(bichoClicado);
	}
	$("#barco div").remove();
}

function moveBarco() {
	var $barco = $("#barco");
	if (barcoQuantia() > 0) {
		if (barcoLado() == 'esquerda') {
			$barco.animate({'margin-left': '158px'}, {complete: descarregarBarco});
		} else {
			$barco.animate({'margin-left': '0'}, {complete: descarregarBarco});
		}
		$("#num_mov").html(++movimentos);
	}
}

function barcoQuantia() {
	return $("#barco div").length;
}

function descarregarBarco() {
	descarregarNoLado(barcoLado());
	perdeuOuGanhou();
}

function descarregarApenasUm(lado) {
	var $this = $(evt.target), bicho = $this.attr('class');
	
	criarBicho(bicho).appendTo("#"+lado+" ."+bicho+"s").click(bichoClicado);
	$this.remove();
}

function descarregarNoLadoAdjacente() {
	descarregarApenasUm(barcoLado());
}

function bichoClicado(e){
	var $this = $(e.target);
	
	if (barcoQuantia() < 2) {
		if (barcoLado() == $this.parent().parent().attr('id')){
			$this.remove();
			criarBicho($this.attr('class')).click(descarregarNoLadoAdjacente).appendTo('#barco');
		}
	}
}

function perdeuOuGanhou() {
	var n_esquerda_lobos = $("#esquerda .lobo").length,
		n_direita_lobos = $("#direita .lobo").length,
		n_esquerda_galinhas = $("#esquerda .galinha").length,
		n_direita_galinhas = $("#direita .galinha").length,
		esquerda_tem_galinhas = n_esquerda_galinhas > 0;
		direita_tem_galinhas = n_direita_galinhas > 0,
		galinhas_mortas_esquerda = esquerda_tem_galinhas && n_esquerda_lobos > n_esquerda_galinhas,
		galinhas_mortas_direita = direita_tem_galinhas && n_direita_lobos > n_direita_galinhas,
		ganhou = (n_direita_lobos + n_direita_galinhas) == 6;
	
	if (galinhas_mortas_esquerda) {
		if (n_esquerda_galinhas < 2) {
			alert('Os lobos no lado esquerdo comeram a galinha! Reiniciando...');
		} else {
			alert('Os lobos no lado esquerdo comeram as galinhas! Reiniciando...');
		}
		window.location.reload();
	}
	if (galinhas_mortas_direita) {
		if (n_direita_galinhas < 2) {
			alert('Os lobos no lado direito comeram a galinha! Reiniciando...');
		} else {
			alert('Os lobos no lado direito comeram as galinhas! Reiniciando...');
		}
		window.location="index.html";
	}
	if (ganhou) {
		alert("Parabéns! Você ganhou! Você usou "+$("#num_mov").html()+" movimentos");
		$('.lobo, .galinha').unbind("click");
	}
}

$(".lobo, .galinha").click(bichoClicado);

$("#barco").click(moveBarco);

$("#instrucoes").click(function(){
	alert("INSTRUÇÕES:\n\nLeve os três lobos e três galinhas para o lado direito do rio obedecendo as seguintes regras:\n\n"+
	"- Não mais do que dois animais podem pilotar o barco ao mesmo tempo.\n"+
	"- Deve haver pelo menos um animal no barco para ele se mover.\n"+
	"- Se mais lobos que galinhas ficarem em qualquer lado do rio, os lobos irão comer as galinhas e você irá reiniciar o jogo.\n\n"+
	"Para pôr um animal no barco clique no animal. Para atravessar o rio, clique no barco.\n\nVocê pode mover o barco quantas vezes quiser, mas o feito pode ser conseguido em apenas 11 movimentos.");
});

$("#dica1").click(function(){
	alert("DICA 1:\n\nVocê acabou percebendo que está movendo o barco para lá e para cá e ficando com o número de animais inicial no lado esquerdo?\n\n"+
	"Nos seus movimentos você está fazendo alguma coisa que devolve os animais para os seus lugares iniciais. Quando isso acontecer, tente fazer algo diferente do que já fez até agora. Isso pode te trazer mais perto da solução.");
});

$("#dica2").click(function(){
	alert("DICA 2:\n\nVocê não é obrigado a levar dois animais em todas as viagens e trazer apenas um animal. Algumas vezes você desejará trazer dois animais.\n\n"+
	"Para começar, tente levar os três lobos para o lado direito. Você pode então lentamente trocar os lobos por galinhas.");
});

$("#dica3").click(function(){
	alert("DICA 3:\n\nVamos recapitular a dica anterior. Primeiro leve todos os lobos para o lado direito do rio. Então, comece a trocar os lobos por galinhas. Quando você tiver muito poucas galinhas no lado esquerdo, você pode trazer uma galinha com um lobo para evitar que as galinhas restantes sejam comidas.");
});

$('#reset').click(function(){if (confirm("Deseja começar tudo de novo?")) window.location='index.html'});

$("a").each(function(idx, el) {
	if ($(el).attr("href") == "#") {
		$(this).click(function() {
			return false;
		});
	}
});

});