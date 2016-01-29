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

		// coisas pra substituir
		var partes = str.split(' ');
		var resposta = '';
		for(var i = 0 ; i < partes.length; i++){
			resposta +=traduz(partes[i])+' ';
		}

		return resposta;
	}

	function traduz(str){
		var substituir = [
			['\xE7','s'], // Ç
			['y','i'],
			[/\ben/,'e'],
			[/\xE0|\xE1|\xE2/, 'a'],
			[/\xEA|&/, 'e'],
			[/\xF4|\xF2/,'o'],
			[/\xFA|\xFB/,'u']
		];

		for(var i = 0 ; i < substituir.length ; i++){
			str = str.split(substituir[i][0]).join(substituir[i][1])
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
		var inicio_pt = ['h','s', 'z','g'];
		var inicio_qu = ['', '8',',','f'];

		//Pontuação
		var pontuacao_pt = [',','.','!',	'?',  ';',':','(',')','-','+'];
		var pontuacao_qu = ['=','-','\xC1','\xC0','-','=','=','=','=','='];

		//numeros
		var numeros_pt = ('0123456789').split('');
		// var numeros_qu = ('ð ñ ò ó ô õ ö ÷ ø ù').split('');
		var numeros_qu = ['\xF0','\xF1','\xF2','\xF3','\xF4','\xF5','\xF6','\u00F7','\xF8','\xF9'];

		var partes = str.split('');
		if(partes[0]=='h'){
			partes.splice(0, 1);
		}

		var nova = '';

		for(var i = 0 ; i < partes.length; i++){
			if(partes[i]==' '){
				nova+='&nsb';
				continue;
			}

			//Numeros
			if(numeros_pt.indexOf(partes[i])>=0){
				nova += numeros_qu[numeros_pt.indexOf(partes[i])];
				continue;
			}

			//Pontuacao
			if(pontuacao_pt.indexOf(partes[i])>=0){
				nova += pontuacao_qu[pontuacao_pt.indexOf(partes[i])];
				continue;
			}

			//Ditongos nasais
			if(partes.length>2 && i+2<partes.length){
				if(partes[i]+partes[i+1]+partes[i+2]=='\xE3os'){
					nova+='.CiP';
					i+=2;
					continue;
				}
			}
			if(partes.length>2 && i+2<partes.length){
				if(partes[i]+partes[i+1]+partes[i+2]=='\xE3es'){
					nova+='lCiP';
					i+=2;
					continue;
				}
			}
			if(partes.length>2 && i+2<partes.length){
				if(partes[i]+partes[i+1]+partes[i+2]=='\xF5es'){
					nova+='lNiP';
					i+=2;
					continue;
				}
			}
			if(partes.length>1 && i+1<partes.length){
				if(partes[i]+partes[i+1]=='\xE3o'){
					nova+='.Cb';
					i++;
					continue;
				}
			}
			if(partes.length>1 && i+1<partes.length){
				if(partes[i]+partes[i+1]=='\xE3e'){
					nova+='b';
					i++;
					continue;
				}
			}
			if(partes.length>1 && i+1<partes.length){
				if(partes[i]+partes[i+1]=='\xF5e'){
					nova+='lNb';
					i++;
					continue;
				}
			}


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
					nova+='k';
				}else{
					nova+=',';
				}
				continue;
			}
			//Consoantes
			if(consoantes_pt.indexOf(partes[i])>=0){
				nova += consoantes_qu[consoantes_pt.indexOf(partes[i])];
				//SAIR
				if((i+3) < partes.length && (vogais_pt.indexOf(partes[i+1])>=0 && (vogais_pt.indexOf(partes[i+2])>=0) &&  ('r').indexOf(partes[i+3])>=0)){
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
						if(i==0){
							nova='`';
						}
						nova += vogais_qu[vogais_pt.indexOf(partes[i])];
						
						if(vogais_pt.indexOf(partes[i+3])>=0){
							//Consoante
							nova += consoantes_qu[consoantes_pt.indexOf(partes[i+2])]+'P';
							//vogal
							nova += vogais_qu[vogais_pt.indexOf(partes[i+3])];	
						}else{
							//Consoante
							nova += consoantes_qu[consoantes_pt.indexOf(partes[i+2])];
							//vogal
							nova += consoantes_qu[consoantes_pt.indexOf(partes[i+3])];	
						}
						
						i+=3;
						continue;
					}

				}

				if(i==0){
					//Ditongos
					if((i+1)<partes.length &&  vogais_pt.indexOf(partes[i+1]) >= 0){
						if(ditongos_pt.indexOf(partes[i]+partes[i+1])>=0){
							nova += ditongos_qu[ditongos_pt.indexOf(partes[i]+partes[i+1])]
							i++;
							continue;
						}else{
							
						}
						
					}
					nova+='`'+vogais_qu[vogais_pt.indexOf(partes[i])];
					continue;
				}

				//sair hiato
				if(((i+2) < partes.length) && (consoantes_pt.indexOf(partes[i-1])>=0 || inicio_pt.indexOf(partes[i-1]) >= 0 ) && (vogais_pt.indexOf(partes[i]) >= 0 && vogais_pt.indexOf(partes[i+1]) >= 0 )  && ('r').indexOf(partes[i+2]) >=0 ){
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
						nova += ditongos_qu[ditongos_pt.indexOf(partes[i]+partes[i+1])];
					}else{
						nova += vogais_qu[vogais_pt.indexOf(partes[i])];
						nova += vogais_qu[vogais_pt.indexOf(partes[i+1])];
					}
					i++;
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