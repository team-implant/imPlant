# Hello



## Updates on typescript makeover 


## Project Setup


- Updated vite.config.js to vite.config.ts
- Added necessary TypeScript dependencies
- Configured initial TypeScript settings
- there's a tsconfig.json file to make sure the jsx still functions along with the new type files

## Component Migration

We're migrating our components to TypeScript:

- Converted App.tsx to TypeScript
- In progress:
    - Pages
    - Hooks (when the backend controllers are ready)
- Implementing prop type definitions for components



## Backend Alignment (TBA)

- Updated SensorDataController to return data in a format consistent with frontend expectations
- When the controllers are made it should fit with what we have in format to keep parity between mock data and real API responses

## Type Definitions

- Defined types 
- Gradually adding type annotations to state variables and functions
- have to implement to remaining jsx files
- Best is to manually go though one file at a time , and correct imports and props

## Challenges

- type mismatch in Notification type for TopBar component? don't know how to resolve 
- make a test file for Jest


## Next Steps

- Complete migration of remaining components
- Implement comprehensive type coverage
- Enhance TypeScript configurations for stricter type checking
- Update API call sites to utilize typed responses
- Pretty up UI and CSS/ fonts etc

