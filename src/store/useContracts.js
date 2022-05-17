import { defineStore } from 'pinia'
import {
    ethers,
    utils as utilsEthers,
} from 'ethers'
import { contractABIAuction, contractAddressAuction } from '../utils/constant.js'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const { ethereum } = window;
const width = 500;
const height = 500;

export const useContracts = defineStore('smartContractStore', () => {
    const currentAccount = ref(null)
    const setCurrentAccount = newVal => { currentAccount.value = newVal }

    const balance = ref('')
    const setBalance = newVal => { balance.value = newVal }

    const listSession = ref([])
    const setListSession = newVal => { listSession.value = newVal }

    const getEthereumContract = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const auctionContract = new ethers.Contract(contractAddressAuction, contractABIAuction, signer)
        return {
            auctionContract, provider, signer
        }
    }

    const isWalletConnected = async () => {
        try {
            if (!ethereum) return message.error('Metamask is not ready')
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                console.log('No account found!')
            }
            console.log('List accounts', accounts)
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask!");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            message.success('Your wallet is connected')
        } catch (error) {
            console.log(error);
        }
    }

    const getBalance = async () => {
        try {
            const { provider } = await getEthereumContract()
            const _balance = await provider.getBalance(currentAccount.value)
            const formattedBalance = utilsEthers.formatUnits(_balance, 18) // balance = _balance * 10^8
            setBalance(formattedBalance)
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
                    id: index,
                    address: item[0],
                    startingTime: item[1].toString(),
                    startingPrice: item[2].toString(),
                    isCanceled: item[3],
                    imgSrc: `https://picsum.photos/id/${index}/${width}/${height}.jpg`
                }
            })
            setListSession(result)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    const createSession = async (startTime, basePrice) => {
        try {
            const { auctionContract } = await getEthereumContract()
            await auctionContract.createSession(startTime, basePrice)
            message.success('Session is created!')
        } catch (error) {
            message.error('There is an error occurred, please try again')
            console.log(error)
        }
    }

    isWalletConnected()

    return {
        currentAccount,
        balance,
        listSession,
        getEthereumContract,
        connectWallet,
        getBalance,
        getAllSessions,
        createSession
    }
})