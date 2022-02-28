const TradeConverter = (transactions) => {
    const openTrans = transactions.filter(transaction => transaction.action.slice(-4) === "OPEN")
    const closeTrans = transactions.filter(transaction => transaction.action.slice(-5) === "CLOSE")

    let tradelist = []
    // Create trade with open data 
    for (let i = 0; i < openTrans.length; i++) {
        let trade = {
        openid: openTrans[i]._id,
        account: openTrans[i].account,
        commissions: openTrans[i].commissions,
        expiration: openTrans[i].expiration,
        startdate: openTrans[i].date,
        fees: openTrans[i].fees,
        multiplier: openTrans[i].multiplier,
        strike: openTrans[i].strikeprice,
        symbol: openTrans[i].underlyingsymbol,
        value: openTrans[i].value,
        callput: openTrans[i].callput
        }
        tradelist.push(trade)
    }

    // For trades created, look for closing transaction pair and add closing data
    for (let i = 0; i < tradelist.length; i++) {
        for (let j = 0; j < closeTrans.length; j++) {
        if (tradelist[i].symbol === closeTrans[j].underlyingsymbol
            && tradelist[i].strike === closeTrans[j].strikeprice
            && tradelist[i].expiration === closeTrans[j].expiration
            && tradelist[i].callput === closeTrans[j].callput) {
            tradelist[i].closeid = closeTrans[j]._id
            tradelist[i].enddate = closeTrans[j].date
            tradelist[i].commissions += closeTrans[j].commissions
            tradelist[i].fees += closeTrans[j].fees
            tradelist[i].value += closeTrans[j].value
        }
        }
    }
    
    return tradelist
};

export default TradeConverter;
