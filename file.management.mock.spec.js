const { expect } = require('chai');
const { mock, restore } = require('sinon');
const fs = require('fs');
const proxyquire = require('proxyquire');
const fileManagement = require('./file.management');

describe('File Management Mocks', () => {
  afterEach(() => {
    restore();
  });

  it('Should call writeFileSync when creating a file', () => {
    const writeMock = mock(fs);
    writeMock.expects('writeFileSync').once();
    const fileManagement = proxyquire('./file.management', { fs });
    fileManagement.createFile('test.txt');
    writeMock.verify();
  });

  it('createFileSafe should create a new file with a number appended', () => {
    const writeMock = mock(fs);
    writeMock.expects('writeFileSync').withArgs('./data/test.txt').throws();
    writeMock.expects('writeFileSync').withArgs('./data/test1.txt').once();
    const fileManagement = proxyquire('./file.management', { fs });
    fileManagement.createFileSafe('test.txt');
    writeMock.verify();
  });

  it('createFile should never call writeFileSync when the file is empty', () => {
    const writeMock = mock(fs);
    writeMock.expects('writeFileSync').never();
    const fileManagement = proxyquire('./file.management', { fs });
    try {
      fileManagement.createFile();
    } catch (err) {}
    writeMock.verify();
  });
});
