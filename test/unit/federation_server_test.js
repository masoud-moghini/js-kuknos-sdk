const http = require("http");
/*
describe("federation-server.js tests", function() {
  beforeEach(function() {
    this.server = new StellarSdk.FederationServer(
      "https://esb.kuknos.ir/api/directory/federation",
      "kuknos.ir",
    );
    this.axiosMock = sinon.mock(axios);
    StellarSdk.Config.setDefault();
  });

  afterEach(function() {
    this.axiosMock.verify();
    this.axiosMock.restore();
  });

  describe("FederationServer.constructor", function() {
    it("throws error for insecure server", function() {
      expect(
        () =>
          new StellarSdk.FederationServer(
            "http://acme.com:1337/federation",
            "kuknos.ir",
          ),
      ).to.throw(/Cannot connect to insecure federation server/);
    });

    it("allow insecure server when opts.allowHttp flag is set", function() {
      expect(
        () =>
          new StellarSdk.FederationServer(
            "http://acme.com:1337/federation",
            "kuknos.ir",
            { allowHttp: true },
          ),
      ).to.not.throw();
    });

    it("allow insecure server when global Config.allowHttp flag is set", function() {
      StellarSdk.Config.setAllowHttp(true);
      expect(
        () =>
          new StellarSdk.FederationServer(
            "http://acme.com:1337/federation",
            "kuknos.ir",
            { allowHttp: true },
          ),
      ).to.not.throw();
    });
  });

  describe("FederationServer.resolveAddress", function() {
    beforeEach(function() {
      this.axiosMock
        .expects("get")
        .withArgs(
          sinon.match(
            "https://esb.kuknos.ir/api/directory/federation?type=name&q=masoud%2Akuknos.ir",
          ),
        )
        .returns(
          Promise.resolve({
            data: {
              stellar_address: "masoud*kuknos.ir",
              account_id:
                "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
            },
          }),
        );
    });

    it("requests is correct", function(done) {
      this.server
        .resolveAddress("masoud*kuknos.ir")
        .then((response) => {
          expect(response.stellar_address).equals("masoud*kuknos.ir");
          expect(response.account_id).equals(
            "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
          );
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it("requests is correct for username as stellar address", function(done) {
      this.server
        .resolveAddress("masoud*kuknos.ir")
        .then((response) => {
          expect(response.stellar_address).equals("masoud*kuknos.ir");
          expect(response.account_id).equals(
            "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
          );
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe("FederationServer.resolveAccountId", function() {
    beforeEach(function() {
      this.axiosMock
        .expects("get")
        .withArgs(
          sinon.match(
            "https://esb.kuknos.ir/api/directory/federation?type=id&q=GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
          ),
        )
        .returns(
          Promise.resolve({
            data: {
              stellar_address: "masoud*kuknos.ir",
              account_id:
                "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
            },
          }),
        );
    });

    it("requests is correct", function(done) {
      this.server
        .resolveAccountId(
          "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
        )
        .then((response) => {
          expect(response.stellar_address).equals("masoud*kuknos.ir");
          expect(response.account_id).equals(
            "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
          );
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe("FederationServer.resolveTransactionId", function() {
    beforeEach(function() {
      this.axiosMock
        .expects("get")
        .withArgs(
          sinon.match(
            "https://esb.kuknos.ir/api/directory/federation?type=txid&q=3389e9f0f1a65f19736cacf544c2e825313e8447f569233bb8db39aa607c8889",
          ),
        )
        .returns(
          Promise.resolve({
            data: {
              stellar_address: "masoud*kuknos.ir",
              account_id:
                "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
            },
          }),
        );
    });

    it("requests is correct", function(done) {
      this.server
        .resolveTransactionId(
          "3389e9f0f1a65f19736cacf544c2e825313e8447f569233bb8db39aa607c8889",
        )
        .then((response) => {
          expect(response.stellar_address).equals("masoud*kuknos.ir");
          expect(response.account_id).equals(
            "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
          );
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe("FederationServer.createForDomain", function() {
    it("creates correct object", function(done) {
      this.axiosMock
        .expects("get")
        .withArgs(sinon.match("https://acme.com/kuknos.toml"))
        .returns(
          Promise.resolve({
            data: `
#   The endpoint which clients should query to resolve stellar addresses
#   for users on your domain.
FEDERATION_SERVER="https://esb.kuknos.ir/api/directory/federation"
`,
          }),
        );

      StellarSdk.FederationServer.createForDomain("acme.com").then(
        (federationServer) => {
          expect(federationServer.serverURL.protocol()).equals("https");
          expect(federationServer.serverURL.hostname()).equals(
            "esb.kuknos.ir",
          );
          expect(federationServer.serverURL.path()).equals("/federation");
          expect(federationServer.domain).equals("acme.com");
          done();
        },
      );
    });

    it("fails when stellar.toml does not contain federation server info", function(done) {
      this.axiosMock
        .expects("get")
        .withArgs(sinon.match("https://acme.com/kuknos.toml"))
        .returns(
          Promise.resolve({
            data: "",
          }),
        );

      StellarSdk.FederationServer.createForDomain("acme.com")
        .should.be.rejectedWith(
          /stellar.toml does not contain FEDERATION_SERVER field/,
        )
        .and.notify(done);
    });
  });

  describe("FederationServer.resolve", function() {
    it("succeeds for a valid account ID", function(done) {
      StellarSdk.FederationServer.resolve(
        "GAFSZ3VPBC2H2DVKCEWLN3PQWZW6BVDMFROWJUDAJ3KWSOKQIJ4R5W4J",
      )
        .should.eventually.deep.equal({
          account_id:
            "GAFSZ3VPBC2H2DVKCEWLN3PQWZW6BVDMFROWJUDAJ3KWSOKQIJ4R5W4J",
        })
        .notify(done);
    });

    it("fails for invalid account ID", function(done) {
      StellarSdk.FederationServer.resolve("invalid")
        .should.be.rejectedWith(/Invalid Account ID/)
        .notify(done);
    });

    it("succeeds for a valid Stellar address", function(done) {
      this.axiosMock
        .expects("get")
        .withArgs(sinon.match("https://esb.kuknos.ir/api/directory/federation/?type=name&q=masoud%2Akuknos.ir"))
        .returns(
          Promise.resolve({
            data: `
#   The endpoint which clients should query to resolve stellar addresses
#   for users on your domain.
FEDERATION_SERVER="https://esb.kuknos.ir/api/directory/federation"
`,
          }),
        );

      this.axiosMock
        .expects("get")
        .withArgs(
          sinon.match(
            "https://esb.kuknos.ir/api/directory/federation/?type=name&q=masoud%2Akuknos.ir",
          ),
        )
        .returns(
          Promise.resolve({
            data: {
              stellar_address: "masoud*kuknos.ir",
              account_id:
                "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
              memo_type: "id",
              memo: "100",
            },
          }),
        );

      StellarSdk.FederationServer.resolve("masoud*kuknos.ir")
        .should.eventually.deep.equal({
          stellar_address: "masoud*kuknos.ir",
          account_id:
            "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
          memo_type: "id",
          memo: "100",
        })
        .notify(done);
    });

    it("fails for invalid Stellar address", function(done) {
      StellarSdk.FederationServer.resolve("masoud*kuknos.ir*test")
        .should.be.rejectedWith(/Invalid Stellar address/)
        .notify(done);
    });

    it("fails when memo is not string", function(done) {
      this.axiosMock
        .expects("get")
        .withArgs(
          sinon.match(
            "https://esb.kuknos.ir/api/directory/federation?type=name&q=masoud%2Akuknos.ir",
          ),
        )
        .returns(
          Promise.resolve({
            data: {
              stellar_address: "masoud*kuknos.ir",
              account_id:
                "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
              memo_type: "id",
              memo: 100,
            },
          }),
        );

      this.server
        .resolveAddress("masoud*kuknos.ir")
        .should.be.rejectedWith(/memo value should be of type string/)
        .notify(done);
    });

    it("fails when response exceeds the limit", function(done) {
      // Unable to create temp server in a browser
      if (typeof window != "undefined") {
        return done();
      }
      var response = Array(StellarSdk.FEDERATION_RESPONSE_MAX_SIZE + 10).join(
        "a",
      );
      let tempServer = http
        .createServer((req, res) => {
          res.setHeader("Content-Type", "application/json; charset=UTF-8");
          res.end(response);
        })
        .listen(4444, () => {
          new StellarSdk.FederationServer(
            "http://localhost:4444/federation",
            "kuknos.ir",
            { allowHttp: true },
          )
            .resolveAddress("masoud*kuknos.ir")
            .should.be.rejectedWith(
              /federation response exceeds allowed size of [0-9]+/,
            )
            .notify(done)
            .then(() => tempServer.close());
        });
    });
  });

  describe("FederationServer times out when response lags and timeout set", function() {
    afterEach(function() {
      StellarSdk.Config.setDefault();
    });

    let opts = { allowHttp: true };
    let message;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        StellarSdk.Config.setTimeout(1000);
        message = "with global config set";
      } else {
        opts = { allowHttp: true, timeout: 1000 };
        message = "with instance opts set";
      }

      it(`resolveAddress times out ${message}`, function(done) {
        // Unable to create temp server in a browser
        if (typeof window != "undefined") {
          return done();
        }

        let tempServer = http
          .createServer((req, res) => {
            setTimeout(() => {}, 10000);
          })
          .listen(4444, () => {
            new StellarSdk.FederationServer(
              "http://localhost:4444/federation",
              "kuknos.ir",
              opts,
            )
              .resolveAddress("masoud*kuknos.ir")
              .should.be.rejectedWith(/timeout of 1000ms exceeded/)
              .notify(done)
              .then(() => tempServer.close());
          });
      });

      it(`resolveAccountId times out ${message}`, function(done) {
        // Unable to create temp server in a browser
        if (typeof window != "undefined") {
          return done();
        }
        let tempServer = http
          .createServer((req, res) => {
            setTimeout(() => {}, 10000);
          })
          .listen(4444, () => {
            new StellarSdk.FederationServer(
              "http://localhost:4444/federation",
              "kuknos.ir",
              opts,
            )
              .resolveAccountId(
                "GDVFVVDO56NCOBWB4N3YM3FBRENJWIWJ7PKEDGKF6NCAUOO76SD7LEX3",
              )
              .should.be.rejectedWith(/timeout of 1000ms exceeded/)
              .notify(done)
              .then(() => tempServer.close());
          });
      });

      it(`resolveTransactionId times out ${message}`, function(done) {
        // Unable to create temp server in a browser
        if (typeof window != "undefined") {
          return done();
        }
        let tempServer = http
          .createServer((req, res) => {
            setTimeout(() => {}, 10000);
          })
          .listen(4444, () => {
            new StellarSdk.FederationServer(
              "http://localhost:4444/federation",
              "kuknos.ir",
              opts,
            )
              .resolveTransactionId(
                "3389e9f0f1a65f19736cacf544c2e825313e8447f569233bb8db39aa607c8889",
              )
              .should.be.rejectedWith(/timeout of 1000ms exceeded/)
              .notify(done)
              .then(() => tempServer.close());
          });
      });

      it(`createForDomain times out ${message}`, function(done) {
        // Unable to create temp server in a browser
        if (typeof window != "undefined") {
          return done();
        }
        let tempServer = http
          .createServer((req, res) => {
            setTimeout(() => {}, 10000);
          })
          .listen(4444, () => {
            StellarSdk.FederationServer.createForDomain("localhost:4444", opts)
              .should.be.rejectedWith(/timeout of 1000ms exceeded/)
              .notify(done)
              .then(() => tempServer.close());
          });
      });

      it(`resolve times out ${message}`, function(done) {
        // Unable to create temp server in a browser
        if (typeof window != "undefined") {
          return done();
        }

        let tempServer = http
          .createServer((req, res) => {
            setTimeout(() => {}, 10000);
          })
          .listen(4444, () => {
            StellarSdk.FederationServer.resolve("bob*localhost:4444", opts)
              .should.eventually.be.rejectedWith(/timeout of 1000ms exceeded/)
              .notify(done)
              .then(() => tempServer.close());
          });
      });
    }
  });
});
*/