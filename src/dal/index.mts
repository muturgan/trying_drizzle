import { MochDal } from './moch.impl.mjs';
import { PostgresDal } from './postgres.impl.mjs';
import { IDal } from './typings.mjs';

export const dal: IDal = process.env.NODE_ENV === 'test'
	? new MochDal()
	: new PostgresDal();
