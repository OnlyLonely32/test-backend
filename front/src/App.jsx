import './App.css';
import React from 'react'
import axios from "axios"
import FolderMenu from './components/FolderMenu'
import Auth from './components/Auth';
import Slider from './components/Slider'

import { Layout, Button, Modal, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import CreateFolder from './components/CreateFolder';
import CreateCard from './components/CreateCard';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapse, setCollapse] = React.useState(false)
  const [folders, setFolders] = React.useState([])
  const [currentFolder, setCurrentFolder] = React.useState("");
  const [cards, setCards] = React.useState([])
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [actionType, setActionType] = React.useState("");
  const [user, setUser] = React.useState({});

  const deleteCard = async(cardId) => {
    try {
      const res = await axios.delete("http://localhost:5000/api/card/" + cardId);
      getCards(currentFolder)
      message.success("Card was deleted")
    } catch (e) {
      message.error(e)
    }
  } 

  const deleteFolder = async(folderId) => {
    try {
      await axios.delete("http://localhost:5000/api/folder/" + folderId);
      getCards(currentFolder)
      setCurrentFolder("")
      message.success("Folder was deleted")
    } catch (e) {
      message.error(e)
    }
  }

  const createCard = async(card) => {
    try {
      const res = await axios.post("http://localhost:5000/api/card", {
        ...card,
        folder: currentFolder,
      });
      message.success("Card was created")
      getCards(currentFolder)
    } catch (e) {
      message.error(e);
    }
  }

  const createFolder = async(folder) => {
    try {
      await axios.post("http://localhost:5000/api/folder", folder);
      message.success("Folder was created")
      getFolders()
    } catch (e) {
      message.error(e);
    }
  }

  const getFolders = async() => {
    try {
      const res = await axios.get("http://localhost:5000/api/folder");
      setFolders(res.data)
    } catch (e) {
      message.error(e);
    }
  }

  const getCards = async(folder) => {
    const res = await axios.get("http://localhost:5000/api/card/" + folder);
    setCards(res.data)
  } 

  const openAuthModal = (type) => {
    setIsModalVisible(true)
    setActionType(type)
  }

  const getCardsFromFolder = (folderId) => {
    setCurrentFolder(folderId)
    getCards(folderId)
  }

  const logOut = () => {
    localStorage.clear()
    setUser([])
  }

  React.useEffect(() => {
    getFolders()
    if(localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [])
  return (
     <Layout className="app">
        <Sider trigger={null} collapsible collapsed={collapse}>
          <div className="logo" />
          <FolderMenu folders={folders} current={currentFolder} setCurrent={getCardsFromFolder} />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background header">
            {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapse(s => !s),
            })}
            <div className="button-row">
              <Modal 
                title={actionType} 
                visible={isModalVisible} 
                footer={null}
                onCancel={() => {setIsModalVisible(false)}}
              >
                {
                  (actionType === "SignIn" || actionType === "SignUp")
                  && (<Auth onCancel={() => {setIsModalVisible(false)}} actionType={actionType} setUser={setUser} />)
                }
                {
                  (actionType === "Create Folder")
                  && (<CreateFolder onCancel={() => {setIsModalVisible(false)}} createFolder={createFolder} />)
                }
                {
                  (actionType === "Create Card")
                  && (<CreateCard onCancel={() => {setIsModalVisible(false)}} createCard={createCard} />)
                }
              </Modal>
              {
                user?.email 
                ? (
                  <>
                    <span>{user.email}</span>
                    <Button onClick={logOut} type="primary">LogOut</Button>
                  </>
                )
                : (
                  <>
                    <Button onClick={() => openAuthModal("SignIn")}>SignIn</Button>
                    <Button onClick={() => openAuthModal("SignUp")} type="primary">SignUp</Button>
                  </>
                )
              }
            </div>
          </Header>
          <div className="action-row">
            <Button onClick={() => openAuthModal("Create Folder")} type="primary">Create folder</Button>
            <Button disabled={!currentFolder} onClick={() => openAuthModal("Create Card")} type="primary">Ceate card</Button>
            <Button disabled={!currentFolder} onClick={() => deleteFolder(currentFolder)} type="primary">Delete folder</Button>
          </div>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {
              currentFolder
              ?(<Slider deleteCard={deleteCard} cards={cards} />)
              :(<span className='not-selected'>Folder not selected</span>)
            }
          </Content>
        </Layout>
      </Layout>
  );
}

export default App;
