const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');
let accounts;
let inbox;

// test using mocha that provides beforeEach(), describe() and 'it' statements

beforeEach(async () => {
    // get all accounts from ganache
    accounts = await web3.eth.getAccounts();
    
    // deploy contract to ganache
    inbox = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode, arguments: ['Hi John'] })
            .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploy contract', () => {
        // confirm that the deployed contract has an addr
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        // check the initial msg is the one from deployement
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi John');
    });

    it('has being changed', async () => {
        //check if message was changed
        await inbox.methods.setMessage('Bye John').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye John');
    });
});