'use client'
import React, { useEffect, useState } from 'react';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';
import type { TableProps } from 'antd';
import { IUser } from '@/types/backend.d';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import CreateUser from './create.user';
import UpdateUser from './update.user';
import { handleDeleteUserAction } from '@/actions';

interface IProps {
    users: IUser[] | [];
    meta: {
        current: number,
        pageSize: number,
        total: number
    }
}

const UserTable = (props: IProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isFetchData, setIsFetchData] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);
    const { users, meta } = props;

    const handleDeleteUser = async (item: any) => {
        let res = await handleDeleteUserAction(item.id);
        console.log(res)
    }

    const renderHeader = () => {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <span>Table List User</span>
                <Button
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Thêm mới
                </Button>
            </div>
        )
    }

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <>
                        <EditTwoTone
                            twoToneColor="#f7ad2d"
                            style={{ cursor: "pointer", margin: "0 20px" }}
                            onClick={() => {
                                setIsUpdateModalOpen(true);
                                setDataUpdate(record);
                            }}
                        />

                        <Popconfirm
                            placement='leftTop'
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc là muốn xóa user này không?"}
                            okText={"Xác nhận"}
                            cancelText={"Hủy"}
                            onConfirm={() => handleDeleteUser(record)}


                        >
                            <span style={{ cursor: "pointer" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </>
                )
            }
        },
    ];

    useEffect(() => {
        if (users) setIsFetchData(false)
    }, [users])

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', pagination.current);
            replace(`${pathname}?${params.toString()}`);
            setIsFetchData(true)
        }
    }

    return (
        <>
            <Table<IUser>
                title={renderHeader}
                loading={isFetchData}
                rowKey={"id"}
                bordered
                columns={columns}
                dataSource={users}
                onChange={onChange}
                pagination={
                    {
                        current: meta.current,
                        pageSize: meta.pageSize,
                        total: meta.total,
                        showSizeChanger: false,
                        showTotal: (total, range) => {
                            return (<div>{range[0]} - {range[1]} trên {total} rows</div>)
                        }
                    }
                }
            />

            <CreateUser
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateUser
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
            />
        </>
    )
}


export default UserTable;