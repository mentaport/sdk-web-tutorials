import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Button, Container, Grid, Paper, Box } from '@mui/material';

import Header from './header';
import StartGeoForm from '@components/ui/forms/StartGeoForm';
import DistanceForm from '@components/ui/forms/DistanceForm';
import TriggerForm from '@components/ui/forms/TriggerForm';
import GetTriggerForm from '@components/ui/forms/GetTriggerForm';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMentaportSDK } from '@lib/mentaport/provider';

interface TabPanel {
  children: React.ReactNode,
  index: number,
  value: Number,
};

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


const mintDescription = "Function to mint an NFT. If the rule engine returns successful, it will produce a unique hash signature to allow the user to mint on the client connecting its wallet. "
const mintListDescription = "Function to add a user's wallet into a mint list. If the rule engine returns successful, it will have added the user's wallet to the mint list. The mint list can be retied with the supplement SDK or in our admin portal."

const getTriggerDescription = "Function to get all triggers from a contract by trigger type and id. You can also specify a rule id to get those triggers. "
const closestTriggerDescription = "Function that returns a list of the closest triggers to the user's position in a given radius, contract id, and trigger type."

export default function Main() {
  const {mentaportSDK} = useMentaportSDK();

  const [sdkInit, setSDKInit]     = React.useState(false);
  const [statusGeo, setStatusGeo] = React.useState("");
  const [locationInfo, setLocationInfo] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [value, setValue]  = React.useState(0);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue:number) => {
    console.log(newValue)
    setValue(newValue);
  };
  
  function InitSDK() {
    setSDKInit(true)
  }
  function GetStatus() {
    const result = mentaportSDK.GetStatus();
    setStatusGeo(JSON.stringify(result))
  }
  async function GetLocationInfo() {
    setLoading(true);
    try{
      const result = await mentaportSDK.getLocationInfo();
      setLocationInfo(JSON.stringify(result))
    } catch(error){
      setLocationInfo(JSON.stringify(error))
    }
   
    setLoading(false);
  }

  return (
    <Container maxWidth="lg" sx={{minHeight:'95vh',}}>
    <Header />
      {!sdkInit ?
        <Paper elevation={2} sx={{ p:2, display: 'flex', flexDirection: 'column' }}>
          <Typography  sx={{my:2}}>
          {"Let first begin by initializing the SDK."}
          <br />
          {"In this function, you will provide your API key and if you are running in a server-side rendering app."} 
          </Typography>
          <Button variant="contained" onClick={InitSDK}> Initialize SDK</Button>
        </Paper>
      
      : (
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
                <Paper elevation={2} sx={{ p:2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h4'>Information</Typography>
                  <Typography sx={{my:2}}>
                 {`The status gives you an idea of how our geo-verifier is doing.
                  It was three main stages: "Non-Initialized, Initializing, Collecting, Success, Failed, and Error."
                  `}
                  <br />
                  <i>{`For a more detailed description, visit the SDK documentation.`} </i>
                  <br /><br />
                  {`You can only execute triggers on `}<b>{`"Success"`}</b>

                  </Typography>
                  <Button variant="contained" onClick={GetStatus}> Get Status</Button>
                  <Container>
                    <p>{statusGeo}</p>
                  </Container>
                  <Typography>
                    {`Function to get general location information of user once status is "Success"`}
                  </Typography>
                  <LoadingButton
                    size="large"
                    color="secondary"
                    onClick={GetLocationInfo}
                    loading={loading}
                    variant="contained"
                  >
                    <span> Get Location Info</span>
                  </LoadingButton>
                  {/* <Button variant="contained" onClick={GetLocationInfo}> Get Location Info</Button> */}
                  <p>{locationInfo}</p>
                </Paper>
              </Grid>
            </>
          </TabPanel>

         {/* TRIGGER FUNCTIONS TAB PANEL */}
          <TabPanel value={value} index={1}>
            <Paper elevation={2} sx={{ p:2, display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{my:2}}>
                {`When it comes to triggers, you can run a "check" before actually trying to trigger. This allows you to have a more responsive UI/UX for your users when designing your application.
                `}
                <br /><br />
                  {`When executing a trigger, you must provide the contract id. You can also specify a rule id for a faster outcome or let the rule engine determine if any rule can be executed successfully.`
                }
              </Typography>
              <TriggerForm title="Mint List" description={mintListDescription} />
              <TriggerForm title="Mint" description={mintDescription}/>
            </Paper>
          </TabPanel>
          
          {/* HELPER FUNCTIONS TAB PANEL */}
          <TabPanel value={value} index={2}>
            <>
              <Grid item xs={8} sx={{my:2}}>
                <GetTriggerForm title="Get Triggers" description={getTriggerDescription } secondEntry="Rule Id" triggerTypeSelect={false}/>
              </Grid>
              <Grid item xs={8} >
                <GetTriggerForm title="Closest Triggers" description={closestTriggerDescription} secondEntry="Radius" triggerTypeSelect={true}/>
              </Grid>
              <Grid item xs={8} sx={{my:2}}>
                <DistanceForm />
              </Grid>
            </>
          </TabPanel>
      </Box>
      
      )}
  </Container>
  );
}