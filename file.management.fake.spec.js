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

  it('Should throw an exception when the file already exists', () => {
    const writeFake = fake.throws(new Error());
    replace(fs, 'writeFileSync', writeFake);
    const fileManagement = proxyquire('./file.management', { fs });

    expect(() => fileManagement.createFile('test.txt')).to.throw();
  });

  it('Should return a list of files', () => {
    const readFake = fake.yields(null, ['test.txt']);
    replace(fs, 'readdir', readFake);
    const fileManagement = proxyquire('./file.management', { fs });

    fileManagement.getAllFiles((err, data) => {
      expect(data).to.eql(['test.txt']);
    });
  });
});
