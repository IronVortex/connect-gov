# Contributing to Connect Platform

Thank you for your interest in contributing to the Connect Platform! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Welcome diverse perspectives
- Report issues through appropriate channels

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/connect-platform.git`
3. Create a feature branch: `git checkout -b feature/description`
4. Set up development environment (see README.md)

## Development Workflow

### Before Starting

- Check existing issues and pull requests
- Discuss major changes in an issue first
- Ensure your local environment is set up correctly

### Making Changes

#### Frontend Changes

```bash
cd frontend
pnpm dev
# Make your changes
pnpm lint
pnpm build
```

#### Backend Changes

```bash
cd backend
pnpm dev
# Make your changes
pnpm lint
pnpm build
```

## Code Standards

### TypeScript
- Use strict mode
- Add proper type annotations
- Avoid `any` types
- Write meaningful variable names

### Frontend (Next.js/React)
- Use functional components
- Follow React hooks best practices
- Keep components modular and reusable
- Add proper prop types/interfaces

### Backend (NestJS)
- Follow NestJS conventions
- Use dependency injection
- Implement proper error handling
- Add JSDoc comments for public methods

### Styling
- Follow TailwindCSS conventions
- Use design tokens (colors, spacing)
- Maintain responsive design
- Keep CSS organized

## Git Workflow

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add new document upload feature
fix: Resolve CORS issue in backend
docs: Update deployment guide
refactor: Extract sidebar component logic
```

### Pull Request Process

1. **Before submitting PR:**
   - Run tests: `pnpm test` (if configured)
   - Lint code: `pnpm lint`
   - Build: `pnpm build`
   - Check for console errors

2. **PR Description:**
   - Link related issues
   - Describe changes made
   - Include screenshots if UI changes
   - List any breaking changes

3. **PR Requirements:**
   - Pass all CI checks
   - Get at least one code review
   - Resolve feedback
   - Keep PR focused (one feature per PR when possible)

## Bug Reports

When reporting bugs, include:

- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable
- Your environment (OS, Node version, etc.)

## Feature Requests

When suggesting features:

- Describe the use case
- Explain expected behavior
- Provide examples if helpful
- Discuss potential implementation

## Development Tips

### Debugging Frontend
```bash
cd frontend
# Add console.log statements
# Check browser DevTools
pnpm dev
```

### Debugging Backend
```bash
cd backend
# Use Logger from NestJS
# Check terminal output
pnpm dev
```

### Testing Changes with Docker
```bash
# Ensure changes work in containerized environment
docker-compose up
# Visit http://localhost:3000
```

## Project Structure Tips

- Components should be in `components/` with organized subfolders
- Utilities should be in `lib/` 
- API calls should use `lib/api.ts` client
- Types should be in `lib/types.ts`
- Backend business logic in services, controllers handle routing

## Common Tasks

### Adding a New API Endpoint

1. Create DTO in `backend/src/dto/`
2. Add controller method in `backend/src/controllers/`
3. Add service method in `backend/src/services/`
4. Add frontend API call in `frontend/lib/api.ts`
5. Create frontend component to use endpoint

### Adding a New Page

1. Create folder in `frontend/app/`
2. Add `page.tsx` file
3. Create components in `frontend/components/`
4. Update sidebar navigation if needed

### Updating Database Schema

1. Modify schema in `backend/src/schemas/`
2. Update DTOs if needed
3. Update API endpoints if needed
4. Run seed script to test

## Questions?

- Check existing documentation
- Review similar code in the project
- Open a discussion issue
- Ask in a pull request comment

## Thank You!

Your contributions help make Connect Platform better for everyone. We appreciate your efforts!
