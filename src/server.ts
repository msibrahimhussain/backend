import express from 'express';
import {
  loadData,
  deleteAllUsers,
  deleteUser,
  getUser,
  addUser,
  getAllUsers,
} from './controllers/userController';

const app = express();        // <-- THIS LINE must come before using `app`
app.use(express.json());

app.get('/load', loadData);
app.get('/users', getAllUsers);
app.delete('/users', deleteAllUsers);
app.delete('/users/:userId', deleteUser);
app.get('/users/:userId', getUser);
app.put('/users', addUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
