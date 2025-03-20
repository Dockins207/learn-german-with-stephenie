const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const Student = sequelize.define('Student', {
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
            defaultValue: 'student'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        tableName: 'students',
        hooks: {
            beforeCreate: async (student) => {
                if (student.password) {
                    student.password_hash = await bcrypt.hash(student.password, 10);
                    delete student.password;
                }
            },
            beforeUpdate: async (student) => {
                if (student.changed('password')) {
                    student.password_hash = await bcrypt.hash(student.password, 10);
                    delete student.password;
                }
            }
        }
    });

    Student.prototype.validatePassword = async function(password) {
        return bcrypt.compare(password, this.password_hash);
    };

    Student.associate = (models) => {
        Student.hasMany(models.Attendance, {
            foreignKey: 'student_id',
            as: 'attendance'
        });
    };

    return Student;
};
