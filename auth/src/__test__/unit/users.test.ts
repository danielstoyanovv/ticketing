import {UserService} from "../../services/UserService";
import {BadRequestError} from "@dmstickets/common";
import {Password} from "../../services/password";
it("verify user email and password are correct", async () => {
    const email = "test@test.com";
    const password = await Password.toHash("password")

    const service = new UserService()
    const exists = await service
        .setEmail(email)
        .userExists()
    if (exists) throw new BadRequestError("Email in use")
    // Verify email
    const user = await service
        .setEmail(email)
        .setPassword(password)
        .createUser()
    expect(user.email).toEqual(email);
    // Verify password
    const passwordsMatch =  await Password.compare(
        user.password,
        "password"
    )
    expect(passwordsMatch).toEqual(true);
})
