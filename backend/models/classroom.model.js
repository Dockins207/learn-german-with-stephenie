const { DataTypes } = require('sequelize');

class Classroom {
  static async getAll(sequelize) {
    const Classroom = sequelize.model('Classroom');
    const classrooms = await Classroom.findAll();
    return classrooms;
  }

  static async getStatus(id, sequelize) {
    const Classroom = sequelize.model('Classroom');
    const classroom = await Classroom.findByPk(id);
    return classroom;
  }

  static async updateStatus(id, booked, sequelize) {
    const Classroom = sequelize.model('Classroom');
    const classroom = await Classroom.findByPk(id);
    classroom.booked = booked;
    await classroom.save();
  }
}

module.exports = (sequelize) => {
  const Classroom = sequelize.define('Classroom', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL'
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
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'classrooms'
  });

  Classroom.associate = (models) => {
    Classroom.belongsTo(models.User, {
      foreignKey: 'teacher_id',
      as: 'teacher'
    });
  };

  Classroom.getAll = Classroom.getAll;
  Classroom.getStatus = Classroom.getStatus;
  Classroom.updateStatus = Classroom.updateStatus;

  return Classroom;
};
