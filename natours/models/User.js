
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/dbConnect.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },   
    client_id: {
        type: DataTypes.STRING(56),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(19),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    signature: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    client_secret: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    user_key: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(40),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true, // Para ativar automaticamente as colunas createdAt e updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    scopes: {
        eliminarPassword:{
            attributes: {
                exclude: ['account_id', 'email', 'updated_at', 'created_at', 'user_key','client_secret', 'type', 'signature', 'password', 'name', 'cpf']
            }
        }
    }
});

// Hash da senha antes de salvar o usuário
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

//   faz relação com client, logs_client, Transactions, devoluition, cashout

// Adicionar uma função de instância para comparar senhas
User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;