import { defineStore } from 'pinia'
import {
    ethers,
    utils as utilsEthers,
} from 'ethers'
import { contractABIAuction, contractAddressAuction } from '../utils/constant.js'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import _array from 'lodash/array'

const { ethereum } = window;

export const useContracts = defineStore('smartContractStore', () => {
    const currentAccount = ref(null)
    const balance = ref('')
    const showGuidance = ref(false)
    const listSessions = ref([])
    const currentBid = ref('')

    const getEthereumContract = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const auctionContract = new ethers.Contract(contractAddressAuction, contractABIAuction, signer)

        // console.log('auctionContract', auctionContract)
        return {
            auctionContract, provider, signer
        }
    }

    const isWalletConnected = async () => {
        try {
            if (!ethereum) return message.error('Metamask is not ready')
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                currentAccount.value = accounts[0]
            } else {
                throw new Error('No account found!')
            }
        } catch (error) {
            message.error(`You haven't connected to your wallet`)
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount.value = accounts[0]
            message.success('Your wallet is connected')
        } catch (error) {
            console.log(error);
            showGuidance.value = true
        }
    }

    const getBalance = async () => {
        try {
            const { provider } = await getEthereumContract()
            const _balance = await provider.getBalance(currentAccount.value)
            const formattedBalance = utilsEthers.formatUnits(_balance, 18) // balance = _balance * 10^8
            balance.value = formattedBalance
        } catch (error) {
            console.log(error)
        }
    }

    const getAllSessions = async () => {
        try {
            const { auctionContract } = await getEthereumContract()
            const _result = await auctionContract.allSession()
            const result = _result.map((item, index) => {
                return {
                    index: index,
                    address: item[0],
                    startTime: item[1].toString(),
                    startingPrice: item[2].toString(),
                    isCanceled: item[3],
                }
            })
            listSessions.value = result
        } catch (error) {
            console.log(error)
        }
    }

    const createSession = async (startTime, basePrice) => {
        try {
            const { auctionContract } = await getEthereumContract()
            const response = await auctionContract.createSession(startTime, basePrice)
            // console.log('response', response)
            message.success('Session is created!')
            return true
        } catch (error) {
            message.error('There is an error occurred, please try again')
            console.log(error)
            return false
        }
    }

    const getHighestBid = async (param) => {
        try {
            const { auctionContract } = await getEthereumContract()
            const response = await auctionContract.getHighestBid(param)
            return response
        } catch (error) {
            return error
        }
    }

    const placeBid = async (id, bidPrice) => {
        try {
            const { auctionContract } = await getEthereumContract()
            const response = await auctionContract.bid(id, bidPrice)
            // console.log('response', response)
        } catch (error) {
            console.log(error)
        }
    }

    isWalletConnected()

    return {
        showGuidance,
        currentAccount,
        balance,
        listSessions,
        // listSessionPaginated,
        // pagination,
        getEthereumContract,
        getAllSessions,
        connectWallet,
        getBalance,
        createSession,
        // doBid,
        placeBid,
        getHighestBid
    }
})