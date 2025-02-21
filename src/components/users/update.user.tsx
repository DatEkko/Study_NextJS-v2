import { useState } from "react";
import { message, Modal } from 'antd';
import { Form, Input } from 'antd';
import { handleUpdateUserAction } from "@/actions";
import { useEffect } from "react";

const UpdateUser = (props: any) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate } = props;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                id: dataUpdate.id
            });
        }
    }, [dataUpdate, form]);

    const handleOk = async () => {
        setConfirmLoading(true);
        form.validateFields()
            .then(async values => {
                const res = await handleUpdateUserAction({ ...values, id: dataUpdate.id });
                if (res) {
                    setIsUpdateModalOpen(false);
                    setConfirmLoading(false);
                    message.success("Update User Succeed");
                }
            })
            .catch(errorInfo => {
                console.log('Validation Failed:', errorInfo);
            });
    };

    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    type FieldType = {
        name?: string;
        email?: string;
    };

    return (
        <>
            <Modal
                title="Update A User"
                open={isUpdateModalOpen}
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

export default UpdateUser;