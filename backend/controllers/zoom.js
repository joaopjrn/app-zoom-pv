const axios = require('axios');

exports.criarLinkZoom = (req, res, next) => {
  axios.post('https://api.zoom.us/v2/users/KVR2S5ZEQIKhdbIRTG1LLA/meetings',
  {
    topic: req.body.topic,
    type: 2,
    duration: 300
  },
  {
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImVDa2staVF1VFBhM2d5ejhWUzJwMnciLCJleHAiOjE2Mzc2MzI4OTQsImlhdCI6MTYzNzAyODA5NX0.JbLCyUDOdFFvt4tbOSVzzVpVpOgQXjVRqBcIJC2mha4"
    }
  })
  .then(resultado => {
    console.log(resultado.data)
    return res.status(201).json({msg: 'ok', dados: resultado.data})
  })
  .catch(erro => {
    res.status(500).json({msg: 'erro', erro: erro})
  });
}

