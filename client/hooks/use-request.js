import axios from "axios";
import { useState } from "react";

const useRequest = (url, method, body) => {
    const [errors, setErrors] = useState(null)

    const doRequest = async () => {

    }

    return {doRequest, errors}
};

export default useRequest