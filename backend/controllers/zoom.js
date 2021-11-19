const axios = require('axios');

const headers = {
  "User-Agent": "Zoom-api-Jwt-Request",
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImVDa2staVF1VFBhM2d5ejhWUzJwMnciLCJleHAiOjE2Mzc2MzI4OTQsImlhdCI6MTYzNzAyODA5NX0.JbLCyUDOdFFvt4tbOSVzzVpVpOgQXjVRqBcIJC2mha4"
}

exports.criarLinkZoom = (req, res, next) => {
  axios.post('https://api.zoom.us/v2/users/'+ req.body.email +'/meetings',
  {
    topic: req.body.topic,
    type: 2,
    duration: 300,
    settings: {
      auto_recording: 'cloud'
    }
  }, {headers})
  .then(resultado => {
    console.log(resultado.data)
    return res.status(201).json({msg: 'ok', dados: resultado.data})
  })
  .catch(erro => {
    res.status(500).json({msg: 'erro', erro: erro})
  });
}

exports.criarUsuario = (req, res, next) => {
  axios.post('https://api.zoom.us/v2/users/',
  {
    action: "create",
    user_info: {
      email: req.body.email,
      type: 1
    }
  }, {headers})
  .then(resultado => {
    // console.log(resultado.data)
    return res.status(201).json({msg: 'ok', dados: resultado.data})
  })
  .catch(erro => {
    // console.log(erro.response.data)
    res.status(500).json({msg: 'erro', erro: erro.response.data})
  });
};

exports.verificarUsuario = (req, res, next) => {
  axios.get('https://api.zoom.us/v2/users/'+req.params.email, {headers})
  .then(resultado => {
    console.log(resultado)
    return res.status(201).json({msg: 'ok', dados: resultado.data})
  }).catch(erro => {
    // console.log(erro.response.data)
    res.status(500).json({msg: 'erro', erro: erro.response.data})
  });
}
