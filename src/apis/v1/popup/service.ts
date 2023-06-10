import { ErrorCodes, HttpException } from 'exceptions';
import { PopupModel } from 'models';
import { logger } from 'utils/logger';
import { DocumentDto } from './dto/CreatePopupDto';

export const createPopup = async (input: DocumentDto) => {
  try {
    const data = await PopupModel.create(input);
    logger.info('Popup created successfully');

    return data;
  } catch (error) {
    logger.error(`Error while creating popup: ${error}`);
    throw new HttpException(
      400,
      error?.message || ErrorCodes.BAD_REQUEST.MESSAGE,
      error?.code || ErrorCodes.BAD_REQUEST.CODE
    );
  }
};

export const deletePopup = async (id: string) => {
  try {
    const data = await PopupModel.findByIdAndDelete({
      _id: id,
    });
    logger.info('Popup deleted successfully');
    return data;
  } catch (error) {
    logger.error(`Error deleting popup: ${error} `);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const revokedPopup = async (id: string) => {
  try {
    const data = await PopupModel.findByIdAndUpdate({ _id: id }, { is_revoked: true });

    const result = await PopupModel.findById({ _id: id });

    logger.info(`Popup revoked successfully: ${data}`);
    return result;
  } catch (error) {
    logger.error(`Error revoking popup: ${error} `);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getPopups = async () => {
  try {
    const data = await PopupModel.find();

    logger.info('Popups fetched successfully');
    return data;
  } catch (error) {
    logger.error(`Error getting popup: ${error} `);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getPopupsByDateRange = async () => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  try {
    const data = await PopupModel.findOne({
      start_date: { $lte: currentTimestamp },
      end_date: { $gte: currentTimestamp },
    }).sort({ priority: -1 });

    logger.info('Popups fetched successfully');
    logger.info(data);
    logger.info(currentTimestamp);
    return data;
  } catch (error) {
    logger.error(`Error getting popup: ${error} `);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
