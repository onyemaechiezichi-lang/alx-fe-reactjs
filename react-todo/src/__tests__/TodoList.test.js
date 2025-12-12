// react-todo/src/__tests__/TodoList.test.js - COMPLETE TEST SCRIPT

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList'; // Assuming standard path

// Mock Date.now for predictable IDs when adding new tasks
const mockDate = Date.now;
Date.now = jest.fn(() => 123456789);

describe('TodoList Component', () => {

  // Test 1: Initial Render Test
  test('renders the component and initial todos', () => {
    render(<TodoList />);
    
    // Check if the title is present
    expect(screen.getByText('React Todo List')).toBeInTheDocument();
    
    // Check if both initial todos are rendered
    expect(screen.getByText(/Initial Task 1: Learn Jest/i)).toBeInTheDocument();
    expect(screen.getByText(/Initial Task 2: Write tests/i)).toBeInTheDocument();
    
    // Check completion status for one initial todo
    const completedTodo = screen.getByText(/Initial Task 2: Write tests/i);
    expect(completedTodo.closest('li')).toHaveClass('line-through');
  });

  // Test 2: Test Adding Todos
  test('allows a new todo to be added', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const newTodoText = 'New Test Todo';

    // 1. Simulate user input
    fireEvent.change(input, { target: { value: newTodoText } });

    // 2. Simulate form submission
    fireEvent.click(addButton);

    // 3. Verify the new todo is in the list (using the mock ID for stability)
    expect(screen.getByText(newTodoText)).toBeInTheDocument();
    
    // 4. Verify input field is cleared
    expect(input.value).toBe('');
  });

  // Test 3: Test Toggling Todos
  test('allows a todo item to be toggled', () => {
    render(<TodoList />);
    
    // Get the element for the uncompleted todo (ID 1)
    const todoItem = screen.getByText(/Initial Task 1: Learn Jest/i);
    const listItem = todoItem.closest('li');

    // 1. Check initial uncompleted state
    expect(listItem).not.toHaveClass('line-through');
    
    // 2. Simulate click (toggle completed)
    fireEvent.click(todoItem);
    
    // 3. Check new completed state
    expect(listItem).toHaveClass('line-through');

    // 4. Simulate click again (toggle back to uncompleted)
    fireEvent.click(todoItem);

    // 5. Check final uncompleted state
    expect(listItem).not.toHaveClass('line-through');
  });

  // Test 4: Test Deleting Todos
  test('allows a todo item to be deleted', () => {
    render(<TodoList />);
    
    const todoText = /Initial Task 1: Learn Jest/i;
    
    // 1. Check initial presence
    expect(screen.getByText(todoText)).toBeInTheDocument();

    // 2. Find the delete button associated with the item (using data-testid 'delete-button-1')
    const deleteButton = screen.getByTestId('delete-button-1');

    // 3. Simulate delete click
    fireEvent.click(deleteButton);
    
    // 4. Verify the todo is removed
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });
});