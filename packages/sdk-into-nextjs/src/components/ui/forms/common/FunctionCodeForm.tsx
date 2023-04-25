import * as React from 'react';
import {Typography, 
  Grid,
  Stack,
  TextField,
  MenuItem,
  Button} from '@mui/material';


import LoadingButton from '@mui/lab/LoadingButton';

interface IFromCode {
  title:string,
  value?:any
  varType:string,
  description1:string,
  description2?:string,
  caption?:string,
  callBack:any,
  loadingButton?:boolean
  loading?:boolean
}

export default function FunctionCodeForm(props:IFromCode) {

  const menuItems = [{id:"0", label: "true", value: true},{id:"1", label: "false", value: false}]
  const [checkmark, setBoolean] = React.useState(true);
  
  function Title() {
    if(props.varType ==='button') {
      return(
        <Typography variant="subtitle1">
          {props.title.toUpperCase()}
        </Typography> 
      );
    } 
    return(
      <Typography variant="subtitle1">
        {props.title} <Typography variant="caption" display='inline'> {props.varType}</Typography>
      </Typography> 
    );
  }
  function Buttons(){
    if(props.loadingButton) {
      return  (
      <LoadingButton
        size="large"
        color="secondary"
        onClick={ props.callBack}
        loading={props.loading}
        // loadingPosition="start"
        variant="contained"
      >
        <span>Run</span>
      </LoadingButton>
      );
    } 
    return (
      <Button 
      size="large"
      type="submit"
      variant="contained"
      color= 'primary'
      onClick={props.callBack}>
        Run
    </Button>
    );
  }

  const handleBooleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    setBoolean(Boolean(e.target.value))
    props.callBack(e);
  }
 
  return (

    <Grid container spacing={0} sx={{p:2}}>
      <Grid item xs={8}>
        <Stack >
          <Title />
          <Typography variant="body2"> {props.description1}</Typography>
          <Typography variant="body2"> {props.description2}</Typography>
          <Typography variant="caption"> {props.caption}</Typography>
        </Stack>
      
      </Grid>
      <Grid item xs={4} align='right'>
        { props.varType === 'button' ?
        <Buttons />
        :
        <>
        { props.varType != 'boolean'? 
        <TextField id="filled-basic" 
          sx={{width:'100%'}} 
          defaultValue={props.value}
          type={props.varType} 
          name={props.title} 
          label={props.varType} 
          variant="filled" 
          onChange={props.callBack}
          />
        :
        (
        <TextField
          select
          value={checkmark}
          name={props.title} 
          onChange={handleBooleanChange} sx={{width:'50%'}}>
          {menuItems.map((item) => (
          <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
          ))}
        </TextField>)
      }
        
        </>
     }
      </Grid>
      
  </Grid>

  );
}