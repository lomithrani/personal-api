import Elysia, { t } from 'elysia';
import { corsConf } from './corsConf';
import { userLogged } from './userLogged';
import { Workflow } from '../models/database';
import { workflowRequest } from '../models/elysia';
import { Types } from 'mongoose';

export const workflows = new Elysia()
  .use(corsConf())
  .use(userLogged)
  .post('/workflows', async ({ body, userId }) => {

    const user = new Types.ObjectId(userId);
    const workflow = new Workflow({ ...body })
    workflow.user = user;
    workflow.save();

    return workflow;
  },
    {
      body: workflowRequest,
      detail: {
        summary: 'Add new workflow'
      }
    })
  .put('/workflows/:id', async ({ body, params: { id } }) => {
    return
  },
    {
      body: workflowRequest,
      detail: {
        summary: 'Edit workflow'
      }
    })