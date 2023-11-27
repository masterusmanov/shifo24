export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file?.originalname.match(/\.(jpg|jpeg|png|pdf|svg|docx)$/)) {
    req.fileValidationError =
      'Only (jpg|jpeg|png|pdf|svg|docx) file types allowed!';
    return callback(null, false);
  }
  callback(null, true);
};
