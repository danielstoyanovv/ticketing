import { useState } from "react"
import useRequest from "../../hooks/use-request";


export default function Signup () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { doRequest, errors } = useRequest(
        "http://localhost:4000/api/users/signup",
        "post",
        {
            email, password
        }
    )

    const onSubmit = async (event) => {
        event.preventDefault()
        return await doRequest()
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up page</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
};

