import Elysia, { t } from 'elysia';
import { Experience, Domain } from '../models/database';

export const domain = new Elysia()
  .get('/domain/:name', async ({ params: { name } }) => {
    const domain = await Domain.findOne({ name: name });
    if (!domain) throw new Error('Domain not found');
    const populatedDomain = await domain.populate<{ experiences: Experience[] }>({
      path: 'experiences',
      populate: {
        path: 'projects',
        populate: [
          { path: 'hardSkills.skill' },
          { path: 'softSkills.skill' }
        ],
      },
    })
    const domainObject = JSON.parse(JSON.stringify(populatedDomain)) as Omit<Domain, 'experiences'> & { experiences: Experience[] };

    return domainObject;
  })