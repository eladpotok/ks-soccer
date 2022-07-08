import { Col, Input, InputNumber, Row, Slider, Tooltip } from "antd";
import { isMobile } from "react-device-detect";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

function UserInfoEdit(props) {
    const levelLabelClass = isMobile ? 'item-title-mobile' : 'item-title';

    let user = props.user;

    function editValue(key, value) {
        const editUser = { ...user, [key]: value }
        props.setUser(editUser)
    }

    return (<>
        {<div>{props.title}</div>}
        {<div style={{ margin: '10px' }}>
            <div>
                <Input
                    value={typeof user.name === 'string' ? user.name : ''}
                    onChange={(e) => { 
                        editValue('name', e.target.value);
                     }}
                    placeholder="Your Full Name"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="Enter your name as it will be displayed">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />

            </div>
            <div>
                <Input
                    value={typeof user.position === 'string' ? user.position : ''}
                    onChange={(e) => { 
                        editValue('position', e.target.value);
                     }}
                    placeholder="Your Position"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="Enter your name as it will be displayed">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />

            </div>
            <div>
                <Input
                    value={typeof user.unit === 'string' ? user.unit : ''}
                    onChange={(e) => { 
                        editValue('unit', e.target.value);
                     }}
                    placeholder="Your Unit"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="Enter your name as it will be displayed">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />

            </div>
            <div style={{ marginTop: '10px' }}>
                <div className={levelLabelClass}>Level:&nbsp;&nbsp;</div>

                <Row className="level-slider">
                    <Col span={12}>
                        <Slider
                            min={1}
                            max={5}
                            step={0.5}
                            style={{ width: '150px' }}
                            value={typeof user.stars === 'number' ? user.stars : 0}
                            onChange={(e) => { 
                                editValue('stars', e);
                             }}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={5}
                            step={0.5}
                            style={{ marginLeft: '40px', width: '50px' }}
                            value={typeof user.stars === 'number' ? user.stars : 0}
                            onChange={(e) => { 
                                editValue('stars', e);
                             }}
                        />
                    </Col>
                </Row>
            </div>

        </div>}</>)
}

export default UserInfoEdit;