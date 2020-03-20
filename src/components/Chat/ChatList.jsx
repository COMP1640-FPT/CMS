import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const animation = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const animationContent = keyframes`
  0% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const StyledChatListWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  overflow: hidden;
  top: -500px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #fff;
  left: 0;
  transform-origin: 50% 100%;
  transform: scaleY(0);
  ${props => {
    if (props.isOpen) {
      return css`
        animation: ${animation} 0.5s ease-in-out 0s both;
      `;
    }
  }}
`;

const StyledContent = styled.div`
  ${props => {
    if (props.isOpen) {
      return css`
        animation: ${animationContent} 0.5s ease-in-out 0s both;
      `;
    }
  }}
`;

const ChatList = ({ isOpen }) => {
  return (
    <StyledChatListWrapper isOpen={isOpen}>
      <StyledContent isOpen={isOpen}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum velit
        incidunt nisi harum nobis dicta aspernatur vel similique hic id
        voluptatem error doloribus explicabo earum, inventore iure quas beatae.
        Repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Illum velit incidunt nisi harum nobis dicta aspernatur vel similique hic
        id voluptatem error doloribus explicabo earum, inventore iure quas
        beatae. Repellendus.
      </StyledContent>
    </StyledChatListWrapper>
  );
};

export default ChatList;
