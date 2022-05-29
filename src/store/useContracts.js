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
    const balance = ref('')
    const listSession = ref([])
    const showGuidance = ref(false)

    const getEthereumContract = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log('provider', provider)
        console.log('ethereum', ethereum)
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
                currentAccount.value = accounts[0]
            } else {
                throw new Error('No account found!')
            }
            console.log('List accounts', accounts)
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
                    id: index,
                    address: item[0],
                    startingTime: item[1].toString(),
                    startingPrice: item[2].toString(),
                    isCanceled: item[3],
                    imgSrc: `https://picsum.photos/id/${index}/${width}/${height}.jpg`
                }
            })
            listSession.value = result
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

    const doBid = async () => {
        try {
            const { auctionContract } = await getEthereumContract()
            console.log('auctionContract', auctionContract)
        } catch (error) {
            message.error('Bidding fail, please try again.')
            console.log(error)
        }
    }



    isWalletConnected()

    return {
        showGuidance,
        currentAccount,
        balance,
        listSession,
        getEthereumContract,
        connectWallet,
        getBalance,
        getAllSessions,
        createSession,
        doBid
    }
})