import catchAsync from '../utils/catchAsync';
import messageService from '../services/messageService';

const messageController = {
  getAllMessages: catchAsync(async (req, res, next) => {
    const messages = await messageService.getAll();
    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    });
  }),

  getMessageById: catchAsync(async (req, res, next) => {
    const message = await messageService.getById(req.params.messageId);
    res.status(200).json({
      status: 'success',
      data: {
        message,
      },
    });
  }),

  createMessage: catchAsync(async (req, res, next) => {
    const message = await messageService.create({
      text: req.body.text,
      userId: req.context.me.id,
    });
    res.status(201).json({
      status: 'success',
      data: {
        message,
      },
    });
  }),

  updateMessage: catchAsync(async (req, res, next) => {
    const message = await messageService.update(req.params.messageId, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        message,
      },
    });
  }),

  deleteMessage: catchAsync(async (req, res, next) => {
    await messageService.delete(req.params.messageId);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

export default messageController;