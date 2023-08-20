import pkg from '@mentaport/supplement';
const { MentaportSupplementSDK } = pkg;

import {
  ContractEnvironment,
  BlockchainTypes,
  RuleSchemas,
  RuleTypes,
  AccessTypes,
  TimeTypes,
  LocationTypes,
  Environment
} from "@mentaport/types-supplement";

import {GenerateTimesTamp} from './src/helpers'

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
supClient.SetClientSide(Environment.STABLE);

/**
 * Function to create and manage contract
 * 
 *  @param  {string} name of contract
 *  @param  {ContractType} contract type (Blockchain, Mintlist)
 *  @param  {BlockchainTypes} blockchain (Ethereum, Polygon, Sui)
 */
async function createNewContract(name, type, chain) {
  const newContract = await supClient.contractSDK.createNewContract(name, type, chain);
  console.log(newContract);
  return newContract;
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
 * Functions to create and a mint rules for contract
 * - where
 * - when
 * - who
 */
function createMintRules(contractId, name, description, latitude, longitude, radius, amount, startTime, endTime) {
  const rule = {
    schema:RuleSchemas.Contract,
    id:contractId,
    type:RuleTypes.Mint,
    access:{
      type:AccessTypes.Public
    },
    time: {
      type:TimeTypes.TimeWindow,
      startTime,
      endTime,
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

/**
 * Functions to create a dynamic rules for contract
 * - where
 * - when
 * - who
 */
function createDynamicRules(contractId, name, description, latitude, longitude, radius, amount, startTime, endTime) {
  const rule = {
    schema:RuleSchemas.Contract,
    id:contractId,
    type:RuleTypes.Dynamic,
    access:{
      type:AccessTypes.Public
    },
    time: {
      type:TimeTypes.TimeWindow,
      startTime,
      endTime,
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

/**
 * Function to set rules from spreadsheet
 */
async function setRules(contractId) {

  // adding a 20 meter radius for all the rules
  const geo_fence_radius = 20;
  // amount of NFT allowed in rule
  const amount_nft = 100;

  // generating timestamps of when we can start and end the hunt.
  const startTime = GenerateTimesTamp(0,1); // start one day from now
  const endTime = GenerateTimesTamp(0,2); // end two days from now

  const rule1 = createMintRules(contractId,
    "Start",
    "Meetup in Dolores Park.",
    37.7598, -122.4271,
    geo_fence_radius, amount_nft, 
    startTime, endTime);

  const rule2 = createDynamicRules(contractId,
    "Clue #1",
    "Needs two rackets and a yellow ball",
    37.759773, -122.427063, 
    geo_fence_radius, amount_nft,
    startTime, endTime);
    
  const rule3 = createDynamicRules(contractId,
    "Clue #2",
    "After playing for hours, what desert is the most famous in the Mission?",
    37.7583,-122.4215,
    geo_fence_radius, amount_nft,
    startTime, endTime);

  const result = await supClient.rulesSDK.createNewRules([rule1, rule2, rule3])
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

    // 1. CREATE A CONTRACT:
    // We are going to be minting on the spot, so make the contract env 'Testnet'!
    const newcontract = await createNewContract("My Scavenger Hunt", ContractEnvironment.Testnet, BlockchainTypes.Ethereum);
    const contractId = newcontract.data.contractId;

    // 2. SET RULES FOR CONTRACT
    // Setting rules from spreadsheet
    await setRules(contractId);

    // 3. ACTIVATE CONTRACT
    await activate(contractId)
  } catch(error) {
    console.log(error)
  }
}

//TutorialInit()
