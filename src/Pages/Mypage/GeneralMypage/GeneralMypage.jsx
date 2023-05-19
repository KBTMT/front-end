import React from 'react';
import Profile from '../../../Componenets/Profile/Profile'
import GeneralMyInfo from '../../../Componenets/MyInfo/GeneralMyInfo/GeneralMyInfo'
import styled from 'styled-components';


// const GeneralMypage = () => {
//     return (
//         <div>
//             <h2>
//                 🤷‍♂️😉😎🤷‍♀️
//             </h2>
//             <Profile />
//             <GeneralMyInfo />
//         </div>
//     );
// };

// export default GeneralMypage;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LeftContainer = styled.div`
  flex: 0 0 40%;
`;

const RightContainer = styled.div`
  flex: 0 0 55%;
`;

const GeneralMypage = () => {
  return (
    <Container>
      <LeftContainer>
        <Profile />
      </LeftContainer>
      <RightContainer>
        <GeneralMyInfo />
      </RightContainer>
    </Container>
  );
};

export default GeneralMypage;
