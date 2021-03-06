/* eslint-disable max-len */
import ava from 'ava';
import sinon from 'sinon';
import _isArray from 'lodash/isArray';
import _isEqual from 'lodash/isEqual';

import Pilot from '../../../src/assets/scripts/client/aircraft/Pilot/Pilot';
import {
    fmsArrivalFixture,
    modeControllerFixture
} from '../../fixtures/aircraftFixtures';

const airportNameMock = 'McCarran International Airport';
const runwayMock = '19L';
const validRouteStringMock = 'DAG.KEPEC3.KLAS';

ava.before(() => {
    sinon.stub(global.console, 'error', () => {});
});

ava.after(() => {
    global.console.error.restore();
});

ava('.applyArrivalProcedure() returns an error when passed an invalid routeString', (t) => {
    const expectedResult = [false, 'STAR name not understood'];
    const pilot = new Pilot(modeControllerFixture, fmsArrivalFixture);
    const result = pilot.applyArrivalProcedure('~!@#$%', airportNameMock);

    t.true(_isEqual(result, expectedResult));
});

ava('.applyArrivalProcedure() returns an error when passed an invalid procedure name', (t) => {
    const invalidRouteStringMock = 'DAG.~!@#$.KLAS';
    const expectedResult = [false, 'STAR name not understood'];
    const pilot = new Pilot(modeControllerFixture, fmsArrivalFixture);
    const result = pilot.applyArrivalProcedure(invalidRouteStringMock, runwayMock, airportNameMock);

    t.true(_isEqual(result, expectedResult));
});

ava('.applyArrivalProcedure() returns an error when passed a procedure with an invaild entry', (t) => {
    const invalidRouteStringMock = 'a.KEPEC3.KLAS';
    const expectedResult = [false, 'STAR name not understood'];
    const pilot = new Pilot(modeControllerFixture, fmsArrivalFixture);
    const result = pilot.applyArrivalProcedure(invalidRouteStringMock, runwayMock, airportNameMock);

    t.true(_isEqual(result, expectedResult));
});

ava('.applyArrivalProcedure() returns a success message after success', (t) => {
    const pilot = new Pilot(modeControllerFixture, fmsArrivalFixture);
    const result = pilot.applyArrivalProcedure(validRouteStringMock, runwayMock, airportNameMock);

    t.true(_isArray(result));
    t.true(result[0]);
    t.true(result[1].log === 'cleared to McCarran International Airport via the KEPEC3 arrival');
    t.true(result[1].say === 'cleared to McCarran International Airport via the KEPEC THREE arrival');
});
