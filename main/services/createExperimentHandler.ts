import { ipcMain } from "electron";
import { db } from "@main/helpers/db";
import { Session } from "@main/models/Session";

// Authenticate
ipcMain.on(
  "createExperiment",
  async (event, arg: { title: string; description: string }) => {
    if (arg.title === "") {
      event.reply("failCreateExperiment", "Title is required");
      return;
    }

    await db.experiment.create({
      data: {
        title: arg.title,
        description: arg.description,
        userId: Session.getSession().getUser().id,
      },
    });

    event.reply("createdExperiment", "Experiment Created");
    return;
  }
);
