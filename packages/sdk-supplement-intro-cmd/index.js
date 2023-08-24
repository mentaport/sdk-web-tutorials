import pkg from '@mentaport/supplement';

const  {MentaportSupplementSDK, MentaportUtils} = pkg;
import {
  Environment,
  RuleSchemas,
  RuleTypes,
  AccessTypes,
  TimeTypes,
  LocationTypes,
  ContractEnvironment, 
  BlockchainTypes,
} from "@mentaport/types-supplement";

import * as dotenv from 'dotenv'
dotenv.config()

/**
 * 
 * Function to initialize the supplement SDK
 * For this tutorial, the API key provided only works in 'staging',
 * this way you always have a stable, off mainnet contract to play with
 * 
 */

const supClient = new MentaportSupplementSDK(process.env.MENTAPORT_API_KEY);
supClient.setClientEnv(Environment.STAGING);

/**
 * Function to create and manage contract
 * 
 *  @param  {string} name of contract
 *  @param  {ContractEnvironment} Contract env (Testnet, Mainnet, Mezzanine)
 *  @param  {BlockchainTypes} blockchain (Ethereum, Polygon, Sui)
 */
async function createNewContract() {
  const name = "My first Mezzanine Contract";
  const environment = ContractEnvironment.Mezzanine;
  const chain = BlockchainTypes.None;
  const newContract = await supClient.contractSDK.createNewContract(name, environment, chain);
  console.log(newContract);
  return newContract;
}

async function getMyContracts() {
  const myContracts = await supClient.contractSDK.getContracts();
  console.log(myContracts);
}

/**
 * Activating a contract deployed by Mentaport. 
 *
 * @param  {string} contract id
 */
async function activate(contractId) {
  const result = await supClient.contractSDK.activateContract(contractId);
  console.log(result)
}
/**
 * --------------------------------------------------------------
 * Functions to create and manage rules for contract
 * - where
 * - when
 * - who
 */
function createRules(contractId, name, description, latitude, longitude, radius, amount) {
  const rule = {
    schema:RuleSchemas.Contract,
    id:contractId,
    name,
    description,
    type:RuleTypes.Mezzanine,
    access:{
      type:AccessTypes.Public
    },
    time: {
      type:TimeTypes.None
    },
    location:{
      type: LocationTypes.Radius,
      mainCoordinate:{
        latitude,
        longitude,
        radius
      },
     
    },
    amount
  }
  return rule;
}

async function setRules(contractId) {
  try {
    // name, description, latitude, longitude, radius (m), amount
    const miles = MentaportUtils.convertMilesToMeters(7);
    const rule1 = createRules(contractId,"Rule San Francisco","My rule in all San Francisco, CA", 37.7749, -122.4194 , miles, 100);
    const rule2 = createRules(contractId,"Rule Venice","My rule in Venice beach CA", 33.9850, -118.4695, 80, 100);
  // const rule3 = createRules(contractId,"Rule Santa Monica","My rule in Santa Monica CA",34.0195, -118.4912, miles, 100);

    const result = await supClient.rulesSDK.createNewRules([rule1, rule2])
    // const result = await supClient.rulesSDK.createNewRules([rule3])
    console.log(result)
  } catch(error){
    console.log(error)
  }
}

async function getRules(contractId) {
  // name, description, latitude, longitude, radius, amount
  const allRules = await supClient.rulesSDK.getAllRules(contractId);
  for(var i=0; i < allRules.data.length; i++) {
    const rule = allRules.data[i]
    console.log(rule)
  }
}

async function TutorialInit() {
  try {
    // 1. CREATE A CONTRACT
   
    const newcontract = await createNewContract();
    if(newcontract.status) {
      const contractId = newcontract.data.contractId;
      // await supClient.contractSDK.activateContract(contractId,'0x9941eD017d6F5c3f443E0C7DdB311516ecD1E73A');
      console.log(contractId)
      // 2. SET RULES FOR CONTRACT
      await setRules(contractId);
      // 2.1 Get rules
      //await getRules(contractId)

      // 3. ACTIVATE CONTRACT
      //await activate(contractId)
    }
  } catch(error) {
    console.log(error)
  }
}

async function TutorialUpdate(contractId) {
  try {
   
    // 1. Get rules
     await getRules(contractId)
    // 2. ADD RULES TO CONTRACT
    //await setRules(contractId);
    
    // 3. ACTIVATE CONTRACT
    // await activate(contractId)
    // 4. PAUSE AN ACTIVE CONTRACT
    //const result = await supClient.contractSDK.updateContractStatusById(contractId, ContractStatus.Paused);
    //console.log(result);
  } catch(error) {
    console.log(error)
  }
}

async function TutorialGetMezzanine(contractId){
  const list = await supClient.contractSDK.getMezzanineById(contractId);
  console.log(list)
}



//TutorialInit()

//TutorialUpdate('contract-id')

//TutorialGetMintlist('contract-id')
