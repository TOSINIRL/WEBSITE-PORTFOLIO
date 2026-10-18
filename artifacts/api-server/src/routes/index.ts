import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import contactRouter from "./contact";
import infraRouter from "./infra";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(contactRouter);
router.use(infraRouter);

export default router;
