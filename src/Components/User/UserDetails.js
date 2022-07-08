import { Button, Input, Modal, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { login2, register } from "../../Adapters/UsersProvider";
import MailAndPassword from "./MailAndPassword";


function UserDetails(props) {
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    const [unit, setUnit] = useState('');
    const [position, setPosition] = useState('');

    async function submitHandler() {

    }

    return (
        <Modal style={{ margin: '15px' }}
            visible={true}
            footer={[<Button
                key="register"
                type="primary"
                onClick={submitHandler}>
                Submit
            </Button>, <Button
                key="close"
                type="secondary">
                Close
            </Button>]}>
            <Input
                value={typeof name === 'string' ? name : ''}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Enter your mail">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <Input
                value={typeof rank === 'string' ? rank : ''}
                onChange={(e) => setRank(e.target.value)}
                placeholder="Your username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Enter your mail">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <Input
                value={typeof unit === 'string' ? unit : ''}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Your username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Enter your mail">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <Input
                value={typeof position === 'string' ? position : ''}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Your username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Enter your mail">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
        </Modal>
    )
}

export default UserDetails;