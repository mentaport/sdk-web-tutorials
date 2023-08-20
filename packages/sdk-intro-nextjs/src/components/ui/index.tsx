import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Button, Container, Grid, Paper, Box ,Divider} from '@mui/material';

import Header from './header';
import StartGeoForm from '@components/forms/location/StartGeoForm';
import DistanceForm from '@components/forms/helpers/GetDistanceForm';
import MezzanineTriggerForm from '@components/forms/triggers/MezzanineTriggerForm';
import MintTriggerForm from '@components/forms/triggers/MintTriggerForm';
import GetTriggerForm from '@components/forms/helpers/GetTriggerForm';
import GetClosestTriggerForm from '@components/forms/helpers/GetClosestTriggerForm';

import GenralInfoForm from '@components/forms/location/GenralInfoForm';

import {
  getTriggerDescription,
  closestTriggerDescription,
  getRuleIdDesc1,
  getRadiusIdDesc1,
  getRuleIdTitle
} from '@components/constants';


interface TabPanel {
  children: React.ReactNode,
  index: number,
  value: number,
}

function TabPanel(props: TabPanel) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid  
         container
         direction="column"
         justifyContent="center"
         alignItems="left" 
       >
         {children}
        </Grid>
      )}
    </div>
  );
}

export default function Main() {

  const [sdkInit, setSDKInit]  = React.useState(false);
  const [value, setValue]  = React.useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Container maxWidth="lg" sx={{minHeight:'95vh',}}>
    <Header />
     
      <Box sx={{width:"100%"}} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Location"  />
            <Tab label="Triggers" />
            <Tab label="Helpers"  />
          </Tabs>
        </Box>
        
        {/* LOCATION FUNCTIONS TAB PANEL */}
        <TabPanel value={value} index={0}>
          <>
            <Grid item xs={12} sx={{my:2}}>
              <StartGeoForm />
            </Grid>
            <Grid item xs={12} >
              <GenralInfoForm />
            </Grid>
          </>
        </TabPanel>

        {/* TRIGGER FUNCTIONS TAB PANEL */}
        <TabPanel value={value} index={1}>
          <MintTriggerForm />
          <MezzanineTriggerForm />
          
        </TabPanel>
        
        {/* HELPER FUNCTIONS TAB PANEL */}
        <TabPanel value={value} index={2}>
          <>
            <Grid item xs={8} sx={{my:2}}>
              <GetTriggerForm 
                title="Get Triggers"
                description={getTriggerDescription } 
                secondEntry={getRuleIdTitle} 
                secondEntryDesc={getRuleIdDesc1}
                />
            </Grid>
            <Grid item xs={8} >
              <GetClosestTriggerForm 
                title="Closest Triggers" 
                description={closestTriggerDescription} 
                secondEntry="radius" 
                secondEntryDesc={getRadiusIdDesc1}
              />
            </Grid>
            <Grid item xs={8} sx={{my:2}}>
              <DistanceForm />
            </Grid>
          </>
        </TabPanel>
    </Box>
      
    
  </Container>
  );
}