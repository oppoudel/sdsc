import { generateToken } from "@esri/arcgis-rest-auth";
var url = "https://maps.baltimorecity.gov/egis/tokens/";
var data = {
  username: "baltimore\\gis_data",
  password: "#50DATAFiles"
};

const serviceURL =
  "https://maps.baltimorecity.gov/egis/rest/services/CAD/Police_CADCALLSGEO_24hrs/MapServer/0/query?where=1%3D1&f=pjson&token=";

generateToken(url, data)
  .catch(error => console.error("Error:", error))
  .then(response =>
    fetch(serviceURL + response.token).then(res => console.log(res.json()))
  );
