import { useState } from "react";
import { message, Modal } from 'antd';
import { Form, Input } from 'antd';
import { handleCreateUserAction } from "@/actions";

const CreateUser = (props: any) => {
    const { isCreateModalOpen, setIsCreateModalOpen } = props;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    const handleOk = async () => {
        setConfirmLoading(true);
        form.validateFields()
            .then(async values => {
                const res = await handleCreateUserAction(values);
                if (res) {
                    setIsCreateModalOpen(false);
                    setConfirmLoading(false);
                    message.success("Create Succeed");
                }
            })
            .catch(errorInfo => {
                console.log('Validation Failed:', errorInfo);
            });
    };

    const handleCancel = () => {
        setIsCreateModalOpen(false);
    };

    type FieldType = {
        name?: string;
        email?: string;
    };

    return (
        <>
            <Modal
                title="Create New User"
                open={isCreateModalOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    wrapperCol={{ span: 16 }}
                    style={{ display: "flex" }}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateUser;