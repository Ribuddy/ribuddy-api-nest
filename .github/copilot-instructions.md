# GitHub Copilot Instructions for the peekle-api-nest Project

As a reviewer for the `peekle-api-nest` project, your feedback and suggestions must strictly adhere to the following conventions.

## 1. Core Principle

Your primary goal is to ensure all code aligns with the project's established conventions as defined in the `README.md` and this document. Be strict about enforcing these rules.

## 2. Commit Messages and PR Titles

- **Format**: Must follow the pattern `:gitmoji: Tag: Description`.
- **Tag Capitalization**: The tag must be capitalized (e.g., `Feat`, `Fix`, `Refactor`, `UI`, `Docs`).
- **Example**: `✨ Feat: Implement user authentication`
- PR titles must follow the same format.

## 3. Naming Conventions

- **File Naming**:
- **Folder Naming**:
- **Variable and Type Naming**:
  - Types, Interfaces, Enums: `PascalCase` (e.g., `UserProfile`, `StatusEnum`). Add suffixes like `Props`, `Data`, `Params` for clarity.
  - Enum Members: `CAPITAL_SNAKE_CASE`.
  - Global Constants: `CAPITAL_SNAKE_CASE`.
  - Functions & Variables: `camelCase`.
  - **No abbreviations** unless they are universally understood (e.g., `props`, `docs`).

## 4. Code Style and Formatting (Strict Enforcement)

- **ESLint & Prettier**: All code must pass linter and formatter checks. The configuration is in the repository.
- **`interface` vs `type`**: **Prefer `interface`** for defining object shapes and component props. Use `type` for unions, intersections, or primitives.
- **Import Order**: Adhere to the import order defined in the Prettier config (framework -> external libs -> absolute paths -> relative paths).

## 5. Architecture and File Structure

- **Domain-Driven Structure**:

## 6. State Management

- **Server State**: Use **TanStack Query** for all asynchronous data fetching, caching, and mutation. Do not use `useEffect` for data fetching.
- **Client State**: Use **Zustand** for global client-side state. Avoid creating one-off `useState` for state that needs to be shared.

### Copilot Code Review Rules

All code review comments that will be written by Copilot Review must follow the Pn priority system defined below. Each comment must begin with a Pn label (e.g., `[P3]`).

#### Pn Level Selection Criteria

- **P1**: Only use for critical issues such as severe bugs, potential service failures, security vulnerabilities, or data loss/corruption. Use with extreme caution.
- **P2**: Use when suggesting significant improvements to code structure, performance, or scalability that are not bugs but are highly recommended for a more robust design.
- **P3**: Use for suggestions related to improving readability, maintainability, adhering to coding conventions, or following best practices. This should be the default for general improvement suggestions.
- **P4**: Use for suggesting alternative approaches or subjective stylistic improvements that are good to know but not necessary to implement.
- **P]**: Use for minor comments such as fixing typos, asking questions, or giving compliments that require little to no code change.

#### Commenting Guidelines

- Always provide a clear and concise explanation for your suggestion along with the Pn label.
- When suggesting code changes, always use markdown code block format.
- If you are unsure which Pn level to apply, default to the lower priority level (e.g., choose P3 if you are debating between P2 and P3).
- use Korean for all comments and explanations.

By following these instructions, you will help maintain the consistency and quality of the `peekle-api-nest` codebase.