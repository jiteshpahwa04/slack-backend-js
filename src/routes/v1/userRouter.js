import express from 'express';
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json({ message: 'User route works!' });
});

export default userRouter;