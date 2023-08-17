const { expect } = require('chai');
const { restore, stub } = require('sinon');
const fs = require('fs');
const proxyquire = require('proxyquire');

describe.skip('File Management', () => {
  afterEach(() => {
    restore();
  });

  it('should write a new file', () => {
    const writeStub = stub(fs, 'writeFileSync');
    const fileManagement = proxyquire('./file.management', { fs });
    fileManagement.createFile('test.txt');
    expect(writeStub.callCount).to.equal(1);
  });

  it('should throw an exception if a file with the same name already exists', () => {
    const writeStub = stub(fs, 'writeFileSync');
    writeStub.throws(new Error());
    const fileManagement = proxyquire('./file.management', { fs });
    expect(() => {
      fileManagement.createFile('test.txt');
    }).to.throw();
  });

  it('createFileSafe should create a file named test1 when test already exists', () => {
    const writeStub = stub(fs, 'writeFileSync');
    const readStub = stub(fs, 'readdirSync');
    const fileManagement = proxyquire('./file.management', { fs });
    writeStub.withArgs('./data/test.txt').throws(new Error());
    readStub.returns(['test.txt']);
  });

  it('getAllFiles should return a list of files', () => {
    const readStub = stub(fs, 'readdir');
    const fileManagement = proxyquire('./file.management', { fs });

    readStub.yields(null, ['test.txt']);
    fileManagement.getAllFiles((err, data) => {
      expect(data).to.eql(['test.txt']);
    });
  });

  it('getAllFilesPromise should return a list of files', () => {
    const readStub = stub(fs, 'readdir');
    const util = {
      promisify: stub().returns(readStub),
    };

    const fileManagement = proxyquire('./file.management', { fs, util });

    readStub.resolves(['test.txt']);
    return fileManagement.getAllFilesPromise().then((files) => expect(files).to.eql(['test.txt']));
  });
});
