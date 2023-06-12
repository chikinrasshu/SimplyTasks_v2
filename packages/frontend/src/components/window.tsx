import React from "react";
import { Card } from "react-bootstrap";

interface Props extends React.PropsWithChildren {
    title?: string
}

const Window: React.FC<Props> = ({children, title}) => {
    return (
        <Card className="shadow">
            <Card.Body>
                {title &&
                <>
                    <h3 className="mb-4 pb-2 pb-md-0 text-center">{title}</h3>
                    <hr className="mb-md-5"></hr>
                </>}
                {children}
            </Card.Body>
        </Card>
    );
};

export default Window;