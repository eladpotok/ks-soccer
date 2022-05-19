import { Card, Spin } from "antd";

import './LoadingComponent.css'

function LoadingComponent(props) {

    console.log('props.is loading' , props.isLoading);
    return (
        <>
            {/* <div className="overlay" /> */}
            {props.isLoading && <Card className="loading-component-card" style={{ height: '300px', width: '300px' }}>
                <Spin tip='Loading...'>
                </Spin>
            </Card>}
            {!props.isLoading && props.children}
        </>
    )

}


export default LoadingComponent;