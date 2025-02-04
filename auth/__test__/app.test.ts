import app from '../src/app';
import request from 'supertest';

import jwt from 'jsonwebtoken';
describe('Jasonwebtoken .sign() and .verify()', () => {
    test('Should return true.', () => {
        const secret = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
        const userId = 1;
        const token = jwt.sign(
            {userId: userId},
            secret,
            { expiresIn: '30d' }
        );
        const decoded: any = jwt.verify(token, secret);
        expect(userId).toBe(decoded.userId);
    });
})
