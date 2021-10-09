const path = require('path');
const fs = require('fs');
const solc = require('solc');

//path allows use to access the dir of files using OS requirements
const InboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(InboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];

