import { Col, Input, InputNumber, Radio, Row, Slider, Tooltip } from "antd";
import { isMobile } from "react-device-detect";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

function UserInfoEdit(props) {
    const levelLabelClass = isMobile ? 'item-title-mobile' : 'item-title';

    const radioOptions = [
        { label: 'גרועים', value: 'low' },
        { label: 'סבירים', value: 'high' },
    ];

    return (<>
        {<div>{props.title}</div>}
        {<div style={{ margin: '10px' }}>
            <div>
                <div className='item-title'>Name:</div>
                <Input
                value={typeof props.playerName === 'string' ? props.playerName : ''}
                    onChange={props.onPlayerNameChanged}
                    placeholder="Your username"
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
                            onChange={props.onLevelChanged}
                            style={{ width: '150px' }}
                            value={typeof props.levelState === 'number' ? props.levelState : 0}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={5}
                            step={0.5}
                            style={{ marginLeft: '40px', width: '50px' }}
                            value={props.levelState}
                            onChange={props.onLevelChanged}
                        />
                    </Col>
                </Row>
            </div>
            <div style={{ marginTop: '10px' }}>
                <div className={levelLabelClass}>Preference:&nbsp;&nbsp;</div>

                <Row className="level-slider">
                    <Radio.Group
                        options={radioOptions}
                        onChange={props.onRadioChanged}
                        value={props.preference}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Row>

                <Row>
                    {/* <Button loading={isLoading} 
                            style={{   position: 'absolute',
                                right: '5px',
                                 }}
                            onClick={props.registerHandler}
                            type='primary'
                            className='register-button'>Register</Button> */}
                </Row>
            </div>
        </div>}</>)
}

export default UserInfoEdit;