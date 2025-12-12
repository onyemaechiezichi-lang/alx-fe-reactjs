import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css'; 

function App() {
  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px', justifyContent: 'center' }}>
      <h1>Task 0: Form Handling Comparison</h1>
      <RegistrationForm />
      <FormikForm />
    </div>
  );
}

export default App;