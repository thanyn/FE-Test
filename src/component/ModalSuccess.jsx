import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, Modal } from 'antd';


export default function ModalSuccess({
    title,
    open,
    onOk,
    onCancel,
}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={open}
        >
            {title}
        </Modal>
    );
}