import { Result } from "antd";
import { useNavigate } from 'react-router-dom';

export default function Non404() {

    const navigate = useNavigate();

    return <div className="fixed w-full h-full flex items-center justify-center">
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<button onClick={() => navigate(-1)} className="p-2 text-backround_primary border border-succes_primary">Back Page</button>}
        />
    </div>
}