import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";  
import { sortData, prettyPrintStat } from './helpers/util'
import 'leaflet/dist/leaflet.css'
import './css/App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map';  
import Table from './components/Table';
import LineGraph from './components/LineGraph'



const App = () =>                 
{
const [ countries, setCountries] = useState(["Syria", "Belgium", "USA"]);
const [country, setCountry] = useState("worldwide")
const [ countryData, setCountryData] = useState({});
const [tableData, setTableData] = useState([])
const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
const [mapZoom, setMapZoom] = useState(3);
const [mapCountry, setMapCountry] = useState([])
const [casesType, setCasesType] = useState('cases')

useEffect(async() => {
  await fetch('https://disease.sh/v3/covid-19/all').then(res => res.json()).then(data => setCountryData(data))
}, [])

//https://disease.sh/v3/covid-19/countries
// useEffect run execute the code inside just one time or according the condition inserted
useEffect(() =>{
  const getCountriesData = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
    .then( response =>response.json())
    .then( data => {

      const countries = data.map(country =>({
          name: country.country,
          value: country.countryInfo.iso2
      }));
      const sortedData = sortData(data)
      setTableData(sortedData)
      setCountries(countries)
      setMapCountry(data)
    })
  }
  getCountriesData();
  
}, [countries])

const onChangeCountry = async (e) => {
          const countryCode = e.target.value;
          const url = countries === 'worldwide' 
          ?  'https://disease.sh/v3/covid-19/all' 
          : `https://disease.sh/v3/covid-19/countries/${countryCode }`;

          await fetch(url).then(res => res.json())
          .then(data => {
            setCountry(countryCode)
            setCountryData(data)     
            setMapCenter([data.countryInfo.lat, data.countryInfo.long])
            setMapZoom(4)
           }); 
}


  return (
    <div className="app">
        <div className="app__left">
            <div className="app__header">
              <h1>Covid-19 Tracker</h1>
              <FormControl className="app__dropdown">
                  <Select 
                    variant="outlined"
                    onChange={onChangeCountry}
                    value={country}
                  >
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                      {countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
                  </Select>
              </FormControl>
            </div>
        
            <div className="app__stats">
              <InfoBox 
              isBlue
              active={casesType === "cases"}
              onClick={e => setCasesType('cases')}
              title="Coronavirus Cases" cases={prettyPrintStat(countryData.todayCases)} total={prettyPrintStat(countryData.cases)}/>
              <InfoBox
              isGreen 
              active={casesType === "recovered"}
              onClick={e => setCasesType('recovered')}
              title="Recovered" cases={prettyPrintStat(countryData.todayRecovered)} total={prettyPrintStat(countryData.recovered)}/>
              <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={e => setCasesType('deaths')}
              title="Death" cases={prettyPrintStat(countryData.todayDeaths)} total={prettyPrintStat(countryData.deaths)}/>
            </div>

            <Map 
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
              countries={mapCountry}
            />
        </div>

        <Card className="app__right">
          <CardContent >
            <h3>Live cases by country</h3>
            < Table countries = {tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
    </div>
  );
}

export default App;
