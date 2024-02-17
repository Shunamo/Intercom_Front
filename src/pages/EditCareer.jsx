import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import languages from '../data/languages';
import certificates from '../data/certificates'; 
import schools from '../data/schools'; // 학교 데이터
import majors from '../data/majors'; // 학과 데이터
import jobSkills from '../data/skillsData';
import axios from 'axios';
import config from '../path/config';

const EditCareerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.125rem; 
  padding-bottom: 3.125rem; 
  width: 100%;
  font-family: SUITE;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 1.5625rem;
  color: #636363;
  align-self: flex-start;
  margin-left: calc(50% - 37rem); 
`;

const EditContainer = styled.div`
  width: 75rem; 
  height: auto;
  background-color: #ffffff;
  border-radius: 0.625rem; 
  padding-top: 0.625rem;
  padding-bottom: 5rem; 
  border: 0.1875rem solid #E2E2E2; 
`;

const LanguageTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; // 또는 필요에 따라 조정
  margin-bottom: -10px;
`;


const LanguageTitle = styled.h3`
  font-weight: 700;
  font-size: 1.875rem;
  color: #636363;
  margin-left: 3.4375rem;
  margin-top: 3.125rem; 
  margin-bottom: 0.625rem; 
`;

const InputFieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3.4375rem;
  margin-top: 1.75rem;
`;

const LanguageName = styled.input.attrs({ readOnly: true })`
  width: 221px;
  height: 35px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.25rem;
  color: #636363;
  background: #F7F7F7;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }

`;

const SearchButtonContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 13px;
  margin-right: 25px;
`;

const SearchIcon = styled.img`
  height: 24px; 
  margin-right: 0.625rem;
`;

const SearchButton = styled.span`
  font-family: SUITE;
  font-size: 20px;
  color: #636363;
  font-weight: 700;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const LanguageScore = styled.input`
  width: 221px;
  height: 35px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.25rem;
  color: #636363;

  &::placeholder {
    color: #BDBDBD;
  }

  &:focus {
    outline: none;
  }

`;

const AddButton = styled.img`
  width: 20px; // 버튼의 크기 조절 필요
  height: 20px;
  cursor: pointer;
  margin-left: 20px;
`;


const ModalOverlay = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  z-index: 1000; // Ensure it's above everything else
`;

const ModalContainer = styled.div`
  width: 834px;
  height: 581px;
  background: #FFF;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1.5px solid #A1A1A1;
`;

const CloseButton = styled.img`
  align-self: flex-end;
  cursor: pointer;
  height: 16px; // Adjust as needed
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; // Adjust as needed for spacing
`;

const SearchInput = styled.input`
  width: 556px;
  height: 35px;
  padding: 10px;
  margin-right: 15px;
  border: 2px solid #A1A1A1;
  border-radius: 10px;
  font-family: SUITE;
  font-size: 20px;
  font-weight: 600;
  color: #636363;

  &::placeholder {
    color: #BDBDBD;
  }

  &:focus {
    outline: none;
  }
`;


const ResultsContainer = styled.div`
  width: 556px;
  padding: 10px;
  height: 441px;
  overflow-y: auto; // 결과가 많을 경우 스크롤바 생성
  border: 2px solid #D1D1D1;
  border-radius: 10px;
  background-color: #FFF;
  margin-left: 49px;
  margin-top: 1px;
  font-family: SUITE;
  font-size: 17px;
  font-weight: 600;
  color: #636363;
`;

const ResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #E2E2E2; // 디바이더 추가

  &:last-child {
    border-bottom: none; // 마지막 항목은 구분선 제거
  }
`;

const HighlightText = styled.span`
  color: #5B00EF; 
`;

const ResultInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-family: SUITE;
  font-size: 0.875rem;
  color: #9E9E9E;
  margin-top: 5px;
`;

const SearchResultTitle = styled.span`
  font-size: 1rem;
`;

