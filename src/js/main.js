const key="849942f005cd49d191541fd68ecf18ab";
var select = -1
const local = document.querySelector("#geo")
const ipInfoField = document.querySelector('#informes')
String.prototype.capitalize = function (){
	return this.charAt(0).toUpperCase() + this.substring(1, this.length).toLowerCase();
}



function getLocation(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
	alert("O seu navegador não suporta Geolocalização.");
	}	
}
function showPosition(position){
	const options = {
		method: 'GET',
		mode: 'cors',
		cache: 'default'
	}
	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}%2C%20${position.coords.longitude}&key=${key}&language=pt&pretty=1`,options)
	.then((response)=>{
		if (!response.ok) {
			throw Error(response.statusText)
		}
		response.json()
		.then((data)=>{
		//ShowData(data)
		console.log(data)
		let info = data.results
		if (info == "") {
			alert("Localização nao encontrada");
		}		
		else{
			ShowData(data)
			//console.log(info)
		}
		//for(let teste in info){
		//console.log(teste,info[teste].formatted)
		//}
		//console.log(data.results[0].formatted)	
		})
	})
	.catch((e)=>{
		console.log("Erro! ")
			//document.querySelector("#id").textContent = "Pokemon não encontrado"
			//document.querySelector("#imagem_pokemon").src = "";
			//document.querySelector("#moves").textContent ="";
	})
	//console.log("Latitude:" + position.coords.latitude +  " Longitude:" + position.coords.longitude);  
}




document.querySelector("#forward").addEventListener("click", (e)=> {
	document.querySelector("#help").textContent ="Exemplo: Moabit, Berlin"
	select = 1;
	//getLocation();
})
document.querySelector("#reverse").addEventListener("click", (e)=>{ 
	document.querySelector("#help").textContent ="Exemplo: -3.79570, -38.49974" 
	select = 0;
	//console.log(select);
})
document.querySelector("#position").addEventListener("click", (e)=>{ 
	select = 2;
	getLocation();
	//console.log(select);
})
const ShowData = (result)=>{
	let info = result.results
	let geo = info[0].geometry
	ipInfoField.innerHTML = "";
	let text = "";
	//console.log(geo)
	for(let teste in info){
		let elemento_pai = document.body;
		console.log(info[teste].formatted);
		console.log(info[teste].geometry.lat)
		console.log(info[teste].geometry.lng)
		text += `<p>${info[teste].annotations.flag}${info[teste].formatted}</p><p>Latitude: ${info[teste].geometry.lat}</p><p>Longitude: ${info[teste].geometry.lng}<br>`
		/*
		var titulo = document.createElement('h5');
		titulo.textContent = info[teste].formatted
		elemento_pai.appendChild(titulo);
		var titulo = document.createElement('h6');
		titulo.textContent = "Latitude: "+ info[teste].geometry.lat+ " Longitude: "+ info[teste].geometry.lng
		elemento_pai.appendChild(titulo);
		*/		
	}
	ipInfoField.innerHTML = text
	//console.log(info)

	/*
	document.querySelector("#moves").textContent ="Ataques: ";
	for(let campo in result){
	
	}
	for(let i in ataques){
		if (i == ataques.length-1) document.querySelector("#moves").textContent += ataques[i].move.name;
		else document.querySelector("#moves").textContent += ataques[i].move.name +", ";
	}	
	*/
	
}


document.querySelector("#btt").addEventListener("click", (e)=>{
	if (select!=-1) {
		//separando os vetores
		var localizacao=local.value.replace(" ","");
		localizacao = localizacao.split(",");
		const options = {
			method: 'GET',
			mode: 'cors',
			cache: 'default'
		}
		//console.log(localizacao);
		//console.log(localizacao[0].capitalize());
		//console.log(localizacao[1].capitalize());
		fetch(`https://api.opencagedata.com/geocode/v1/json?q=${localizacao[0].capitalize()}%2C%20${localizacao[1].capitalize()}&key=${key}&language=pt&pretty=1`,options)
		.then((response)=>{
			if (!response.ok) {
				throw Error(response.statusText)
			}
			response.json()
			.then((data)=>{
				//ShowData(data)
				console.log(data)
				let info = data.results
				if (info == "") {
					ipInfoField.innerHTML = "";
					alert("Localização nao encontrada");
				}		
				else{
					ShowData(data)
					//console.log(info)
				}
				//for(let teste in info){
					//console.log(teste,info[teste].formatted)
				//}
				//console.log(data.results[0].formatted)	
			})
		})
		.catch((e)=>{
			console.log("Erro! ")
			//document.querySelector("#id").textContent = "Pokemon não encontrado"
			//document.querySelector("#imagem_pokemon").src = "";
			//document.querySelector("#moves").textContent ="";
		})
	}
	else {
		alert("selecionar o tipo de localização!");
	}
})