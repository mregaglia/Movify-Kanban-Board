# Movify-Kanban-Board
Kanban Board tool for Movify

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Project structure

The project is split in the front-end and the server part for the front end serving.

You can find the server (**server.js**) and the app under the **source**.

> Don't forget to add the **.env** file at the source and on the server when deploying.

### Main dependencies

- Component styling : [styled-components](https://www.styled-components.com/)
- Redux : [redux, react-redux and redux-saga](https://github.com/reduxjs/react-redux)
- Navigation : [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
- Drag and Drop : [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

### Start project locally without server

```
yarn
yarn start
```

### Start project locally with server

```
yarn
yarn run build
yarn serve
```

### Deploy

Start SSH session on OVH server.

Pull changes on git repository.

Update or add **.env** if necessary at the **source**.

Start node scripts. 

[forever](https://www.npmjs.com/package/forever) is installed globally so you can use it to start the project.

```
git pull
npm i
npm run build
forever start server.js (or restart if one instance is already started)
```