const ResultCount = styled.span`
  background-color: #F7F7F7;
  font-size: 0.875rem;
  color: #9E9E9E;
  margin-left: 1px;
`;

const QualificationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;

  &:hover {
    background-color: #F7F7F7;
    cursor: pointer;
  }
`;

const DeleteButton = styled.img`
  cursor: pointer;
  margin-top: 3.125rem; 
  margin-bottom: 0.625rem; 
  margin-right: 3.4375rem;
  height: 16px;
  width: 16px;
`;

const SectionDivider = styled.div`
  height: 2px;
  background-color: #E2E2E2;
  width: 92%; 
  margin: 40px auto; 
  display: ${({ last }) => (last ? 'none' : 'block')}; 
`;

const CertificateSectionContainer = styled.div`
margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;

const LanguageSectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;

const EducationSectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;

const ActivitySectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;

const SkillSectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격 조정
  display: flex; // 플렉스 컨테이너로 변경
  flex-wrap: wrap; // 내용이 넘치면 다음 줄로
  align-items: center; // 세로 중앙 정렬
  gap: 5px; // 간격 추가
`;

const LinkSectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;



const CertificateName = styled.input.attrs({ readOnly: true })`
  width: 221px;
  height: 35px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.25rem;
  color: #636363;
  background: #F7F7F7;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }

`;

const GradeLabel = styled.span`
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  color: #636363;
  margin-right: 10px; // Adjust spacing as needed
`;

const GradeInput = styled.input`
  width: 110px;
  height: 35px;
  margin-left: 30px;
  margin-right: 10px;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;

  &::placeholder {
    color: #BDBDBD;
  }

  &:focus {
    outline: none;
  }

  
`;

const GradeSelect = styled.select`
  width: 130px;
  height: 60px;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ defaultValue }) => defaultValue ? "#636363" : "#BDBDBD"};
  background: #FFF;
  cursor: pointer;
  margin-left: 10px;
  appearance: none; /* Remove default styles, important for custom arrow */
  -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url('/assets/Polygon2.png');
  backgroung-width: 10px;
  background-position: right 10px center; /* Adjust arrow position */
  background-repeat: no-repeat;
  background-size: 13px; /* Adjust the size of the arrow image */

  &:focus {
    outline: none;
  }

  option[disabled] {
    color: #BDBDBD; /* Color for your placeholder option */
  }
`;

const Slash = styled.span`
  font-size: 30px;
  color: #A1A1A1;
`;

const GraduateLabel = styled.span`
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  color: #636363;
  margin-left: 60px;
`;

const GraduateSelect = styled.select`
  width: 130px;
  height: 60px;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ defaultValue }) => defaultValue ? "#636363" : "#BDBDBD"};
  background: #FFF;
  cursor: pointer;
  margin-left: 40px;
  appearance: none; /* Remove default styles, important for custom arrow */
  -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url('/assets/Polygon2.png');
  backgroung-width: 10px;
  background-position: right 10px center; /* Adjust arrow position */
  background-repeat: no-repeat;
  background-size: 13px; /* Adjust the size of the arrow image */

  &:focus {
    outline: none;
  }

  option[disabled] {
    color: #BDBDBD; /* Color for your placeholder option */
  }
`;

const ActivityDescription = styled.input`
  width: 700px;
  height: 50px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }

`;

const Count = styled.span`
  font-family: SUITE;
  font-weight: 700;
  font-size: 17px;
  color: #636363;
  margin-left: 10px;
`;

const SkillBox = styled.div`
  width: auto;
  padding-right: 15px;
  padding-left: 15px;
  height: 40px;
  margin: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ selected }) => (selected ? '1.5px solid #5B00EF' : '1.5px solid #A1A1A1')}; // 선택 시 border 제거
  border-radius: 4px;
  font-family: SUITE;
  font-size: 1rem;
  color: ${({ selected }) => (selected ? '#FFFFFF' : '#636363')}; // 글씨 색상 변경
  background: ${({ selected }) => (selected ? '#5B00EF' : '#FFF')}; // 배경 색상 변경
  cursor: pointer;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#5B00EF' : '#f0f0f0')}; // 선택된 상태에서는 배경 색상 유지
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; // 선택된 스킬들을 위쪽으로 정렬
  gap: 5px;
  padding: 10px;
  max-height: 441px;
  overflow-y: auto;
