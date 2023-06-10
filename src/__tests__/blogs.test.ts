const request = require("supertest")

// Import the utils
const { testUser, authTestUser } = require("./utils")

describe("blog", () => {
    describe("GET", () => {
        it("should return all the blogs with status of 200", async () => {
            await request("http://localhost:4000").get("/api/post").expect(200)
        })

        it("should return a status code of 404 if blog doesn't exist", async () => {
            const productId = "blog-123"
            await request("http://localhost:4000")
                .get(`/api/post/${productId}`)
                .expect(404)
        })
    })

    describe("POST", () => {
        let JWTTOKEN: string
        beforeEach(async () => {
            const { token } = await authTestUser()
            JWTTOKEN = token
        })
        it("should throw an Error if any unauthorized user tries to create a blog", async () => {
            await expect(async () => {
                await request("http://localhost:4000").post("/api/post").send({
                    title: "test",
                    body: "test",
                    userName: "test",
                })
            }).toThrowError
        })

        it("should create a blog if the user is authorized", async () => {
            await testUser()
            await request("http://localhost:4000").post("/api/post").send({
                title: "test",
                body: "test",
                userName: "test",
            })
            request("http://localhost:4000")
                .post("/api/post")
                .set("Authorization", `Bearer ${JWTTOKEN}`)
                .set("Accept", "application/json")
                .send({
                    title: "test",
                    body: "test",
                    userName: "test",
                })
                .expect(201)
        })
    })
})
