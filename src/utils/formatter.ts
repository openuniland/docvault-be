/**
 * Helper functions to standardize responses formats.
 */
import { Response } from 'express';
import ApiResponse from './rest/response';

/**
 * Utility class for formatting response
 */
export class Formatter {
  /**
   * Function to format response
   */
  public formatResponse = (
    result: any,
    time: number,
    message?: string,
    total?: number,
    currentPage?: number
  ): ApiResponse<Object> => {
    let numRecords: number = 0;
    let errors: Error = null;
    let data: any = null;

    const isResultArray = result && Array.isArray(result);
    if (isResultArray) {
      numRecords = result.length;
      data = result;
    } else if (result && result instanceof Error) {
      errors = result;
    } else if (result || result === 0) {
      numRecords = 1;
      data = result;
    }

    const response: ApiResponse<Object> = {
      data,
      // errors,
      message: message ? message : null,
      // meta: {
      //   length: numRecords,
      //   took: time,
      //   ...(isResultArray && { currentPage }),
      //   total: total ? total : numRecords,
      // },
      status: 200,
      send: function (res: Response<any, Record<string, any>>): void {
        throw new Error('Function not implemented.');
      }
    };

    return response;
  };
}

export const dataText = (text: string, variables?: any): string => {
  for (const key in variables) {
    if (variables[key] && text.includes(`{${key}}`)) {
      text = text.replace(new RegExp(`{${key}}`, 'g'), variables[key]);
    }
  }
  return text;
};

export const currencyFormat = (amount: number): string => {
  return new Intl.NumberFormat().format(Math.round(amount));
};

const formatter = new Formatter();

export default formatter;
