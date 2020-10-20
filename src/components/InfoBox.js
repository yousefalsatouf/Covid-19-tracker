import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core"
import '../css/InfoBox.css'

const InfoBox = ({ title,  cases,  active, total,  isRed,  isBlue, isGreen, ...props}) => 
{
  return (
    <Card 
    className={`infoBox ${active && "infoBox--selected"} ${ isRed && "infoBox--red" } isBlue ${isBlue && "infoBox--blue"}`}
    onClick={props.onClick}>
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">{ title  }</Typography>
        <h6 className={`infoBox__cases ${isGreen && "infoBox__cases--green"} ${isBlue && "infoBox__cases--blue"}`}>{ cases } </h6>
        <Typography className="infoBox__total" color="textSecondary">{ total } Total</Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
