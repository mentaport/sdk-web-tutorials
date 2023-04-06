import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Paper, Stack, Checkbox, TextField, Button, Typography} from '@mui/material';
import { useMentaportSDK } from '@lib/mentaport/provider';

export default function StartGeoForm() {
  const {mentaportSDK } = useMentaportSDK();
  const [state, setState] = React.useState({
    mobile: true,
    walkTime: 45,
    startGeo:false
  });

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === "mobile") {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    }
    else {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    }
  };

  function StartGeoLocationSDK() {
    mentaportSDK.SetClientSide();

    mentaportSDK.StartGeoLocation(mobile, state.walkTime);
   console.log(mentaportSDK)
   setState({
    ...state,
    "startGeo":true
   })
  }

  const { mobile } = state;

  return (
    <Paper elevation={2} sx={{ p:2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h4'>StartGeoLocation</Typography>
      <Typography  sx={{my:2}}>
      This function starts our geo-verifier. 
      You can select mobile requirements and how long to track the user walking before allowing any trigger to execute. The longer the time, the more precise our location verification algorithm is.  
      (Walking info is only allowed on mobile)
      </Typography>
      <FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">
        <Stack spacing={2}>
        
            <FormControlLabel
              control={
                <Checkbox checked={mobile} onChange={handleChange} name="mobile" />
              }
              label="Mobile Required"
            />
            {mobile ? 
              <TextField 
                id="wtime"
                label="Min Walk Time" 
                variant="outlined"
                name="wtime"
                defaultValue={state.walkTime}
                onChange={handleChange}/>
              :<></>
            }
        </Stack>
      
      </FormControl>
      <Button 
         size="large"
         type="submit"
         variant="contained"
         color="primary"
         onClick={StartGeoLocationSDK}>
          Submit
       </Button>
        { state.startGeo?  
          <Typography>Geo verification started</Typography> 
          :(<></>)
        }
    </Paper>
  );
}