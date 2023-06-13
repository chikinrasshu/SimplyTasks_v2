import React from "react";
import { Card } from "react-bootstrap";

interface Props extends React.PropsWithChildren {
    title?: string
}

const Window: React.FC<Props> = ({children, title}) => {
    return (
        <Card className="shadow m-3">
            <Card.Body className="p-2">
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