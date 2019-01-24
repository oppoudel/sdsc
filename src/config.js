export const tokenUrl = 'https://maps.baltimorecity.gov/egis/tokens/';
export const editServiceUrl =
  'https://maps.baltimorecity.gov/egis/rest/services/SummerLearning/Test/FeatureServer/0';
export const geoQueries = [
  {
    name: 'Neighborhood',
    url:
      'https://maps.baltimorecity.gov/egis/rest/services/OpenBaltimore/Neighborhoods/MapServer/0',
    fName: 'Name'
  },
  {
    name: 'PoliceDistrict',
    url:
      'https://maps.baltimorecity.gov/egis/rest/services/OpenBaltimore/PoliceDistricts/MapServer/0',
    fName: 'Dist_Name'
  }
];
