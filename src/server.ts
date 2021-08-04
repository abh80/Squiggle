import fastify from "fastify";
import RPC from "./RPC";
import { ActivitiesPostBody } from "./Interface";

const client: RPC = new RPC();
const PORT = 7879;
const server = fastify({ logger: true });

server.get("/", (req, rep) => {
  rep.send("Squiggle is running!");
});
server.post("/activities", async (req, rep) => {
  if (!req.body) {
    rep.code(400).send({ message: "No activities sent" });
  }
  const { description, state, clientID, start, end, largeImage, smallImage } =
    req.body as ActivitiesPostBody;
  if (!clientID)
    return rep.code(400).send({ message: "No client id was sent" });
  if (description && typeof description !== "string")
    return rep.code(400).send({ message: "Description must be a string" });
  if (state && typeof state !== "string")
    return rep.code(400).send({
      message: "State must be a string",
    });
  if (start && typeof start !== "number")
    return rep.code(400).send({
      message: "Start must be a number",
    });
  if (end && typeof end !== "number")
    return rep.code(400).send({
      message: "End must be a number",
    });
  if (largeImage && typeof largeImage !== "string")
    return rep.code(400).send({
      message: "Large image must be a string",
    });
  if (smallImage && typeof smallImage !== "string")
    return rep.code(400).send({
      message: "Small image must be a string",
    });
  const done = await client.postActivity(
    clientID,
    req.body as ActivitiesPostBody
  );
  if (done.type == "error") {
    rep.code(400).send({
      message: done.message,
    });
  } else rep.send({ message: "Activity Sent!" });
});
server.delete("/activities", async (req, rep) => {
  if (!req.body)
    return rep.status(400).send({ message: "No client id was send" });
  const clientID = (req.body as { clientID: string }).clientID;
  if (!clientID)
    return rep.status(400).send({ message: "No client id was send" });
  const done = await client.deleteActivity(clientID);
  if (done.type == "error") {
    rep.status(400).send({
      message: done.message,
    });
  }
  return rep.send({ message: "Activity Deleted!" });
});

server.listen(PORT);
