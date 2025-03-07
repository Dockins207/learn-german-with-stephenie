const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Attendance = sequelize.define('Attendance', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classroom_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'classrooms',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        joined: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        tableName: 'classroom_attendance'
    });

    Attendance.associate = (models) => {
        Attendance.belongsTo(models.Classroom, {
            foreignKey: 'classroom_id',
            as: 'classroom'
        });

        Attendance.belongsTo(models.User, {
            foreignKey: 'student_id',
            as: 'student'
        });
    };

    return Attendance;
};
