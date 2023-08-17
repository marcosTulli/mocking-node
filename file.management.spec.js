const { expect } = require('chai');
const { spy, restore } = require('sinon');
const fs = require('fs');
const proxyquire = require('proxyquire');
const fileManagement = require('./file.management');

describe.skip('File Management', () => {
  afterEach(() => {
    restore();
  });

  describe('Wehen creating a new file', () => {
    it('Should call writeFIleSync', () => {
      const writeSpy = spy(fs, 'writeFileSync');
      const fileManagement = proxyquire('./file.management', { fs });
      fileManagement.createFile('test.txt');

      expect(writeSpy.calledWith('./data/test.txt', '')).to.be.true;
    });

    it('Should not create a new file if no filename is specified', () => {
      const writeSpy = spy(fs, 'writeFileSync');
      const fileManagement = proxyquire('./file.management', { fs });

      try {
        fileManagement.createFile();
      } catch (err) {}
      expect(writeSpy.notCalled).to.be.true;
    });
  });

  it.skip('Should call writeFIleSync', () => {
    const writeSpy = spy(fs, 'writeFileSync');
    fileManagement.createFileInjected('test.txt', fs);
    expect(writeSpy.calledWith('./data/test.txt', '')).to.be.true;
  });
});
