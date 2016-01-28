(function ( $ ) {
	$.fn.cdgQuenya = function(options){
		var settings = $.extend({
		}, options );

		var result_element = $('#'+$(this).attr('id-result'));

		$(this).keyup(function(){
			value = $(this).val();
			result_element.text(tengwar(value));
		})

	}

	function tengwar(str){
		str = str.toLowerCase();

		var consoantes_pt = ('bcdfgjklmnprtvw').split('');
		var consoantes_qu = ('wa2esfajt5q61rr').split('');

		//Tratar ditongos
		// Estou aqui -> LEMBRAR DE ADICIONAR DITONGOS ACENTUÁDO saúde
		var ditongos_pt = ['ai','au','ei','eu','ia','ie','io','iu','oi','ou','ua','ue','ui','uo'];
		var ditongos_qu = ['lC','.C','lR','.R','hC','hR','']

		return str;
	}


})(jQuery);