const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const StudySetService = require("../services/StudySetService");
const fileController = require("./fileController");

class StudySetController {
  async createSet(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.errors[0].msg,
        });
      }
      //req.body - {studysetName:studysetName, type:"dir"||"", parent:""}
      if (!req.body.studysetName)
        throw ApiError.BadRequest("studysetName wasn't set");

      req.body.name = req.body.studysetName;
      req.body.type = "dir";
      const set = await StudySetService.createSet(
        await fileController.createDir(req, res),
        req.user.username,
        req.body.studysetName
      );
      return res.json(set);
    } catch (e) {
      next(e);
    }
  }

  //not used
  async changeName(req, res, next) {
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Error during changing the name of set",
          errors: errors.errors,
        });
      }

      await StudySetService.changeName(
        req.user.username,
        req.body.studysetName,
        req.body.newName
      );
      return res.json({ message: "Name for studyset was updated" });
    } catch (e) {
      next(e);
    }
  }

  async getCards(req, res, next) {
    try {
      return res.json(
        await StudySetService.getCards(req.user.username, req.body.studysetName)
      );
    } catch (e) {
      next(e);
    }
  }

  async getStudySets(req, res, next) {
    try {
      return res.json(await StudySetService.getStudySets(req.user.username));
    } catch (e) {
      next(e);
    }
  }

  async sendFile(req, res, next) {
    try {
      res.download(
        `./data/files/${req.user.id}/${req.body.studysetName}/${req.body.fileName}`
      );
    } catch (e) {
      next(e);
    }
  }

  async deleteSet(req, res, next) {
    try {
      await StudySetService.deleteSet(req.user.id, req.body.setName);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new StudySetController();
