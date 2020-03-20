import React, { useState } from 'react';
import styled from 'styled-components';
import { TABS } from './constant';
import ChatList from './ChatList';

const StyledChatPopup = styled.div`
  position: fixed;
  bottom: 2px;
  right: 10px;
  display: flex;

  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  background: #fff;
  z-index: 100;
`;

const StyledTab = styled.div`
  width: 130px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #172b4d;
  font-size: 12px;
  transition: 0.4s;
  cursor: pointer;
  ${props => {
    if (props.active) {
      return `
          background: #f3f4f6;
          `;
    }
  }}

  &:hover {
    background: #f3f4f6;
  }
`;

const Chat = () => {
  const [activeTab, setActiveTab] = useState('');
  const [listOpen, setListOpen] = useState(false);

  const _handleChooseTab = value => {
    setActiveTab(value);
    if (activeTab === '') {
      setListOpen(true);
    }
  };

  return (
    <StyledChatPopup>
      <ChatList isOpen={listOpen} />
      <StyledTab
        active={activeTab === TABS.CHAT}
        onClick={() => _handleChooseTab(TABS.CHAT)}
      >
        Chat
      </StyledTab>
      <StyledTab
        active={activeTab === TABS.CONTACTS}
        onClick={() => _handleChooseTab(TABS.CONTACTS)}
      >
        Contacts
      </StyledTab>
    </StyledChatPopup>
  );
};

export default Chat;
