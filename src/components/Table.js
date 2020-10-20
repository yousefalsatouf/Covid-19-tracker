import React from 'react'
import numeral from 'numeral'
import '../css/Table.css'

const  Table  = ({ countries }) =>  {
     return (
          <div className="table">
               {countries.map(({country, cases}) => (
                    <tr>
                         <td><strong>{country}</strong></td>
                         <td><small>{numeral(cases).format("0,0")}</small></td>
                    </tr>
               ))} 
          </div>
     )
}

export default Table;