/*!
 * Transcrito Português-brasileira para Quenya Tengwar Tabs v1.0.0 (https://github.com/ClubeDosGeeksCoding/ptbr-to-quenya-tengwar)
 *
 * Copyright 2015 Jayr Alencar (http://jayralencar.com.br) & Clube dos Geeks (//clubedosgeeks.com.br)
 * Licensed under the The MIT License (MIT) (https://github.com/ClubeDosGeeksCoding/ptbr-to-quenya-tengwar/blob/master/LICENSE)

 * Para que tudo funcione bem use a fonte Tengwar Annatar (http://www.dafont.com/pt/tengwar-annatar.font)
 ** Em alguns casos uso HexCode, como por exemplo nos acentos ou Ç. Ex.: ô = \xF4 , veja (http://www.javascripter.net/faq/accentedcharacters.htm)
 */

(function ( $ ) {
	/*
	@name: cdgQuenya
	@type: jQuery plugin
	@author: jayralencar
	@discription: Inicializa o plugin e fica escutando o evento keyup pra asssim traduzir
	@returns: o elemento
	*/
	$.fn.cdgQuenya = function(options){
		var settings = $.extend({
		}, options );

		var result_element = $('#'+$(this).attr('id-result'));
		value = $(this).val();
		result_element.html(tengwar(value));
		$(this).keyup(function(){
			value = $(this).val();
			result_element.html(tengwar(value));
		});

		return this;

	}

	/*
	@name: tengwar
	@type: method
	@author: jayralencar
	@discription: Divide a string em partes para transcrever
	@input: texto comum
	@returns: texto transcrito para Tengwar 
	*/
	function tengwar(str){
		str = str.toLowerCase();
		var partes = str.split(' ');
		var resposta = '';
		for(var i = 0 ; i < partes.length; i++){
			resposta +=traduz(partes[i])+' ';
		}
		return resposta;
	}

	/*
	@name: traduz
	@type: method
	@author: jayralencar
	@discripion: Faz a transcrição de palavra para tengwar annatar
	@input: texto comum - apenas 1 palavra
	@returns: palavra transcrita para Tengwar
	*/
	function traduz(str){
		/*
		Este método é dividido por blocos:
		1 - Transcrição de nomes próprios de personagens da obra de J.R.R. Tolkien
		2 - Substituição de caracteres que não  tem aplicação na transcrição, por exemplo Ç por S
		3 - Divisão da palavra em partes com split();
		4 - Exclusão da letra H se estiver no início da palavar, por exemplo Hora fica ora
		5 - Loop de substituição, também divido em partes:
			5.1 - Substituição de números
			5.2 - Substituição de pontuação
			5.3 - Substituição de ditongo nasais (ão, ãe, õe)
			5.4 - Substituição de excessões de inicio de palavra (s, z, g, h)
			5.5 - Substituição de excessões de meio de palavra (ch, nh, rr, lh, gu, qu, /)
			5.6 - Tratamento da consoante Z, pois difere se acompanhado por vogal ou consoante
			5.7 - Tratamento de consoantes, com tratamento para Hiato ex.: sair
			5.8 - Tratamento de vogais, que é dividido por partes:
				5.8.1 - Silabas nasais <vogal>+</m/ ou /n/> +<consoante>
				5.8.2 - Tratamento de ditongos não nasais (ai, ou, au, ao, etc)
				5.8.3 - Tratamento de hiatos
		6 - Tratamento de \n (ENTER)
		*/

		//1 - Transcrição de nomes próprios de personagens da obra de J.R.R. Tolkien
		var nomesPT = [
			'finw\xF6',
			'galadriel',
			'gandalf'
		];
		var nomesQu = [
			'eG5nR',
			'x#j#7T`Vj',
			'x#2#je'
		];

		if(nomesPT.indexOf(str)>=0){
			return nomesQu[nomesPT.indexOf(str)]
		}

		//2 - Substituição de caracteres que não  tem aplicação na transcrição, por exemplo Ç por S
		var substituir = [
			['\xE7','s'], // Ç
			['y','i'],
			[/\ben/,'e'],
			[/\xE0|\xE1|\xE2/, 'a'],
			[/\xEA|&/, 'e'],
			[/\xF4|\xF2/,'o'],
			[/\xFA|\xFB/,'u'],
			[/\xED|\xEC/,'i']
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
		var execoes_pt = ['ch', 'nh', 'rr', 'lh','gu','qu','/'];
		var execoes_qu = ['d' , 'g',  '7',  'm', 'x', 'z','ü'];

		//Tratamento de inicio
		var inicio_pt = ['h','s', 'z','g'];
		var inicio_qu = ['', '8',',','f'];

		//Pontuação
		var pontuacao_pt = [',','.','!',	'?',  ';',':','(',')','-','+'];
		var pontuacao_qu = ['=','-','\xC1','\xC0','-','=','=','=','=','='];

		//numeros
		var numeros_pt = ('0123456789').split('');
		// var numeros_qu = ('ð ñ ò ó ô õ ö ÷ ø ù').split('');
		var numeros_qu = ['\xF0','\xF1','\xF2','\xF3','\xF4','\xF5','\xF6','\xF7','\xF8','\xF9'];

		// 3 - Divisão da palavra em partes com split();
		var partes = str.split('');

		// 4 - Exclusão da letra H se estiver no início da palavar, por exemplo Hora fica ora
		if(partes[0]=='h'){
			partes.splice(0, 1);
		}

		var nova = '';


		// 5 - Loop de substituição, também divido em partes:
		for(var i = 0 ; i < partes.length; i++){
			if(partes[i]==' '){
				nova+='&nsb';
				continue;
			}

			//5.1 - Substituição de números
			if(numeros_pt.indexOf(partes[i])>=0){
				nova += numeros_qu[numeros_pt.indexOf(partes[i])];
				continue;
			}

			//5.2 - Substituição de pontuação
			if(pontuacao_pt.indexOf(partes[i])>=0){
				nova += pontuacao_qu[pontuacao_pt.indexOf(partes[i])];
				continue;
			}

			//5.3 - Substituição de ditongo nasais (ão, ãe, õe)
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

			// 5.4 - Substituição de excessões de inicio de palavra (s, z, g, h)
			if(i==0){
				if(inicio_pt.indexOf(partes[i])>=0){
					nova += inicio_qu[inicio_pt.indexOf(partes[i])];
					continue;
				}
			}

			//5.5 - Substituição de excessões de meio de palavra (ch, nh, rr, lh, gu, qu, /)
			if(i<partes.length){
				if(execoes_pt.indexOf(partes[i]+partes[i+1])>=0){
					nova += execoes_qu[execoes_pt.indexOf(partes[i]+partes[i+1])];
					i++;
					continue;
				}
			}

			//5.6 - Tratamento da consoante Z, pois difere se acompanhado por vogal ou consoante
			if(partes[i]=='z'){
				if(vogais_pt.indexOf(partes[i-1])>-1){
					nova+='k';
				}else{
					nova+=',';
				}
				continue;
			}
			//5.7 - Tratamento de consoantes, com tratamento para Hiato ex.: sair
			if(consoantes_pt.indexOf(partes[i])>=0){
				nova += consoantes_qu[consoantes_pt.indexOf(partes[i])];
				//Hiato
				if((i+3) < partes.length && (vogais_pt.indexOf(partes[i+1])>=0 && (vogais_pt.indexOf(partes[i+2])>=0) &&  ('r').indexOf(partes[i+3])>=0)){
					nova += vogais_qu[vogais_pt.indexOf(partes[i+1])];
					nova += '`'+vogais_qu[vogais_pt.indexOf(partes[i+2])];
					nova += consoantes_qu[consoantes_pt.indexOf(partes[i+3])];
					i+=3;
					continue;
				}

				//hiato saiu
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

			//5.8 - Tratamento de vogais, que é dividido por partes
			if(vogais_pt.indexOf(partes[i])>=0){

				

				if(i>2){
					if(execoes_pt.indexOf(partes[i-2]+partes[i-1])>=0){
						nova+=vogais_qu[vogais_pt.indexOf(partes[i])];
					}
				}
				
				if((i+3)<partes.length){
					//5.8.1 - Silabas nasais <vogal>+</m/ ou /n/> +<consoante>
					if((partes[i+1]=='m' || partes[i+1]=='n') && consoantes_pt.indexOf(partes[i+2])>-1 ) {
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
					//5.8.2 - Tratamento de ditongos não nasais (ai, ou, au, ao, etc)
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

				//5.8.3 - Tratamento de hiatos
				if(((i+2) < partes.length) && (consoantes_pt.indexOf(partes[i-1])>=0 || inicio_pt.indexOf(partes[i-1]) >= 0 ) && (vogais_pt.indexOf(partes[i]) >= 0 && vogais_pt.indexOf(partes[i+1]) >= 0 )  && ('r').indexOf(partes[i+2]) >=0 ){
					nova += vogais_qu[vogais_pt.indexOf(partes[i])];
					nova += '`'+vogais_qu[vogais_pt.indexOf(partes[i+1])];
					nova += consoantes_qu[consoantes_pt.indexOf(partes[i+2])];
					i+=3;
					continue;
				}

				//5.8.3 - Tratamento de hiatos
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

				////5.8.2 - Tratamento de ditongos não nasais (ai, ou, au, ao, etc)
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

			}

			// 6 - Tratamento de \n (ENTER)
			if(partes[i]=='\n'){
				nova+='<br/>'
				continue;
			}
			
			nova += partes[i];
		}
		return nova;
	}


})(jQuery);