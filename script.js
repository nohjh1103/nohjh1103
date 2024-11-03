let map;
let directionsService;
let directionsRenderer;
let startLocation;

function initMap() {
    const kyonggiUniversity = { lat: 37.300091, lng: 127.035000 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: kyonggiUniversity,
        zoom: 15,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // 지도 클릭 이벤트 리스너 추가
    map.addListener("click", (event) => {
        const startDropdown = document.getElementById("start-location").value;

        // "지도에서 클릭" 옵션이 선택된 경우에만 클릭 위치를 출발지로 설정
        if (startDropdown === "") {
            startLocation = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };

            // 클릭한 지점에 마커 추가
            new google.maps.Marker({
                position: startLocation,
                map: map,
                title: "출발 지점"
            });

            alert("출발 지점이 설정되었습니다. 목적지를 선택하고 길찾기를 눌러주세요.");
        }
    });
}

function findRoute() {
    const startDropdown = document.getElementById("start-location").value;
    const destinationValue = document.getElementById("destination").value;
    const [destLat, destLng] = destinationValue.split(",");

    // 출발지를 지도에서 클릭한 지점 또는 강의동 선택으로 설정
    if (startDropdown === "") {
        if (!startLocation) {
            alert("출발 지점을 설정하세요.");
            return;
        }
    } else {
        const [startLat, startLng] = startDropdown.split(",");
        startLocation = {
            lat: parseFloat(startLat),
            lng: parseFloat(startLng)
        };
    }

    const destination = { lat: parseFloat(destLat), lng: parseFloat(destLng) };

    const request = {
        origin: startLocation,
        destination: destination,
        travelMode: 'WALKING'
    };

    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            alert("경로를 찾을 수 없습니다.");
            console.log("Directions API status:", status);
        }
    });
}