`;

const SkillsContainer2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; // 선택된 스킬들을 위쪽으로 정렬
  gap: 5px;
  padding: 10px;
  max-height: 441px;
  overflow-y: auto;
  margin-left: 30px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SelectedSkill = styled.div`
  width: 148px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  font-family: SUITE;
  font-size: 20px;
  font-weight: 600;
  color: #636363;
  background: #FFF;
  border: 2px solid #A1A1A1;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
`;



const AddButton2 = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  align-self: center; // 추가 버튼을 위로 정렬
  order: 1; // Ensures the Add button comes after the selected skills
  margin-left: 10px; 
`;

const LinkInput = styled.input`
  width: 700px;
  height: 50px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;
  padding-top: 30px;
`;


const SaveButton = styled.button`
  width: 200px;
  height: 64px;
  background-color: #5B00EF; 
  color: white;
  border: none;
  border-radius: 8px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #4a00cf; 
  }
`;

const HyperLinkContainer = styled.div`
  display: block; // 각 링크를 새로운 줄에 표시합니다.
  margin-bottom: 10px; // 링크 사이에 약간의 공간을 추가합니다.
  margin-left: 55px;
  margin-top: 20px;
`;


const HyperLink = styled.a`
  font-family: SUITE;
  font-size: 20px;
`;

const SkillsContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
  margin-top: 20px;
`;

const AddSpecButton = styled.button`
  display: flex;
  margin-top: 20px;
  align-items: center; // 버튼 내부의 텍스트와 아이콘이 같은 줄에 정렬되도록 합니다.
  justify-content: center; // 내용물을 가운데 정렬합니다.
  padding: 10px 20px;
  cursor: pointer;
  background-color: transparent;
  color: #636363; // 버튼의 텍스트 색상을 조정합니다.
  border: none;
  font-family: SUITE;
  font-size: 1.1rem;
  font-weight: 600;
  position: absolute; // 절대 위치 사용
  right: 0; // 우측 정렬
  top: 0; // 상단 정렬
  margin-right: calc((100% - 70rem) / 2 - 40px); 
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SpecModalOverlay = styled(ModalOverlay)`
background-color: rgba(0, 0, 0, 0.0);
  align-items: flex-start; // 모달이 상단에 위치하도록 조정
  padding-top: 250px; // '스펙 추가하기' 버튼 아래에 모달이 위치하도록 패딩 추가
  padding-left: 860px; // '스펙 추가하기' 버튼 아래에 모달이 위치하도록 패딩 추가
`;

const SpecModalContainer = styled(ModalContainer)`
  width: 300px;
  height: 457px; // 높이를 내용에 맞게 조정
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; // 내부 요소를 중앙에 위치시킴
`;

const SpecOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; // 컨테이너의 폭을 모달 크기에 맞춤
  align-items: flex-start; // 옵션을 중앙에 위치시킴
  margin-top: 50px;
  margin-left: 190px;
`;

const SpecOption = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-family: SUITE;
  font-size: 20px;
  font-weight: 600;
  color: #636363;
`;

const SpecCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

const SpecModalButton = styled(SaveButton)`
  width: 174px;
  height: 45px;
  margin-top: 20px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between; // 양쪽 끝으로 정렬
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative; // 위치 기준을 설정합니다.
`;

const AddButton3 = styled.img`
  width: 20px; // 버튼의 크기 조절 필요
  height: 20px;
  cursor: pointer;
  margin-left: 20px;
`;


