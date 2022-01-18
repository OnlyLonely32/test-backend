import React from 'react'
import { Menu } from 'antd';
import clsx from "clsx"

import {
  FolderFilled,
  FolderOpenFilled
} from '@ant-design/icons';

const FolderMenu = ({folders, current, setCurrent}) => {
  return (
    <Menu theme="dark" mode="inline">
      {
        folders?.map(folder => (
          <Menu.Item 
            key={folder._id} 
            icon={current !== folder._id ?<FolderFilled /> :<FolderOpenFilled />}
            className={clsx(current === folder._id && "ant-menu-item-selected")}
            onClick={() => setCurrent(folder._id)}
          >
            {folder.name}
          </Menu.Item>
        ))
      }
    </Menu>
  )
}

export default FolderMenu;