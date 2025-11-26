import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/'); // Redirect back to the main recipe list after deletion
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
