const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const Users = require('./controllers/Users');
const Recipes = require('./controllers/Recipes');

const { validateUser } = require('./schemas/UserSchema');
const { validateLogin } = require('./schemas/LoginSchema');
const { validateRecipe } = require('./schemas/RecipeSchema');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/uploads'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
  path: (req, file, callback) => {
    callback(null, );
  },
});
const uploads = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/users', Users.getAll);
app.post('/users', validateUser, Users.newUser);
app.post('/login', validateLogin, Users.login);

app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.findById);
app.post('/recipes', validateRecipe, validateJWT, Recipes.newRecipe);
app.put('/recipes/:id', validateRecipe, validateJWT, Recipes.updateRecipe);
app.delete('/recipes/:id', validateJWT, Recipes.deleteRecipe);
app.put('/recipes/:id/image', validateJWT, uploads.single('image'), Recipes.uploadImage);
// app.get('/images/<id-da-receita>.jpeg');

module.exports = app;
