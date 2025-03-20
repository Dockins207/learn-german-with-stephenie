const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Classroom = sequelize.define('Classroom', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        booked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        day: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        meet_link: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'classrooms'
    });

    Classroom.associate = (models) => {
        Classroom.hasMany(models.Attendance, {
            foreignKey: 'classroom_id',
            as: 'attendance'
        });
    };

    return Classroom;
};
