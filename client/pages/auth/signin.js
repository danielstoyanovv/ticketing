import { useState } from "react"
import useRequest from "../../hooks/use-request";
import { useRouter } from 'next/navigation'

export default function Signup () {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { doRequest, errors } = useRequest(
        "http://localhost:4000/api/users/signin",
        "post",
        {
            email, password
        }
    )

    const onSubmit = async (event) => {
        event.preventDefault()
        const response =  await doRequest()
        if (response && response.data.logged_user_id !== null) router.push('/')
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign in page</h1>
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
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
};

