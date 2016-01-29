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

		//Tratar ditongos nasais e mais coisas pra substituir
		var ditongo_nasais = [
			['\xE3e','aim'],
			['\xF5e','oim'],
			['\xE3o', 'aum'],
			['\xE7','s'], // Ç
			['y','i']
		];

		for(var i = 0 ; i < ditongo_nasais.length ; i++){
			str = str.split(ditongo_nasais[i][0]).join(ditongo_nasais[i][1])
		}

		

		//Tratar ditongos
		// Estou aqui -> LEMBRAR DE ADICIONAR DITONGOS ACENTUÁDO saúde
		var ditongos_pt = ['ai','au','ei','eu','ia','ie','io','iu','oi','ou','ua','ue','ui','uo'];
		var ditongos_qu = ['lC','.C','lR','.R','hC','hR','hN','hM','lN','.N','nC','nR','nB','nN'];

		//Vogais
		var vogais_pt = ['a','e','\xE9','i','o','\xF3','u'];
		var vogais_qu = ['C','R','\xD4','R','N','\xDA','M'];

		//Consoantes
		var consoantes_pt = ('bcdfgjklmnpqrstvw').split('');
		var consoantes_qu = ('wa2esfajt5qa6i1rr').split('');

		//Exceções
		//ch, nh, rr, lh, 
		var execoes_pt = ['ch', 'nh', 'rr', 'lh','gu','qu'];
		var execoes_qu = ['d' , 'g',  '7',  'm', 'x', 'z'];

		//Tratamento de inicio
		var inicio_pt = ['h','s', 'z'];
		var inicio_qu = ['', '8','k']

		var partes = str.split('');
		var nova = '';

		for(var i = 0 ; i < partes.length; i++){
			if(i==0){
				if(inicio_pt.indexOf(partes[i])>=0){
					nova += inicio_qu[inicio_pt.indexOf(partes[i])];
					continue;
				}
			}
			if(i<partes.length){
				if(execoes_pt.indexOf(partes[i]+partes[i+1])>=0){
					nova += execoes_qu[execoes_pt.indexOf(partes[i]+partes[i+1])];
					i++;
					continue;
				}
			}

			if(partes[i]=='z'){
				if(vogais_pt.indexOf(partes[i-1])>-1){
					nova+=',';
				}else{
					nova+='k';
				}
				continue;
			}
			//Consoantes
			if(consoantes_pt.indexOf(partes[i])>=0){
				nova += consoantes_qu[consoantes_pt.indexOf(partes[i])];
				//SAIR
				if((i+3) < partes.length && (vogais_pt.indexOf(partes[i+1])>=0 && (vogais_pt.indexOf(partes[i+2])>=0) &&  consoantes_pt.indexOf(partes[i+3])>=0)){
					nova += vogais_qu[vogais_pt.indexOf(partes[i+1])];
					nova += '`'+vogais_qu[vogais_pt.indexOf(partes[i+2])];
					nova += consoantes_qu[consoantes_pt.indexOf(partes[i+3])];
					i+=3;
					continue;
				}

				//Saiu
				if((i+3) < partes.length && (vogais_pt.indexOf(partes[i+1])>=0 && (vogais_pt.indexOf(partes[i+2])>=0 &&  vogais_pt.indexOf(partes[i+3])>=0))){
					nova += vogais_qu[vogais_pt.indexOf(partes[i+1])];
					if(ditongos_pt.indexOf(partes[i+2]+partes[i+3])>=0){
						nova += ditongos_qu[ditongos_pt.indexOf(partes[i+2]+partes[i+3])]
					}else{
						nova += vogais_qu[vogais_pt.indexOf(partes[i+2])];
						nova += vogais_qu[vogais_pt.indexOf(partes[i+3])];
					}
					i+=3;
					continue;
				}


				continue;
			}

			//Vogais
			if(vogais_pt.indexOf(partes[i])>=0){

				if(i==0){
					nova+='`'+vogais_qu[vogais_pt.indexOf(partes[i])];
					continue;
				}

				if(i>2){
					if(execoes_pt.indexOf(partes[i-2]+partes[i-1])>=0){
						nova+=vogais_qu[vogais_pt.indexOf(partes[i])];
					}
				}
				
				if((i+3)<partes.length){
					//NASAIS
					if((partes[i+1]=='m' || partes[i+1]=='n') && consoantes_pt.indexOf(partes[i+2])>-1 ) {
						//te nto
						//qR qFN
						//vogal
						nova += vogais_qu[vogais_pt.indexOf(partes[i])];
						//Consoante
						nova += consoantes_qu[consoantes_pt.indexOf(partes[i+2])]+'F';
						//vogal
						nova += vogais_qu[vogais_pt.indexOf(partes[i+3])];
						i+=3;
						continue;
					}

				}

				//sair hiato
				if(((i+2) < partes.length) && (consoantes_pt.indexOf(partes[i-1])>=0 || inicio_pt.indexOf(partes[i-1]) >= 0 ) && (vogais_pt.indexOf(partes[i]) >= 0 && vogais_pt.indexOf(partes[i+1]) >= 0 )  && consoantes_pt.indexOf(partes[i+2]) >=0 ){
					nova += vogais_qu[vogais_pt.indexOf(partes[i])];
					nova += '`'+vogais_qu[vogais_pt.indexOf(partes[i+1])];
					nova += consoantes_qu[consoantes_pt.indexOf(partes[i+2])];
					i+=3;
					continue;
				}

				//
				if(((i+2) < partes.length) && (consoantes_pt.indexOf(partes[i-1])>=0 || inicio_pt.indexOf(partes[i-1]) >= 0 ) && (vogais_pt.indexOf(partes[i]) >= 0 && vogais_pt.indexOf(partes[i+1]) >= 0 )  && vogais_pt.indexOf(partes[i+2]) >= 0  ){
					nova += vogais_qu[vogais_pt.indexOf(partes[i])];
					if(ditongos_pt.indexOf(partes[i+1]+partes[i+2])>=0){
						nova += ditongos_qu[ditongos_pt.indexOf(partes[i+1]+partes[i+2])]
					}else{
						nova += vogais_qu[vogais_pt.indexOf(partes[i+1])];
						nova += vogais_qu[vogais_pt.indexOf(partes[i+2])];
					}
					i+=3;
					continue;
				}

				//Ditongos
				if((i+1)<partes.length &&  vogais_pt.indexOf(partes[i+1]) >= 0){
					if(ditongos_pt.indexOf(partes[i]+partes[i+1])>=0){
						nova += ditongos_qu[ditongos_pt.indexOf(partes[i]+partes[i+1])]
					}else{
						nova += vogais_qu[vogais_pt.indexOf(partes[i])];
						nova += vogais_qu[vogais_pt.indexOf(partes[i+1])];
					}
					i+=2;
					continue;
				}


				nova += vogais_qu[vogais_pt.indexOf(partes[i])];
				continue;


				// if(){

				// }
			}



			
			
			nova += partes[i];
		}

		return nova;
	}


})(jQuery);