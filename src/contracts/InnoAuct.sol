// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;
pragma experimental ABIEncoderV2;

contract InnoAuct {
    //variable
    uint sessionCount = 0;
    mapping(uint => Session) sessions;
    mapping(uint => BidderFund[]) sessionBidder;
    mapping(uint => BidderFund) sessionHighestBidder;

    struct Session {
        address owner;
        uint startTime;
        uint basePrice;
        bool canceled;
    }

    struct BidderFund {
        address payable bidder;
        uint256 fund;
    }

    //events
    event logBid(uint sessionId, address bidder, uint bidValue);

    //create an auction session
    function createSession(uint startTime, uint basePrice) public {
        sessions[sessionCount] = Session(msg.sender, startTime, basePrice, false);
        sessionCount++;
    }
 
    //get all auction session
    function allSession() public view returns (Session[] memory) {
        Session[] memory allSessions = new Session[](sessionCount);
        for (uint i = 0; i < sessionCount; ++i) {
            allSessions[i] = sessions[i];
        }
        return allSessions;
    }

    //get all session bidder by id
    function sessionBidderById(uint id) public view returns (BidderFund[] memory) {
        return sessionBidder[id];
    }

    //place a bidding value onto the table
    function bid(uint id, uint bidValue) 
        public
        payable
        onlyNotOwner(id)
        onlyAfterStart(id)
        onlyBeforeEnd(id)
        onlyNotCanceled(id)
        returns (bool success) {
            require(bidValue >= sessions[id].basePrice, "SMALLER_THAN_BASE_PRICE");
            require(bidValue > sessionHighestBidder[id].fund, "SMALLER_THAN_HIGHEST_PRICE");

            sessionHighestBidder[id] = BidderFund(payable(msg.sender), bidValue);
            if (sessionBidder[id].length == 0) {
                sessionBidder[id].push(BidderFund(payable(msg.sender), bidValue));
            } else {
                for (uint i = 0; i < sessionBidder[id].length; ++i) {
                    bool existed = false;
                    if (sessionBidder[id][i].bidder == msg.sender) {
                        sessionBidder[id][i].fund = bidValue;
                        existed = true;
                        break;
                    }
                    if (!existed) {
                        sessionBidder[id].push(BidderFund(payable(msg.sender), bidValue));
                    }
                }
            }

            emit logBid(id, msg.sender, bidValue);
            return true;
    }

    
    //get highest bidder
    function getHighestBid(uint id)
        public 
        view
        returns (BidderFund memory)
    {
        
        if (sessionBidder[id].length == 0) {
            revert("NO_ONE_JOIN_THIS_SESSION");
        } else {
            return sessionHighestBidder[id];
        }
    }

    //end the session
    function endSession(uint id) 
    public
    onlyEndedAndNotCanceled(id)
    {
        if (sessionBidder[id].length == 0) {
            revert("NO_ONE_JOIN_THIS_SESSION");
        } else {
            sessionHighestBidder[id].bidder.transfer(sessionHighestBidder[id].fund);
        }
    }

    //cancel auction session
    function cancelAuction(uint id)
        public
        onlyOwner(id)
        onlyBeforeEnd(id)
        onlyNotCanceled(id)
        returns (bool success)
    {
        sessions[id].canceled = true;
        return true;
    }

    //withdraw the funds
    function withdraw(uint id)
        public
        onlyEndedOrCanceled(id)
        returns (bool success)
    {
        address withdrawalAccount;
        uint withdrawalAmount = 0;

        if (msg.sender != sessionHighestBidder[id].bidder) {
            withdrawalAccount = msg.sender;
            withdrawalAmount = sessionHighestBidder[id].fund;
        }

        // send the funds
        if (!payable(msg.sender).send(withdrawalAmount)) {
            return false;
        }

        for (uint i = 1; i <= sessionBidder[id].length; i++) {
            if (sessionBidder[id][i].bidder == msg.sender) {
                sessionBidder[id][i].fund = 0;
                break;
            }
        }

        return true;
    }

    modifier onlyOwner(uint sessionId) {
        require(msg.sender == sessions[sessionId].owner, "MUST_BE_OWNER");
        _;
    }

    modifier onlyNotOwner(uint sessionId) {
        require(msg.sender != sessions[sessionId].owner, "MUST_BE_NOT_OWNER");
        _;
    }

    modifier onlyAfterStart(uint sessionId) {
        require(block.timestamp > sessions[sessionId].startTime, "SESSION_HAS_NOT_STARTED");
        _;
    }

    modifier onlyBeforeEnd(uint sessionId) {
        require(block.timestamp < sessions[sessionId].startTime + (5*60), "SESSION_ENDED");
        _;
    }

    modifier onlyNotCanceled(uint sessionId) {
        require(!sessions[sessionId].canceled, "SESSION_WAS_CANCELED");
        _;
    }

    modifier onlyEndedAndNotCanceled(uint sessionId) {
        require((block.timestamp > sessions[sessionId].startTime + (5*60)) && !sessions[sessionId].canceled, "SESSION_HAS_NOT_ENDED_OR_HAS_BEEN_CANCELED");
        _;
    }

    modifier onlyEndedOrCanceled(uint sessionId) {
        require((block.timestamp > sessions[sessionId].startTime + (5*60)) || sessions[sessionId].canceled, "SESSION_IS_STILL_ALIVE");
        _;
    }
}