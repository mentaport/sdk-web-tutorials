import * as React from 'react';

import {Stack, TextField, Button, Typography, Paper} from '@mui/material';

export default function StartGeoForm() {
  const [state, setState] = React.useState({
    lat: -120,
    long: 45,
  });

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Paper elevation={2}  sx={{ p:2, display: 'flex', flexDirection: 'column' }}>
      
     <Stack spacing={2}>
        <Typography variant='h4'> Get Distance to Point</Typography>
        <Typography  sx={{my:2}}>
        A local function to help you find the distance between a location and your user.
        </Typography>
        <TextField 
          id="lat"
          label="Latitude" 
          variant="outlined"
          name="lat"
          defaultValue={state.lat}
          onChange={handleChange}/>

        <TextField 
          id="long"
          label="Longitude" 
          variant="outlined"
          name="long"
          defaultValue={state.long}
          onChange={handleChange}/>
          
        <Button 
          size="large"
          type="submit"
          variant="contained"
          color="primary">
            Run
        </Button>
       </Stack> 
    </Paper>
  );
}