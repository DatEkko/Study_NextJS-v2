'use client'
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link href={'/'}>Home</Link>,
        key: 'home',
        icon: <MailOutlined />,
    },
    {
        label: <Link href={'/users'}>User Management</Link>,
        key: 'user',
        icon: <AppstoreOutlined />,
    },
    {
        label: <Link href={'/blogs'}>Blog Management</Link>,
        key: 'blog',
        icon: <AppstoreOutlined />,
    },
];

const Header: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;