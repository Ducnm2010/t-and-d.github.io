import abi from './Transactions.json';
export const contractABI = abi.abi;
export const contractAddress = `0x77A201956543EefEE957DAB65b57c6272ebe47B7`;

import abiCustom from './Fcontracts.json';
export const contractABICustom = abiCustom.abi;
export const contractAddressCustom = `0x65d2cb8959FA62f044Be5183DD2f7F2697Cb667D`;

import abiAunction from './InnoAuct.json'
export const contractABIAuction = abiAunction.abi;
export const contractAddressAuction = `0xf790D010F9EBC4Aaf38448F96D7e8cD3EAd59588`;

export const sessionDuration = 30 * 60 // s
export const timeStep = 1000 // ms
export const timeFormat = 'HH:mm'
export const dateFormat = 'DD-MM-YYYY'