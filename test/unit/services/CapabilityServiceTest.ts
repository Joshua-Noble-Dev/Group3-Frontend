import MockAdapter from "axios-mock-adapter";
import { Capability } from "../../../src/models/Capability";
import { getCapabilities, URL } from "../../../src/services/CapabilityService";
import { expect } from "chai";
import { requestInstanceCap } from "../../../src/models";

const capabilities: Capability = {
    capabilityID: 1,
    capabilityName: "Engineering"
};

const mock = new MockAdapter(requestInstanceCap);

describe('CapabilityService', function () {

    describe('getCapabilities', function () {
        it('should return bands from response', async () => {

          const data = [capabilities];
  
          mock.onGet(URL).reply(200, data);
  
          const results = await getCapabilities();

          console.log(results[0].capabilityID);
          console.log(results[0].capabilityName);
  
          expect(results[0].capabilityID).to.deep.equal(capabilities.capabilityID);
          expect(results[0].capabilityName).to.deep.equal(capabilities.capabilityName);
        })
  
        it('should return Failed to get Bands when error returned from axios', async () => {
    
            mock.onGet(URL).reply(500);

            try {
                await getCapabilities();
                throw new Error('Error not thrown');
              } catch (e) {
                expect(e.message).to.equal('Failed to get capabilities');
                return;
              }
        })

      })
});