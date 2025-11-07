import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <UserProfile name="Goodness Onyemaechi" age={22} bio="Frontend Developer" />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
