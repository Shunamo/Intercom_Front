import React from 'react';
import { AuthProvider } from './pages/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; 
import Home from './pages/Home'; 
import TalkTalk from './pages/TalkTalk';
import PostPage from './pages/PostPage';
import Posting from './pages/Posting';
import SearchResults from './pages/SearchResults';
import SignUp from './pages/SignUp'; 
import Join from './pages/join';
import SignUp2 from './pages/SignUp2';
import SignUp3 from './pages/SignUp3';
import SignUp4 from './pages/SignUp4'; 
import OnBoarding1 from './pages/OnBoarding1'; 
import OnBoarding2 from './pages/OnBoarding2'; 
import FindingEmail from './pages/FindingEmail'; 
import FindedEmail from './pages/FindedEmail'; 
import UnfindedEmail from './pages/UnfindedEmail'; 
import SettingsPage from './pages/SettingsPage';
import ProfileEdit from './pages/ProfileEdit';
import Deactivate0 from './pages/Deactivate0';
import Deactivate1 from './pages/Deactivate1';
import Deactivate2 from './pages/Deactivate2';
import Deactivate3 from './pages/Deactivate3';
import Deactivate4 from './pages/Deactivate4';
import Deactivate5 from './pages/Deactivate5';
import DeactivatePDF from './pages/DeactivatePDF';
import MyCareer from './pages/MyCareer';
import WrittenContent from './pages/WrittenContent';
import Scrap from './pages/Scrap';
import CoverLetterInput from './pages/CoverLetterInput';
import CoverLetterInput2 from './pages/CoverLetterInput2';
import CoverLetterHome from './pages/CoverLetterHome';
import CoverLetterInput3 from './pages/CoverLetterInput3';
import CoverLetterResult from './pages/CoverLetterResult';
import InterviewHome from './pages/InterviewHome';
import InterviewResult from './pages/InterviewResult';
import InterviewInput1 from './pages/InterviewInput1';
import InterviewInput2 from './pages/InterviewInput2';
import InterviewInput3 from './pages/InterviewInput3';
import EditCareer from './pages/EditCareer';
import FindingPassword from './pages/FindingPassword';
import SettingPassword from './pages/SettingPassword';
import PostSuccessPage from './pages/PostSuccessPage';
import TypeTestHome from './typetestpage/TypeTestHome';
import JobDetail from './pages/JobDetail'


function App() {
  return (
    <Router>
      <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/talktalk" element={<TalkTalk />} />
          <Route path="/talks/:postId" element={<PostPage />} />
          <Route path ="/posting" element={<Posting/>} />  
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/join" element={<Join />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/signup3" element={<SignUp3 />} /> 
          <Route path="/signup4" element={<SignUp4 />} />  
          <Route path='/settings' element={<SettingsPage />} />
          <Route path="/onboarding1" element={<OnBoarding1 />} /> 
          <Route path="/onboarding2" element={<OnBoarding2 />} />  
          <Route path="/findingemail" element={<FindingEmail />} /> 
          <Route path="/findedemail" element={<FindedEmail />} />  
          <Route path="/unfindedemail" element={<UnfindedEmail />} /> 
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/deactivate-account0" element={<Deactivate0 />} />
          <Route path="/deactivate-account1" element={<Deactivate1 />} />
          <Route path="/deactivate-account2" element={<Deactivate2 />} />
          <Route path="/deactivate-account3" element={<Deactivate3 />} />
          <Route path="/deactivate-account4" element={<Deactivate4 />} />
          <Route path="/deactivate-account5" element={<Deactivate5 />} />
          <Route path="/deactivate-downloadPDF" element={<DeactivatePDF />} />
          <Route path="/findedemail" element={<FindedEmail />} /> 
          <Route path="/unfindedemail" element={<UnfindedEmail />} />
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/mycareer" element={<MyCareer/>}/>
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/written-content" element={<WrittenContent />} />
          <Route path="/scrap" element={<Scrap />} />
          <Route path="/mycareer-edit" element={<EditCareer />} />
          <Route path='/job/:jobId' element={<JobDetail />} />

          <Route path="/cover-letters" element={<CoverLetterInput />} />
          <Route path="/cover-letters-home" element={<CoverLetterHome />} />
          <Route path="/cover-letters-input2" element={<CoverLetterInput2 />} />
          <Route path="/cover-letters-input3" element={<CoverLetterInput3 />} />
          <Route path="/cover-letters-result" element={<CoverLetterResult />} />

          <Route path="/interviews" element={<InterviewHome />} />
          <Route path="/interviews-result" element={<InterviewResult />} />
          <Route path="/interviews-input1" element={<InterviewInput1 />} />
          <Route path="/interviews-input2" element={<InterviewInput2 />} />
          <Route path="/interviews-input3" element={<InterviewInput3 />} />

          <Route path="/type-test-home" element={<TypeTestHome />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;