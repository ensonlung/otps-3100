import { ReactNode } from "react";

interface AlertProps {
    children: ReactNode;
    onClose: () => void;
}

const Alert = ({ children, onClose }: AlertProps) => {
    return (
        <div className="alert alert-primary alert-dismissible fade show" role="alert">
            {children}
            <button type="button" className="btn-close" data-bs-dismiss="alert" arai-label="Close" onClick={onClose}/>
        </div>
    );
};

export default Alert;
