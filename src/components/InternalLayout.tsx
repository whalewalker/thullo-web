import React from 'react';
import ProtectRoute from "./ProtectRoute";
import Layout from "./Layout";

// @ts-ignore
const InternalLayout = ({CustomComponent, componentProps}) => {
    return (
        <ProtectRoute>
            <Layout>
                <CustomComponent  {...componentProps}/>
            </Layout>
        </ProtectRoute>
    );
};

export default InternalLayout;