import { defineStore } from 'pinia'
import {
    ethers,
    utils as utilsEthers,
} from 'ethers'
import { contractABIAuction, contractAddressAuction } from '../utils/constant.js'
import { message } from 'ant-design-vue'
import { ref, computed } from 'vue'
// import helper from '../utils/helper.js'
import _array from 'lodash/array'
// import { sessionDuration } from '../utils/constant'

const { ethereum } = window;
const width = 500;
const height = 500;

export const useContracts = defineStore('smartContractStore', () => {
    const currentAccount = ref(null)
    const balance = ref('')
    const listSession = ref([])
    const listSessionPaginated = computed(() => _array.chunk(listSession.value, pagination.value.pageSize))
    const pagination = ref({
        pageNumber: 1,
        pageSize: 6,
        totalPages: 0,
        totalRecords: 0
    })
    const showGuidance = ref(false)

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

    // const getAllSessions = async () => {
    //     try {
    //         const { auctionContract } = await getEthereumContract()
    //         const _result = await auctionContract.allSession()
    //         const result = _result.map((item, index) => {
    //             const _base = 6
    //             const _length = (index + 1).toString().length
    //             const _appendedNumber = helper.appendZero(_base - _length)
    //             /** 
    //             * @property {String} startingTime timestamp in second
    //             * @property {String} startingPrice
    //             */
    //             return {
    //                 id: index,
    //                 name: `Product ${_appendedNumber + (index + 1)}`,
    //                 content: 'Lorem ipsum',
    //                 address: item[0],
    //                 startingTime: item[1].toString(),
    //                 endTime: (Number(item[1].toString()) + sessionDuration).toString(),
    //                 startingPrice: item[2].toString(),
    //                 isCanceled: item[3],
    //                 imgSrc: `https://picsum.photos/id/${index * 10 + 1}/${width}/${height}.jpg`,
    //             }
    //         })
    //         listSession.value = result
    //         pagination.value.totalPages = Math.ceil(result.length / pagination.value.pageSize)
    //         pagination.value.totalRecords = result.length
    //         return result
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    /**
     * @param {Number} startTime 
     * @param {String} basePrice 
     */
    const createSession = async (startTime, basePrice) => {
        try {
            const { auctionContract } = await getEthereumContract()
            const response = await auctionContract.createSession(startTime, basePrice)
            console.log('response', response)
            message.success('Session is created!')
            return true
        } catch (error) {
            message.error('There is an error occurred, please try again')
            console.log(error)
            return false
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

    const getHighestBid = async (param) => {
        try {
            const { auctionContract } = await getEthereumContract()            
            const response = await auctionContract.getHighestBid(utilsEthers.formatBytes32String(param))
        } catch (error) {
            console.log(error)
        }
    }

    isWalletConnected()

    return {
        showGuidance,
        currentAccount,
        balance,
        // listSession,
        // listSessionPaginated,
        // pagination,
        getEthereumContract,
        connectWallet,
        getBalance,
        // getAllSessions,
        createSession,
        doBid,
        getHighestBid
    }
})