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
		//Ver caractres em links
		var codes = [
			['pa','qC'],
			['pe','qR'],
			['p\xE9','q\xD4'],
			['pi','q='],
			['po','qH'],
			['p\xF3','q\xDA'],
			['pu','qU'],
			['p','q'],
			['ro','6H'],
			['ba','wC'],
			['ba','wC'],

		];

		for(var i = 0; i < codes.length; i++){
			// str = str.replace(codes[i][0],codes[i][1]);
			str = str.split(codes[i][0]).join(codes[i][1]);
		}

		return str;
	}


})(jQuery);