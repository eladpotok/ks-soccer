import { Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

function MailAndPassword(props) {

    return <>
        <Input style={{marginTop: '10px'}}
            value={typeof props.mail === 'string' ? props.mail : ''}
            onChange={(e) => props.setMail(e.target.value)}
            placeholder="Your username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
                <Tooltip title="Enter your mail">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
            }
        />
        <Input.Password style={{marginTop: '10px'}}
            value={typeof props.password === 'string' ? props.password : ''}
            onChange={(e) => props.setPassword(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
                <Tooltip title="Enter your name as it will be displayed">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
            }
        />
    </>
}

export default MailAndPassword;