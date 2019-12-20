const CoacherSchema = require('./coachers');
const middleware = require('./middleware')

class CoacherController {
  static async createCoacher (req, res) {
    const { id, coachName, teamName, won, lost } = req.body;
    try {
      const coach = await CoacherSchema.isExist(id);
      console.log(coach.length);
      if (coach.length > 0) {
        res.status(400).send('there is user with this id already');
      } else {
        if (middleware.greaterThenZero(won, lost)) {
          console.log('insideeeeeeeeee');
          const newCoacher = new CoacherSchema({ id, coachName, teamName, won, lost });
          const isOk = await newCoacher.save();
          if (isOk) {
            res.status(200).send('new coacher added');
          } else {
            res.status(500).send('cant save coacher');
          }
        } else {
          res.status(400).send('wrong body');
        }
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static updateCoacher (req, res) {
    const { id } = req.params;
    const { coachName, teamName, won, lost } = req.body;
  }

  // need to add update rank;
  static async deleteCoacher (req, res) {
    try {
      const id = parseInt(req.params.id);
      console.log(id)
      const coach = await CoacherSchema.isExist(id)
      if (coach.length > 0) {
        await CoacherSchema.deleteOne({ id: id }, (err) => {
          if (err) {
            res.status(500).send(`cant remove coacher id ${id}\n${err}`)
          } else {
            res.status(200).send(`coacher id: ${id} has been removed`)
          }
        })
      } else {
        res.status(400).send('this user is not exists')
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async getCoacher (req, res) {
    const id = parseInt(req.params.id);
    const coach = await CoacherSchema.isExist(id)
    if (coach.length > 0) {
      middleware.generateRank()
        .then((arrCoachers) => {
          for (let i = 0; i < arrCoachers.length; ++i) {
            if (arrCoachers[i][1].id === id) {
              res.status(200).send(`Rank:\t${i + 1}\nCoache name: ${arrCoachers[i][1].coachName}\nTeam: ${arrCoachers[i][1].teamName}`)
            }
          }
        })
        .catch(err => {
          res.status(400).send(err.message)
        })
    } else {
      res.status(400).send('id is not exist')
    }
  }

  static async getAllCoacher (req, res) {
    middleware.generateRank()
      .then((arrCoachers) => {
        console.log(arrCoachers);
        let allCoachersRank = 'Ranks:\n';
        for (let i = 0; i < arrCoachers.length; ++i) {
          allCoachersRank += `${i + 1}.\tName:  ` + arrCoachers[i][1].coachName + '\n\tTeam: ' + arrCoachers[i][1].teamName + '\n\n';
        }
        res.status(200).send(allCoachersRank);
      })
      .catch(err => {
        res.status(400).send(err.message)
      })
  }
}

module.exports = CoacherController;
