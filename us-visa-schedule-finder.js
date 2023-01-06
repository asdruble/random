// CÓDIGO PARA ENCONTRAR UM HORÁRIO DISPONÍVEL PARA AGENDAMENTO DE VISTO AMERICANO NO BRASIL
// URL: https://ais.usvisa-info.com/pt-br/niv/schedule/

// Inputar data máxima desejada em formato ISO (yyyy-mm-dd)
desiredDate = '2023-03-10';
currentDate = '2024-08-01'
currentLoc = 'SP'

// LOGIC
window.locs = [
	{'id':'56', 'name':'SP'},
	{'id':'54', 'name':'BRASILIA'},
	{'id':'55', 'name':'RJ'},
	{'id':'57', 'name':'RECIFE'},
	{'id':'128', 'name':'POA'}
];
var dd = new Date(desiredDate);
window.available = [];
var xhr = new XMLHttpRequest();

function getNewPlace(index = 0){
	
	if(index >= locs.length){
		printaHoras();
	}
	else{
		xhr.open('GET', window.location.href + '/days/'+ locs[index].id +'.json?appointments[expedite]=false', true);
		xhr.onload = function () {
		  if (this.status === 200) {
		    var arr = JSON.parse(this.responseText);
		    window.available.push({'firstDate': arr[0]?arr[0].date:'NENHUM', 'local': window.locs[index].name});
		  }
		  getNewPlace(++index);
		};
		xhr.send();
	}
}


function printaHoras(){
	var found = 0;
	for (var i=0; i<available.length; i++){
		if(new Date(available[i].firstDate) <= dd) found = 1;
		if(new Date(available[i].firstDate) < new Date(available[i].currentDate) && available[i].local == currentLoc) found = 1;
	}
	console.log((new Date()).toGMTString());
	console.table(available);
	if(found){
		var audio = new Audio('https://cdn.freesound.org/previews/132/132930_321967-lq.mp3');
		audio.play();
	}
	available = [];
	setTimeout(getNewPlace, 1000 * 60 * 15);
}

getNewPlace();
