import axios from "axios";

export default function LandingPage({ currentUser })  {
    return currentUser ? <h1>Signed in user</h1> : <h1>Not signed in user</h1>
};
LandingPage.getInitialProps = async () => {
    if (typeof window === "undefined") {
        const response = await axios.get('http://localhost:4000/api/users/current-user').catch((err) => {
            console.log(err.message);
        });
        if (response) return response.data

    }
    return {};
}