import { Modal, Typography } from "antd";
const { Paragraph } = Typography;

export default function ModalSuccess({ title, content, open, onOk }) {
    return (
        <Modal
            open={open}
            onOk={onOk}
            onCancel={onOk}
            okText="OK"
            centered
            footer={null}
            bodyStyle={{ textAlign: "center", padding: "30px 20px" }}
        >
            {title}

            <Paragraph style={{ fontSize: 14, marginBottom: 30 }}>
                {content}
            </Paragraph>

            <button
                onClick={onOk}
                style={{
                    padding: "10px 30px",
                    backgroundColor: "#52c41a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 5,
                    fontSize: 14,
                    cursor: "pointer",
                }}
            >
                OK
            </button>
        </Modal>
    );
}