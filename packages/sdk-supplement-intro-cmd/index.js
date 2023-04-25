import pkg from '@mentaport/supplement';
const { MentaportSupplementSDK, MentaportUtils } = pkg;

import {
  ContractType, 
  ContractStatus,
  BlockchainTypes,
  RuleSchemas,
  RuleTypes,
  AccessTypes,
  TimeTypes,
  LocationTypes,
  Environment
} from "@mentaport/supplement-types";

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
supClient.SetClientSide(Environment.DEVELOPMENT);

/**
 * --------------------------------------------------------------
 * Functions to create and manage contracts
 * 
 */
async function createNewContract(name, type, chain) {
  const newContract = await supClient.contractSDK.createNewContract(name, type, chain);
  console.log(newContract);
  return newContract;
}

async function getMyContracts() {
  const myContracts = await supClient.contractSDK.getContracts();
  console.log(myContracts);
}

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
    type:RuleTypes.Mintlist,
    access:{
      type:AccessTypes.Public
    },
    time: {
      type:TimeTypes.None
    },
    location:{
      type: LocationTypes.Radius,
      name,
      description,
      mainCoordinate:{
        latitude,
        longitude,
        radius
      },
      polygonList:[]
    },
    amount
  }
  return rule;
}

async function setRules(contractId) {
  // name, description, latitude, longitude, radius (m), amount
  const miles = MentaportUtils.convertMilesToMeters(7);
  //const rule1 = createRules(contractId,"Rule San Francisco","My rule in all San Francisco, CA", 37.7749, -122.4194 , miles, 100);
 // const rule2 = createRules(contractId,"Rule Venice","My rule in Venice beach CA", 33.9850, -118.4695, 80, 100);
  const rule3 = createRules(contractId,"Rule Santa Monica","My rule in Santa Monica CA",34.0195, -118.4912, miles, 100);

  //const result = await supClient.rulesSDK.createNewRules([rule1, rule2])
   const result = await supClient.rulesSDK.createNewRules([rule3])
  console.log(result)
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
    const newcontract = await createNewContract("My first contract", ContractType.Mintlist, BlockchainTypes.Polygon );
    const contractId = newcontract.data.contractId;

    // 2. SET RULES FOR CONTRACT
    await setRules(contractId);
    // 2.1 Get rules
    //await getRules(contractId)

    // 3. ACTIVATE CONTRACT
    await activate(contractId)
  } catch(error) {
    console.log(error)
  }
}

async function TutorialUpdate(contractId) {
  try {
   
    // 1. Get rules
    // await getRules(contractId)
    // 2. ADD RULES TO CONTRACT
    //await setRules(contractId);
    
    // 3. ACTIVATE CONTRACT
    // await activate(contractId)
    // 4. PAUSE AN ACTIVE CONTRACT
    //const result = await supClient.contractSDK.updateContractStatusById(contractId, ContractStatus.Pending);
    //console.log(result);
  } catch(error) {
    console.log(error)
  }
}

async function TutorialGetMintlist(contractId){
  const list = await supClient.contractSDK.getMintlistById(contractId);
  console.log(list)
}

//TutorialInit()

//TutorialUpdate('contract-id')

//TutorialGetMintlist('contract-id')