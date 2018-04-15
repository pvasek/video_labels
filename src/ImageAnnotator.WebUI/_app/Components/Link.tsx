import * as React from "react";
import { RouteNavigator } from "./Route";

export interface LinkProps {
    to: RouteNavigator;
}

export class Link extends React.Component<LinkProps, {}> {
    constructor(props: LinkProps, context?: any) {
        super(props, context);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        this.props.to.navigate();
    }

    render() {
        const { to, children } = this.props;
        return <a href={to.url} onClick={this.onClick}>{children}</a>
    }
}