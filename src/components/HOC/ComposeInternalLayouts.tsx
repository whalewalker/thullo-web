import InternalLayout from "../InternalLayout";
import React from "react";

const ComposeInternalLayouts = (CustomComponent: any) => (componentProps: any)  => (
    <InternalLayout CustomComponent={CustomComponent} {...componentProps} />
);


export default ComposeInternalLayouts;