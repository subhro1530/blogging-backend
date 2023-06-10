const request = require("supertest")

const testUser = async () => {
    await request("http://localhost:4000")
        .post("/api/user")
        .set("Accept", "application/json")
        .send({
            name: "test",
            email: "test@gmail.com",
            password: "123",
        })
}

const authTestUser = async () => {
    await testUser()
    const response = await request("http://localhost:4000")
        .post("/api/login")
        .set("Accept", "application/json")
        .send({
            email: "test@gmail.com",
            password: "123",
        })

    console.log(response)
    return { token: response?.body?.token, id: response?.body?.id, name: request?.body?.name}
}
export { testUser, authTestUser }
