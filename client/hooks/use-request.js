import axios from "axios";
import { useState } from "react";

const useRequest = (url, method, body) => {
    const [errors, setErrors] = useState(null)

    const doRequest = async () => {
            setErrors(null);
            const response = await axios[method](url, body).catch((err) => {
                setErrors(
                    <div className="alert alert-danger">
                        <h4>Ooops....</h4>
                        <ul className="my-0">
                            {err.response.data.errors.map((err) => (
                                <li key={err.message}>{err.message}</li>
                            ))}
                        </ul>
                    </div>
                )
            });

            if (response && response.status === 201) {
                return response.data
            }

    }

    return {doRequest, errors}
};

export default useRequest