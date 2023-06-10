import { ErrorCodes, HttpException } from 'exceptions';
import { PopupModel } from 'models';
import { logger } from 'utils/logger';
import { DocumentDto, UpdatePopupDto } from './dto/CreatePopupDto';
import URLParams from 'utils/rest/urlparams';
import { DEFAULT_PAGING } from 'utils/constants';

export const createPopup = async (input: DocumentDto) => {
  try {
    const data = await PopupModel.create(input);
    logger.info('Popup created successfully');

    return data;
  } catch (error) {
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
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getPopups = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

    const count = PopupModel.countDocuments();

    const data = await PopupModel.find()
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort(sortObj);

    logger.info('Popups fetched successfully');

    const resolveAll = await Promise.all([count, data]);
    return {
      result: resolveAll[1],
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
    };
  } catch (error) {
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
    return data;
  } catch (error) {
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updatePopup = async (id: string, input: UpdatePopupDto) => {
  try {
    const data = await PopupModel.findOneAndUpdate(
      { _id: id },
      {
        $set: input,
      }
    );

    logger.info('Popups updated successfully');
    return data;
  } catch (error) {
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
