const router = require('express').Router();
const Jimp = require('jimp');
const multer = require('multer');

const upload = multer();

router.post('/quality', upload.single('image'), async function(req, res) {
  const { originalname, encoding, mimetype, buffer } = req.file; // multer가 formdata에서 가져옴
  const { value = 100, resultType = 'base64' } = req.body; // formdata의 필드

  if (/jpeg/g.test(mimetype)) {
    Jimp.read(buffer)
      .then(async image => {
        const resultJimp = image.quality(parseInt(value, 10));
        let data; // 이미지 데이터 스트링

        switch (resultType) {
          case 'base64':
            data = await resultJimp.getBase64Async(mimetype);
            break;

          case 'buffer':
            data = await resultJimp.getBufferAsync(mimetype);
            break;

          default:
            data = await resultJimp.getBase64Async(mimetype);
            break;
        }

        res.json({
          mimetype,
          encoding,
          originalname,
          data,
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  } else {
    res.status(500).send('jpeg 타입만 퀄리티 조정 가능합니다.');
  }
});

module.exports = router;
