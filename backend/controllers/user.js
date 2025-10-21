require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

// Route d'Inscription
exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé !' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email déjà utilisé !' });
  } else {
      res.status(500).json({ message: 'Erreur serveur !' });
    }
  }
};

// Route de Connexion
exports.login = async (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user === null) {
            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                } else {
                    res.status(200).json({ 
                        userId: user._id,
                        token: jsonwebtoken.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                }
            })
            .catch(error => {
                res.status(500).json( { error })
            })
        }
    })
    .catch(error => {
        res.status(500).json( { error })
    })
};