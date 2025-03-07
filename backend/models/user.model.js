const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(20),
            defaultValue: 'user'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password_hash = await bcrypt.hash(user.password, 10);
                    delete user.password;
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password_hash = await bcrypt.hash(user.password, 10);
                    delete user.password;
                }
            }
        }
    });

    User.prototype.validatePassword = async function(password) {
        return bcrypt.compare(password, this.password_hash);
    };

    return User;
};
