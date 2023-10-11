import { Result } from "antd";
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from "../components/layout.dashboard";

export default function Custom404() {

    const navigate = useNavigate();

    return <LayoutDashboard>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<button onClick={() => navigate(-1)} className="p-2 text-backround_primary border border-succes_primary">Back Page</button>}
        />
    </LayoutDashboard>
}