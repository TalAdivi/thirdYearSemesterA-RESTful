const CoacherModel = require('./coachers');
const middleware = require('./middleware')

class CoacherController {
  static async createCoacher (req, res) {
    const { id, coachName, teamName, won, lost } = req.body;
    try {
      const coach = await CoacherModel.isExist(id);
      if (coach.length > 0) {
        res.status(400).send('user already exists');
      } else {
        if (middleware.greaterThenZero(won, lost)) {
          const newCoacher = new CoacherModel({ id, coachName, teamName, won, lost });
          const savedOk = await newCoacher.save();
          if (savedOk) {
            middleware.generateRank()
              .catch(err => {
                res.status(400).send(err.message);
              })
              .then(() => {
                res.status(200).send('new coacher added');
              })
          } else {
            res.status(500).send('cant save coacher');
          }
        } else {
          res.status(400).send('won and lost must be positive valuse');
        }
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async updateCoacher (req, res) {
    try {
      const { coachName, teamName, won, lost } = req.body;
      const id = parseInt(req.params.id);
      const greaterThenZero = middleware.greaterThenZero(won, lost);
      const coach = await CoacherModel.isExist(id);

      if (coach.length > 0) {
        if (greaterThenZero) {
          const object = await CoacherModel.updateOne({ id: id }, { coachName: coachName, teamName: teamName, won: won, lost: lost })
          if (object.ok) {
            res.status(200).send('update success')
          } else {
            res.status(500).send('cant update');
          }
        } else {
          res.status(400).send('won and lost must be positive valuse');
        }
      } else {
        res.status(400).send('this user is not exists');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async deleteCoacher (req, res) {
    try {
      const id = parseInt(req.params.id);

      const coach = await CoacherModel.isExist(id);
      if (coach.length > 0) {
        await CoacherModel.deleteOne({ id: id }, (err) => {
          if (err) {
            res.status(500).send(`cant remove coacher id ${id}\n${err}`);
          } else {
            res.status(200).send(`coacher id: ${id} has been removed`);
          }
        })
      } else {
        res.status(400).send('this user is not exists');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async getCoacher (req, res) {
    const id = parseInt(req.params.id);
    const coach = await CoacherModel.isExist(id);
    if (coach.length > 0) {
      middleware.generateRank()
        .then((arrCoachers) => {
          for (let i = 0; i < arrCoachers.length; ++i) {
            if (arrCoachers[i][1].id === id) {
              res.status(200).send(`
              Rank:
              ------- ${i + 1} -------
    
              Name: ${arrCoachers[i][1].coachName}
              Id: ${arrCoachers[i][1].id}
              Team: ${arrCoachers[i][1].teamName}
              Won: ${arrCoachers[i][1].won}
              lost: ${arrCoachers[i][1].lost}
    
              ------- ${i + 1} -------
              
    
              `);
            }
          }
        })

        .catch(err => {
          res.status(400).send(err.message);
        })
    } else {
      res.status(400).send('id is not exist');
    }
  }

  static async getAllCoacher (req, res) {
    middleware.generateRank()
      .then((arrCoachers) => {
        let allCoachersRank = 'Ranks:\n';
        for (let i = 0; i < arrCoachers.length; ++i) {
          allCoachersRank += `
          ------- ${i + 1} -------

          Name: ${arrCoachers[i][1].coachName}
          Id: ${arrCoachers[i][1].id}
          Team: ${arrCoachers[i][1].teamName}
          Won: ${arrCoachers[i][1].won}
          lost: ${arrCoachers[i][1].lost}

          ------- ${i + 1} -------


          `;
        }
        res.status(200).send(allCoachersRank);
      })

      .catch(err => {
        res.status(400).send(err.message);
      })
  }
}

module.exports = CoacherController;
