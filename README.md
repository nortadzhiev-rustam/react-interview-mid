# React – Mid Level Interview Task (45–60 min)

## Core Task: Contact Form with Validation

Build a contact form with real-time validation and async submission handling.

### Required Features
1. **Form Fields**: Name, Email, and Message inputs
2. **Real-time Validation**: Validate fields as the user types
   - Name: minimum 2 characters
   - Email: valid email format
   - Message: minimum 10 characters
3. **Controlled Components**: All inputs must be controlled
4. **Async Submit**: Simulate API call with loading state
5. **Error Handling**: Display submission errors (e.g., network failures)
6. **Success Feedback**: Show success message after successful submission
7. **Form Reset**: Clear form after successful submission
8. **Disable Inputs**: Disable form during submission

### Technical Requirements
- Use `useState` for form state management
- Use `useCallback` for memoized validation functions
- Implement proper error states (validation + submission errors)
- Handle loading states during async operations
- Use proper accessibility attributes (aria-invalid, aria-describedby)
- Prevent submission if validation errors exist

### Follow-up Discussion Questions
Be prepared to discuss:
- When and why to use `useCallback` and `useMemo`
- Form validation strategies (on change vs on blur vs on submit)
- Managing multiple related state values
- Error handling patterns in async code
- Accessibility considerations for forms

## How to Run

Serve the `index.html` file with a dev server:

**Option 1 - Using Vite:**
```bash
npx vite
```

**Option 2 - Using Python:**
```bash
python3 -m http.server 3000
```

**Option 3 - Using Node.js http-server:**
```bash
npx http-server -p 3000
```

Then open your browser to the displayed URL (typically http://localhost:3000).

## Scoring Rubric (10 points total)

### Correctness (0–3 points)
- 3: All validation and submission logic works correctly, handles edge cases
- 2: Core functionality works, minor validation or error handling issues
- 1: Basic form works but significant issues with validation or submission
- 0: Major functionality broken or missing

### React Fundamentals (0–3 points)
- 3: Proper use of hooks, controlled components, memoization where appropriate
- 2: Generally correct but could improve optimization or patterns
- 1: Some React anti-patterns or inefficiencies present
- 0: Fundamental misunderstandings of React patterns

### Code Quality (0–2 points)
- 2: Clean, well-organized, DRY code with good separation of concerns
- 1: Functional but could be better organized or has some duplication
- 0: Poor organization or significant code quality issues

### UX/Accessibility (0–2 points)
- 2: Excellent UX with proper loading states, error messages, and accessibility
- 1: Basic UX, some accessibility considerations
- 0: Poor UX or accessibility not considered
