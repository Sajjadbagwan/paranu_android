
export default class ParanuGeoLocation {
    
    static getLocationFor = (lat, long) => {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + 'AIzaSyBXX4cdX1zy2fNyMZu5XIPbQ5E0JRY3Eek'
        return fetch(url)
        .then((response) => response.json())
        .catch(error => error)
    }

}