import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function CoverLetterInput2() {
    const navigate = useNavigate();
    const navigateToPass3 = () => navigate('/cover-letters-input3');
  return (
    <SettingTitle>
      <Container>
      <Title>합격 자소서 입력하기</Title>
        <Form>
          <Text>Step 2</Text>
          <SubTitle>지원 당시 스펙을 입력해주세요</SubTitle>
          
          <InputWrap>
            <Label>지원 회사</Label>
            <InputField type="text"/>
            <PassSearch>
            <PassSearchIcon src='./assets/passSearch.png'/>
    <PassSearchText>검색하기</PassSearchText>
    
  </PassSearch>
          </InputWrap>

          <InputWrap>
            <Label>지원 부서 및 직무</Label>
            <InputField type="text" />
            <PassSearch>
            <PassSearchIcon src='./assets/passSearch.png'/>
    <PassSearchText>검색하기</PassSearchText>
    
  </PassSearch>
          </InputWrap>
          
        </Form>
        <SubmitButton type="submit" onClick={navigateToPass3}>다음</SubmitButton>
      </Container>
    </SettingTitle>
  )
}

const SettingTitle = styled.div``;

const Text = styled.p`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 25px;
  color: #5B00EF;
  margin-top: 50px;
  margin-left: 45px;
`;

const PassSearch = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #636363;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  cursor: pointer;
`;

const PassSearchText = styled.div`
margin-left: 10px;
`;

const PassSearchIcon = styled.img`

`;

const Title = styled.div`
  font-family: SUITE;
  font-size: 1.5625rem; 
  font-weight: 600;
  margin-left: 43px; /* 왼쪽 정렬 */
  margin-top: 4rem;
  margin-bottom: 1rem;
  color: #636363;
  max-width: 80%; 
  transition: all 0.3s ease-in-out; 

  @media (max-width: 768px) {
    font-size: 1.25rem; 
    margin-top: 2rem; 
  }

  @media (max-width: 480px) {
    font-size: 1rem; 
    margin-top: 1.5rem; 
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    width: 80%; 
    padding: 4rem; 
  }
  
  @media (max-width: 768px) {
    width: 90%; 
    padding: 3rem; 
  }
  
  @media (max-width: 480px) {
    width: 95%; 
    padding: 2rem; 
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 669px;
  background: none;
  border: 3px solid #e2e2e2;
  border-radius: 0.625rem;
`;

const SubTitle = styled.div`;
  text-align: left;
  margin-left: 43px;
  margin-bottom: 42px;

  font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 37px;

color: #636363;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px; /* 변경된 부분 */
  font-family: SUITE;
  font-size: 1rem;
  font-weight: 700;
`;

const Label = styled.label`
  font-family: SUITE;
  font-size: 1.25rem;
  font-weight: 700;   
  min-width: 10rem;
  margin-left: 43px;
  color: #000;
  width: auto;
  &:after {
    content: "*";
    color: #FF0000;
  }
`;

const InputField = styled.input`
  font-family: SUITE;
  font-size: 1.25rem;
  font-weight: 700;
  width: 30rem;
  height: 1.5rem;
  margin-left: 2rem;
  margin-right: 25px;
  padding: 1rem 1.5rem;
  border: 3px solid #e2e2e2;
  border-radius: 0.625rem;
  color: #000;
  &:focus {
    border-color: #7a42f4;
  }
`;


const RadioLabel = styled.label`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-left: 2rem;
    margin-right: 5rem; // 각 라디오 버튼 사이 간격

    & input {
        appearance: none; // 기본 스타일 제거
        -webkit-appearance: none; // Safari를 위한 기본 스타일 제거
        border: 1rem solid #E2E2E2;
        border-radius: 50%; // 원형 테두리
        width: 1em; // 너비
        height: 1em; // 높이
        margin-right: 0.4em; // 텍스트와의 간격

    &:checked {
        background-color: #5B00EF; // 선택 시 보라색으로 채움
        border: 1rem solid #5B00EF; // 선택 시 보라색 테두리
        position: relative; // 가상 요소를 위한 포지셔닝 컨텍스트
      }
  
      &:checked::after {
        content: ''; // 가상 요소에는 내용이 없음
        position: absolute; // 부모 요소(input) 기준으로 절대 위치
        top: 50%; // 상위 요소의 정중앙
        left: 50%; // 상위 요소의 정중앙
        transform: translate(-50%, -50%); // 정확한 중앙에 위치
        width: 1rem; // 내부 원의 너비
        height: 1rem; // 내부 원의 높이
        border-radius: 50%; // 원형
        background: #fff; // 내부 원의 배경색은 흰색
      }
  }
  
`;

const RadioInput = ({ className, label, ...props }) => (
  <RadioLabel className={className}>
    <input type="radio" {...props} />
    {label}
  </RadioLabel>
);

const Select = styled.select`
    font-family: SUITE;
    font-size: 1rem;
    font-weight: 700;
    width: 7rem;
    padding: 1rem 1rem;
    border: 3px solid #e2e2e2;
    border-radius: 0.625rem;
    background-color: white;
    margin-right: 1rem;
    margin-left: 2rem;
`;

const SubmitButton = styled.button`
  width: 588px;
  height: 72px;
  background: #5B00EF;
  border-radius: 10px;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */
  text-align: center;
  color: #FFFFFF;
  margin-top: 108px;
  cursor: pointer;
`;