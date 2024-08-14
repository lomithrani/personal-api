import Elysia, { t } from 'elysia';
import { Experience, Domain } from '../models/database';
import { DomainDoesNotExistError } from '../errors';

export const domain = new Elysia()
  .get('/domain/:name', async ({ params: { name } }) => {
    const domain = await Domain.findOne({ name: name });
    if (!domain) throw new DomainDoesNotExistError('Domain not found');
    const populatedDomain = await domain.populate<{ experiences: Experience[] }>('experiences');
    return populatedDomain;
  })