const superTest = require('supertest');
const app = require('../app');

const launchPayLoad = {
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: "kepler-442 b"
}

describe('GET /launches', () => {
    describe('get all launches', () => {
        it("should response with a 200 status code", async () => {
            await superTest(app).get("/launches").expect(200);
        });
    });
});

describe('POST /launches', () => {
    describe('create launches', () => {
        it("should response with a 201 status code", async () => {
            let newFlightNumber = 100;
            await (await superTest(app).get("/launches")).send(launchPayLoad).expect(201, {
                mission: 'Kepler Exploration X',
                rocket: 'Explorer IS1',
                launchDate: new Date('2030-12-26T17:00:00.000Z'),
                target: "kepler-442 b",
                success: true,
                upcoming: true,
                customer: ["Zero to Mastery", "NASA"],
                flightNumber: newFlightNumber + 1
            });
        });
        describe('create launch with missing argument', () => {
            it("should response with a 400 status code", async () => {
                await superTest(app).post("/launches").expect(400);
            });
        });
    });
});

describe('DELETE /launches:id', () => {
    describe("delete launch by id", () => {
        it("should response with a 200 status code", async () => {
            const launchId = 100;
            await superTest(app).delete(`/launches/${launchId}`).expect(200);
        });
    });
});