const EditCareer = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [languageInputs, setLanguageInputs] = useState([{ name: "", score: "" }]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [certificateInputs, setCertificateInputs] = useState([{ name: "" }]); // 자격증 입력 상태
  const [searchMode, setSearchMode] = useState('languages'); // 'languages' 또는 'certificates'
  const [searchTermSchool, setSearchTermSchool] = useState('');
  const [searchTermMajor, setSearchTermMajor] = useState('');
  const [schoolInputs, setSchoolInputs] = useState([{ name: "" }]);
  const [majorInputs, setMajorInputs] = useState([{ name: "" }]);
  const [showEducationSection, setShowEducationSection] = useState(true);
  const [grade, setGrade] = useState("");
  const [graduate, setGraduate] = useState("");
  const [activityDescription, setActivityDescription] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isSkillModalVisible, setSkillModalVisible] = useState(false);
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [skillSearchResults, setSkillSearchResults] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState('');
  const [isSpecModalVisible, setSpecModalVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState({
    어학: true, // 기본적으로 표시
    자격증: true, // 기본적으로 표시
    학력: true, // 기본적으로 표시
    대외활동: true, // 기본적으로 숨김
    보유스킬: true, // 기본적으로 숨김
    링크: true, // 기본적으로 숨김
  });

  const handleSave = async () => {
    // 서버에 전송할 데이터 객체 구성
    const payload = {
      english: languageInputs.map(input => input.name).join(", "),
      score: languageInputs.map(input => input.score).join(", "),
      certification: certificateInputs.map(input => input.name).join(", "),
      university: schoolInputs[0].name,
      major: majorInputs[0].name,
      gpa: grade + "/" + graduate, // 예제에 따라 GPA와 졸업여부를 결합
      activity: activityDescription, // 이 부분은 문자열로 변경됨
      skill: selectedSkills.join(", "),
      link: links.join(", "),
    };
  
    try {
      const response = await axios.post(`${config.API_URL}/careers`, payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // 필요한 인증 헤더가 있다면 추가
          'Content-Type': 'application/json', // JSON 형태로 데이터를 전송한다고 서버에 알림
        },
      });
      console.log("서버 응답:", response.data);
      alert('저장되었습니다.'); // 성공 메시지
    } catch (error) {
      console.error("서버로 데이터 저장 중 오류 발생:", error);
      alert('저장에 실패했습니다.'); // 오류 메시지
    }
  };
  
  // 스펙 모달에서 체크박스 선택을 처리하는 함수
const handleSpecCheckboxChange = (specName) => {
  setSectionsVisible(prevSections => ({
    ...prevSections,
    [specName]: !prevSections[specName]
  }));
};

const handleDeleteSection = (sectionName) => {
  setSectionsVisible(prevSpecs => ({
    ...prevSpecs,
    [sectionName]: false
  }));
};

