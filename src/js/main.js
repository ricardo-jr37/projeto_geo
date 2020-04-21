const key="849942f005cd49d191541fd68ecf18ab";
var select = -1
const local = document.querySelector("#geo")
const ipInfoField = document.querySelector('#informes')
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
		let info = data.results
		if (info == "") {
			alert("Localização nao encontrada");
		}		
		else{
			ShowData(data)
		}
		})
	})
	.catch((e)=>{
		console.log("Erro! ")
	})
}
document.querySelector("#forward").addEventListener("click", (e)=> {
	document.querySelector("#help").textContent ="Exemplo: Moabit, Berlin"
	select = 1;
})
document.querySelector("#reverse").addEventListener("click", (e)=>{ 
	document.querySelector("#help").textContent ="Exemplo: -3.79570, -38.49974" 
	select = 0;
})
document.querySelector("#position").addEventListener("click", (e)=>{ 
	select = 2;
	getLocation();
})
const ShowData = (result)=>{
	let info = result.results
	let geo = info[0].geometry
	ipInfoField.innerHTML = "";
	let text = "";
	for(let teste in info){
		text += `<p>${info[teste].annotations.flag}${info[teste].formatted}</p><p>Latitude: ${info[teste].geometry.lat}</p><p>Longitude: ${info[teste].geometry.lng}<br>`	
	}
	ipInfoField.innerHTML = text
}
document.querySelector("#btt").addEventListener("click", (e)=>{
	if (select!=-1) {
		var localizacao=local.value;
		var url = "";
		for(let i in localizacao){
			if (localizacao[i]==",") url+="%2C"
			else if (localizacao[i]==" ") url+="%20"
			else url+=localizacao[i]
		}
		const options = {
			method: 'GET',
			mode: 'cors',
			cache: 'default'
		}
		fetch(`https://api.opencagedata.com/geocode/v1/json?q=${url}&key=${key}&language=pt&pretty=1`,options)
		.then((response)=>{
			if (!response.ok) {
				throw Error(response.statusText)
			}
			response.json()
			.then((data)=>{
				let info = data.results
				if (info == "") {
					ipInfoField.innerHTML = "";
					alert("Localização nao encontrada");
				}		
				else{
					ShowData(data)
				}
			})
		})
		.catch((e)=>{
			console.log("Erro! ")
		})
	}
	else {
		alert("selecionar o tipo de localização!");
	}
})
