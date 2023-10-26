const { Driver } = require('./Driver');
const { Team } = require('./Team');

Driver.belongsToMany(Team, {
    through: 'driver_team',
    timestamps: false,
})

Team.belongsToMany(Driver, {
    through: 'driver_team',
    timestamps: false,
})

module.exports = { Driver, Team };