// 각 섹션을 조건부로 렌더링하는 함수
const renderSection = (sectionName) => {
  
  switch (sectionName) {
    case '어학':
      if (!sectionsVisible['어학']) return null;
      return (
        <LanguageSectionContainer>
            <LanguageTitleContainer>
              <LanguageTitle>어학</LanguageTitle>
              <DeleteButton src="./assets/editclose.png" onClick={() => handleDeleteSection('어학')}/>
            </LanguageTitleContainer>
            {languageInputs.map((input, index) => (
              <InputFieldContainer key={index}>
                <LanguageName
                  placeholder="어학 종류"
                  value={input.name}
                  readOnly={true}
                />
                <SearchButtonContainer onClick={() => handleSearchClick(index, 'languages')}>
                <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
                <SearchButton>검색하기</SearchButton>
                </SearchButtonContainer>
                <LanguageScore
                  value={input.score}
                  onChange={(e) => updateLanguageScore(index, e.target.value)}
                  placeholder="취득 점수"
                  onKeyDown={(e) => handleScoreEnter(e, index)}
                />
                {index === languageInputs.length - 1 && (
                  <AddButton src="./assets/addbtn.png" onClick={addLanguageInput} alt="Add" />
                )}
              </InputFieldContainer>
            ))}
            <SectionDivider />
          </LanguageSectionContainer>
      );
    case '자격증':
      if (!sectionsVisible['자격증']) return null;
      return (
        <CertificateSectionContainer>
            <LanguageTitleContainer>
              <LanguageTitle>자격증</LanguageTitle>
              <DeleteButton src="./assets/editclose.png" onClick={() => handleDeleteSection('자격증')} />
            </LanguageTitleContainer>
            {certificateInputs.map((input, index) => (
            <InputFieldContainer key={index}>
              <CertificateName
                placeholder="자격증 종류"
                value={input.name}
                readOnly={true}
            />
            <SearchButtonContainer onClick={() => handleSearchClick(index, 'certificates')}>
            <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
            <SearchButton>검색하기</SearchButton>
            </SearchButtonContainer>
            {index === certificateInputs.length - 1 && (
                  <AddButton src="./assets/addbtn.png" onClick={addCertificateInput} alt="Add" />
                )}
            </InputFieldContainer>
            ))}
            <SectionDivider />
          </CertificateSectionContainer>
      );
    case '학력':
      if (!sectionsVisible['학력']) return null;
      return (
        <EducationSectionContainer>
          <LanguageTitleContainer>
            <LanguageTitle>학력</LanguageTitle>
            <DeleteButton 
            src="./assets/editclose.png" 
            onClick={() => handleDeleteSection('학력')}
          />
          </LanguageTitleContainer>
          <InputFieldContainer style={{ justifyContent: 'start' }}>
            <LanguageName
              placeholder="학교명"
              value={schoolInputs[0].name}
              readOnly={true}
            />
            <SearchButtonContainer onClick={handleSearchSchoolClick}>
              <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
              <SearchButton>검색하기</SearchButton>
            </SearchButtonContainer>
            <LanguageName
              placeholder="학과명"
              value={majorInputs[0].name}
              readOnly={true}
            />
            <SearchButtonContainer onClick={handleSearchMajorClick}>
              <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
              <SearchButton>검색하기</SearchButton>
            </SearchButtonContainer>
          </InputFieldContainer>
          <InputFieldContainer style={{ justifyContent: 'start', alignItems: 'center' }}>
          <GradeLabel>학점</GradeLabel>
          <GradeInput
            type="text"
            placeholder="학점"
          />
          <Slash>/</Slash>
          <GradeSelect
            defaultValue={grade}
            onChange={handleGradeChange}
          >
            <option value="" disabled selected>기준 학점</option>
            <option value="4.0">4.0</option>
            <option value="4.3">4.3</option>
            <option value="4.5">4.5</option>
            <option value="5.0">5.0</option>
            <option value="7.0">7.0</option>
            <option value="100">100</option>
          </GradeSelect>
          <GraduateLabel>졸업여부</GraduateLabel>
          <GraduateSelect
            defaultValue={graduate}
            onChange={handleGraduateChange}
          >
            <option value="" disabled selected>졸업 여부</option>
            <option value="graudate">졸업</option>
            <option value="attending">재학중</option>
            <option value="absence">휴학중</option>
            <option value="completion">수료</option>
            <option value="dropout">중퇴</option>
            <option value="quit">자퇴</option>
          </GraduateSelect>
        </InputFieldContainer>
          <SectionDivider />
        </EducationSectionContainer>
      );
    case '대외활동':
      if (!sectionsVisible['대외활동']) return null;
      return (
        <ActivitySectionContainer>
        <LanguageTitleContainer>
          <LanguageTitle>대외 활동</LanguageTitle>
          <DeleteButton src="./assets/editclose.png" onClick={() => handleDeleteSection('대외활동')}/>
        </LanguageTitleContainer>
        <InputFieldContainer style={{ justifyContent: 'start' }}>
          <ActivityDescription
            placeholder="활동 설명 입력하기"
            value={activityDescription}
            onChange={handleActivityDescriptionChange}
          />
          <Count>{`(${charCount}/50자)`}</Count>
        </InputFieldContainer>
        <SectionDivider />
      </ActivitySectionContainer>
      );
    case '보유스킬':
      if (!sectionsVisible['보유스킬']) return null;
      return (
        <SkillSectionContainer>
        <LanguageTitleContainer>
          <LanguageTitle>보유 스킬</LanguageTitle>
          <DeleteButton src="./assets/editclose.png" />
        </LanguageTitleContainer>
        <SkillsContainerWrapper>
            {renderSkillsSection()}
            <SectionDivider />
          </SkillsContainerWrapper>
       

      </SkillSectionContainer>

      );
    case '링크':
      if (!sectionsVisible['링크']) return null;
      return (
        
        <LinkSectionContainer>
        <LanguageTitleContainer>
          <LanguageTitle>링크</LanguageTitle>
          <DeleteButton src="./assets/editclose.png" onClick={() => handleDeleteSection('링크')} />
        </LanguageTitleContainer>
        <InputFieldContainer>
            <LinkInput
              placeholder="링크 입력하기"
              value={linkInput}
              onChange={handleLinkInput}
              onKeyDown={handleLinkSubmit}
            />
           
            
          </InputFieldContainer>
          {links.map((link, index) => (
              <HyperLinkContainer>
              <HyperLink key={index} href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </HyperLink>
              </HyperLinkContainer>
            ))}
        <InputFieldContainer>
        </InputFieldContainer>
       

      </LinkSectionContainer>
      );
    default:
      return null;
  }
};



  const toggleSpecModal = () => {
    setSpecModalVisible(!isSpecModalVisible);
  };

  const renderSpecModal = () => {
    if (!isSpecModalVisible) return null;
  
    return (
      <SpecModalOverlay show={isSpecModalVisible}>
        <SpecModalContainer>
          <SpecOptionsContainer>
            {Object.keys(sectionsVisible).map(specName => (
              <SpecOption key={specName}>
                <SpecCheckbox
                  checked={sectionsVisible[specName]}
                  onChange={() => handleSpecCheckboxChange(specName)}
                />
                <label>{specName}</label>
              </SpecOption>
            ))}
          </SpecOptionsContainer>
          <SpecModalButton onClick={toggleSpecModal}>완료</SpecModalButton>
        </SpecModalContainer>
      </SpecModalOverlay>
    );
  };
  
  
  
  const handleAddSkillClick = () => {
    setSkillModalVisible(true);
  };
  
  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill)); // 스킬이 이미 선택된 경우 제거
    } else {
      setSelectedSkills([...selectedSkills, skill]); // 스킬이 선택되지 않은 경우 추가
    }
  };
  
  useEffect(() => {
    if (skillSearchTerm) {
      const skills = jobSkills[skillSearchTerm.toLowerCase()] || [];
      setSkillSearchResults(skills);
    } else {
      setSkillSearchResults([]);
    }
  }, [skillSearchTerm]);

  const renderSkillsSection = () => {
    return (
      <>
        <SkillsContainer2>
          {selectedSkills.map((skill, index) => (
            <SelectedSkill key={index} onClick={() => handleSkillSelect(skill)}>
              {skill}
            </SelectedSkill>
          ))}
        <AddButton2 src="./assets/addbtn.png" onClick={handleAddSkillClick} alt="Add Skill" />
        </SkillsContainer2>
      </>
    );
  };
  
  
  const renderSkillBoxes = () => {
    return (
      <SkillsContainer>
        {skillSearchResults.map((skill, index) => (
          <SkillBox
            key={index}
            onClick={() => handleSkillSelect(skill)}
            selected={selectedSkills.includes(skill)}
          >
            {skill}
          </SkillBox>
        ))}
      </SkillsContainer>
    );
  };
  
  


  const handleActivityDescriptionChange = (event) => {
    const input = event.target.value;
    const nonSpaceCharCount = input.replace(/\s/g, '').length;
  
    if (nonSpaceCharCount <= 50) {
      setActivityDescription(input);
      setCharCount(nonSpaceCharCount);
    }
  };
  
    // onChange 핸들러
    const handleGradeChange = (e) => {
      setGrade(e.target.value);
    };

    const handleGraduateChange = (e) => {
      setGraduate(e.target.value);
    };

   const handleSearchClick = (index, mode) => {
    setCurrentInputIndex(index);
    setSearchMode(mode);
  
    // 모드에 따라 적절한 검색어 상태를 설정합니다.
    if (mode === 'schools') {
      setSearchTerm(searchTermSchool);
    } else if (mode === 'majors') {
      setSearchTerm(searchTermMajor);
    } else {
      setSearchTerm('');
    }
  
    setModalVisible(true);
  };
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
    
    // 모드에 따라 추가적인 상태 업데이트
    if (searchMode === 'schools') {
      setSearchTermSchool(newSearchTerm);
    } else if (searchMode === 'majors') {
      setSearchTermMajor(newSearchTerm);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const addLanguageInput = () => {
    setLanguageInputs([...languageInputs, { name: "", score: "" }]);
  };

  const updateLanguageName = (index, name) => {
    const newInputs = [...languageInputs];
    newInputs[index].name = name;
    setLanguageInputs(newInputs);
  };

  const updateLanguageScore = (index, score) => {
    const newInputs = [...languageInputs];
    newInputs[index].score = score;
    setLanguageInputs(newInputs);
  };

  const handleScoreEnter = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Score input completed for index:', index);
    }
  };

  const handleLinkInput = (e) => {
    setLinkInput(e.target.value);
  };

  const handleLinkSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setLinks([...links, linkInput]);
      setLinkInput(''); // Reset input field
    }
  };

  

  useEffect(() => {
    let results = [];
    // 검색 모드에 따라 결과 설정
    switch (searchMode) {
      case 'languages':
        results = languages.filter(lang =>
          lang.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case 'certificates':
        results = certificates.filter(cert =>
          cert.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case 'schools':
        results = schools.filter(school =>
          school.name.toLowerCase().includes(searchTermSchool.toLowerCase())
        );
        break;
      case 'majors':
        results = majors.filter(major =>
          major.name.toLowerCase().includes(searchTermMajor.toLowerCase())
        );
        break;
      default:
        break;
    }
    setSearchResults(results);
  }, [searchTerm, searchTermSchool, searchTermMajor, searchMode]);


  const renderSearchResults = () => {
    const currentSearchTerm = searchMode === 'schools' ? searchTermSchool :
    searchMode === 'majors' ? searchTermMajor : searchTerm;
  
    return searchResults.map((item, index) => (
      <ResultItem key={index} onClick={() => selectQualification(item.name)}>
        <QualificationContainer>
          <span>{
            item.name.split(new RegExp(`(${currentSearchTerm})`, 'gi'))
              .map((part, index) => part.toLowerCase() === currentSearchTerm.toLowerCase() ? 
                <HighlightText key={index}>{part}</HighlightText> : part)
          }</span>
          {item.field && <span>{item.field}</span>}
        </QualificationContainer>
      </ResultItem>
    ));
  };
  

  const selectQualification = (name) => {
    switch (searchMode) {
        case 'languages':
            updateLanguageName(currentInputIndex, name); // 어학 이름 업데이트
            break;
        case 'certificates':
            updateCertificateName(currentInputIndex, name); // 자격증 이름 업데이트
            break;
        case 'schools':
            // 학교명 선택 로직
            const newSchoolInputs = [...schoolInputs];
            newSchoolInputs[currentInputIndex].name = name;
            setSchoolInputs(newSchoolInputs);
            break;
        case 'majors':
            // 학과명 선택 로직
            const newMajorInputs = [...majorInputs];
            newMajorInputs[currentInputIndex].name = name;
            setMajorInputs(newMajorInputs);
            break;
        default:
            break;
    }
    setModalVisible(false);
};

  const addCertificateInput = () => {
    setCertificateInputs([...certificateInputs, { name: "" }]);
  };

  const updateCertificateName = (index, name) => {
    const newInputs = [...certificateInputs];
    newInputs[index].name = name;
    setCertificateInputs(newInputs);
  };


const handleSearchSchoolClick = () => {
  setCurrentInputIndex(0); // 현재 입력 필드 인덱스 설정
  setSearchMode('schools');
  setSearchTerm(searchTermSchool); // 현재 학교명 검색어로 설정
  setModalVisible(true); // 모달 표시
};

// 학과명 검색 버튼 클릭 시 호출될 함수
const handleSearchMajorClick = () => {
  setCurrentInputIndex(0); // 현재 입력 필드 인덱스 설정
  setSearchMode('majors');
  setSearchTerm(searchTermMajor); // 현재 학과명 검색어로 설정
  setModalVisible(true); // 모달 표시
};


  return (
    <>
       <EditCareerPage>
       <TitleContainer>
        <Title>내 커리어</Title>
        <AddSpecButton onClick={toggleSpecModal}>
          스펙 추가하기
          <AddButton3 src="./assets/addbtn.png" alt="Add" onClick={toggleSpecModal}/>
        </AddSpecButton>
        {renderSpecModal()} 
      </TitleContainer>
      <EditContainer>
      {renderSection('어학')}
      {renderSection('자격증')}
      {renderSection('학력')}
      {renderSection('대외활동')}
      {renderSection('보유스킬')}
      {renderSection('링크')}

        
      {isSkillModalVisible && (
  <ModalOverlay show={isSkillModalVisible}>
    <ModalContainer>
      <CloseButton src="./assets/closebtn.png" alt="Close" onClick={() => setSkillModalVisible(false)} />
      <SearchSection>
        <SearchInput
          placeholder="직무를 검색해보세요 ex) 개발자"
          value={skillSearchTerm}
          onChange={(e) => setSkillSearchTerm(e.target.value)}
        />
        <SearchButtonContainer onClick={handleSearchClick}>
          <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
          <SearchButton>검색하기</SearchButton>
        </SearchButtonContainer>
      </SearchSection>
      {/* 사용자가 검색어를 입력했을 때만 결과 컨테이너를 렌더링 */}
      {skillSearchTerm && (
        <ResultsContainer>
          {renderSkillBoxes()}
        </ResultsContainer>
      )}
    </ModalContainer>
  </ModalOverlay>
)}


          
      </EditContainer>

      <SaveButtonContainer>
          <SaveButton onClick={handleSave}>
            저장하기
          </SaveButton>
      </SaveButtonContainer>

    </EditCareerPage>

      <ModalOverlay show={isModalVisible}>
        <ModalContainer>
          <CloseButton src="./assets/closebtn.png"  alt="Close" onClick={handleCloseModal} />
          <SearchSection>
            <SearchInput 
              placeholder={
                searchMode === 'certificates' ? "자격증을 검색해보세요 ex) 정보처리기사" :
                searchMode === 'languages' ? "어학 자격증을 검색해보세요 ex) TOEFL" :
                searchMode === 'schools' ? "학교를 검색해보세요 ex) 서울대학교" :
                searchMode === 'majors' ? "학과를 검색해보세요 ex) 컴퓨터공학" :
                "검색"
              } 
              value={searchTerm} 
              onChange={handleInputChange}
            />

              <SearchButtonContainer onClick={handleSearchClick}>
            <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
            <SearchButton>검색하기</SearchButton>
          </SearchButtonContainer>
          </SearchSection>
          {searchTerm && searchResults.length > 0 && (
            <>
              <ResultsContainer>
              <ResultInfo>
                <SearchResultTitle>검색결과</SearchResultTitle>
                <ResultCount>({searchResults.length})</ResultCount>
              </ResultInfo>
                {renderSearchResults()} 
              </ResultsContainer>
            </>
          )}
        </ModalContainer>
      </ModalOverlay>

  

    </>

  );
};

export default EditCareer;
