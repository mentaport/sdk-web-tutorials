export const mintDescription = "Function to mint an NFT. If the rule engine returns successful, it will produce a unique hash signature to allow the user to mint on the client connecting its wallet. "
export const mezzanineDescription = "Function to add a user's wallet into a Mezzanine list. If the rule engine returns successful, it will have added the user's wallet to the Mezzanine. The Mezzanine can be retrieved with the supplement SDK or in our dashboard portal."

export const getTriggerDescription = "Function to get all triggers from a contract by trigger type and id. You can also specify a rule id to get those triggers. "
export const closestTriggerDescription = "Function that returns a list of the closest triggers to the user's position in a given radius, contract id, and trigger type."

// Geo Info
export const getMobileTitle = "Only Mobile"
export const getMobileDesc1 = "If developer only wants to allow mobile application to trigger."

export const getWalkTitle = "Walk Time"
export const getWalkDesc1 = `Min amount of time user has to walk for a "Succes" status.`
export const getWalkCaption= "Time in seconds"

// General Info
export const getStatusTitle = "Get Status"
export const getStatusDesc1 = `Get status of current location verification.`
export const getStatusDesc2 = `It has three main stages: "Non-Initialized, Initializing, Collecting, Success, Failed, and Error.`
export const getStatusCaption=`You can only execute triggers on "Success"`

export const getLocationTitle = "Get Location Info"
export const getLocationDesc1 = `Function to get general location information of user once status is "Success"`

// Blockchain
export const getBlochainTitle = "Blockchain"
export const getBlochainDesc1 = "Select in what blockchain to mint in in our tesnet contracts (polygon / sui)"

// Triggets
export const getCheckTitle = "Mint vs Check Trigger"
export const getCheckTitleMez = "Mezzanine vs Check Trigger"

export const getCheckDesc = "To check if the contract can run this trigger successfully before executing command on-chain."
export const getMintDesc = "To trigger a blockchain mint of a contract provided, if all rules pass, the user will successfully mint an NFT."
export const getMintDesc1 = "For this tutorial, we have  deployed a contract in testnets (sui & polygon) to showcase how we call mint functions."

export const getOptionalCaption= "Optional"

export const getContractIdTitle ="contractId"
export const getContractIdDesc1 = "Contract id of trigger trying to run"

export const getRuleIdTitle ="ruleId"
export const getRuleIdDesc1 = "Rule id of trigger trying to run"

export const getWalletTitle ="wallet"
export const getWallerDesc1 = "Wallet address of user"

export const getNameTitle ="name"
export const getEmailTitle ="email"

export const getTriggerTypeTitle ="Trigger Type"
export const getTriggerTypeDesc1 ="Pick a type of trigger to query"

export const getRadiusIdDesc1 = "Radius of query. Default in meters"
export const getDisUnitTitle = "Measurment Unit"
export const getDisUnitDes1 = "Select unit type for distance query"
//---
export const getTriggersTitle="Get Trigers"
export const getTriggersDesc1 = "Function to get all triggers from a contract by trigger type and id."
export const getTriggersDesc2= "You can also specify a rule id to get those triggers."

export const getClosestTriggerTitle = "Closest Triggers"
export const getClosestTriggerDec1 = "Function that returns a list of the closest triggers to the user's position in a given radius, contract id, and trigger type."


export const getDistanceTitle = "Get Distance to Point"
export const getDistanceDec1 = "A local function to help you find the distance between a location and your user."