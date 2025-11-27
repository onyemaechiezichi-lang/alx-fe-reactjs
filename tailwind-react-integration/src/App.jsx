import UserProfile from './components/UserProfile';

/**
 * The main application component for the Tailwind integration assignment.
 * It imports and renders the required UserProfile component.
 */
function App() {
  return (
    // Centering the component for better display.
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <UserProfile />
    </div>
  );
}

export default App;
