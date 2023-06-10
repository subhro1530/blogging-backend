const request = require("supertest")
const { testUser, authTestUser } = require("./utils")

describe("user", () => {
    describe("POST", () => {
        it("should create a user with a status of 201", async () => {
            await request("http://localhost:4000")
                .post("/api/user")
                .set("Accept", "application/json")
                .send({
                    name: "user",
                    email: "use@gmail.com",
                    password: "123",
                })
                .expect("Content-Type", /json/)
                .expect(201)
        })

        it("should return a status of 400 if user already exists", async () => {
            await testUser()
            await request("http://localhost:4000")
                .post("/api/user")
                .set("Accept", "application/json")
                .send({
                    name: "test",
                    email: "test@gmail.com",
                    password: "123",
                })
                .expect("Content-Type", /json/)
                .expect(400)
        })

        it("should return a status of 400 if all fields are not provided", async () => {
            await request("http://localhost:4000")
                .post("/api/user")
                .set("Accept", "application/json")
                .send({
                    name: "test",
                    email: "",
                    password: "123",
                })
                .expect("Content-Type", /json/)
                .expect(400)
        })
    })

    describe("GET", () => {
        let UID: string
        beforeEach(async () => {
            const { id } = await authTestUser()
            console.log(id)
            UID = id
        })
        it("should return a status of 404 if user not found", async () => {
            await request("http://localhost:4000")
                .get("/api/user/user123")
                .expect(400)
        })

        it("should return all user details if user is found", async () => {
            console.log(UID)
            await request("http://localhost:4000")
                .get(`/api/user/${UID}`)
                .expect(200)
        })
    })
    
})
