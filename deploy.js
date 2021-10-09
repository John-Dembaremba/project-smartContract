const HDWalletProvider = require('truffle-hdwallet-provider');
const { interface, bytecode } = require('./compile');
const Web3 = require('web3');

//HDWalletProvider unlocks acc using mnemonics phases from metamask and collect to influra node
const provider = new HDWalletProvider(
    'tornado fringe steak spawn space this yellow welcome snow cradle maze crucial',
    'https://rinkeby.infura.io/v3/b7943c4a598642c6964c57e8388deea0'
);

const web3 = new Web3(provider);


const deploy = async () => {
    //get all accounts
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account: ', accounts[0]);

    //deploy contract
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

    console.log("Contract address: ", result.options.address);
};

deploy();


