import zoodaysMap from "../images/zoodaysMap.jpg";
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Map() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button outline color="success" onClick={toggle}>
                Zoo Map
            </Button>
            <Modal isOpen={modal} toggle={toggle} size="xl">
                <ModalHeader toggle={toggle}>ZooDays Map</ModalHeader>
                <ModalBody className="text-center">
                    <img src={zoodaysMap} width="700" alt="ZooDays Map" />
                </ModalBody>
            </Modal>
        </div>
    );
}