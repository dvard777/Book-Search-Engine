// server/src/server.ts
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import db from './config/connection';
import { typeDefs, resolvers } from './schemas';
import { authMiddleware } from './services/auth';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => authMiddleware({ req })
  });
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();
