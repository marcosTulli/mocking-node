const { expect } = require('chai');
const { fake, restore, replace } = require('sinon');
const fs = require('fs');
const proxyquire = require('proxyquire');

describe('File Management', () => {
  afterEach(() => {
    restore();
  });
  it('Should create a new file', () => {
    const writeFake = fake(fs.writeFileSync);
    replace(fs, 'writeFileSync', writeFake);

    const fileManagement = proxyquire('./file.management', { fs });
    fileManagement.createFile('test.txt');
    expect(writeFake.calledWith('./data/test.txt')).to.be.true;
  });
});
