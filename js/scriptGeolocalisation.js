var x = document.getElementById("title");
var infopos = "Position déterminée :\n";

function maPosition(position) {
	infopos += "Latitude : " + position.coords.latitude +"\n";
	infopos += "Longitude: " + position.coords.longitude+"\n";
	infopos += "Altitude : " + position.coords.altitude +"\n";
	document.getElementById("infoposition").append(infopos);

	var uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});

	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	geocoder.geocode(
		{'latLng': latlng}, 
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var add= results[0].formatted_address ;
					var  value=add.split(",");

					/*count=value.length;
					country=value[count-1];
					state=value[count-2];
					city=value[count-3];
					alert(value);*/
					$("#city").text(value);
				}
				else  {
					alert("address not found");
				}
			}
			else {
				alert("Geocoder failed due to: " + status);
			}
		}
		);
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(maPosition, showError);
} else {
	x.innerHTML = "Geolocation n'est pas supporté par ce navigateur.";
}

function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
		x.innerHTML = "User denied the request for Geolocation."
		break;
		case error.POSITION_UNAVAILABLE:
		x.innerHTML = "Location information is unavailable."
		break;
		case error.TIMEOUT:
		x.innerHTML = "The request to get user location timed out."
		break;
		case error.UNKNOWN_ERROR:
		x.innerHTML = "An unknown error occurred."
		break;
	}
}