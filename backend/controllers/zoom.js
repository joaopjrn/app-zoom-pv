const axios = require('axios');

const headers = {
  "User-Agent": "Zoom-api-Jwt-Request",
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImVDa2staVF1VFBhM2d5ejhWUzJwMnciLCJleHAiOjE2NDA5MTk2MDAsImlhdCI6MTYzNzcwNDMzNH0.-jn_xv2FSq9jM40jsIYWrXp9YVloxYkWBbGK0mDou0w"
}

exports.criarLinkZoom = (req, res, next) => {
  console.log('gravarAuto: ' + req.body.gravarAuto)
  axios.post('https://api.zoom.us/v2/users/'+ req.body.email +'/meetings',
  {
    topic: req.body.topic,
    type: 2,
    duration: 300,
    agenda: req.body.agenda,
    settings: {
      auto_recording: req.body.gravarAuto ? 'cloud' : 'none',
      mute_upon_entry: true,
      // waiting_room: false // não funciona
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
      type: 2
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

exports.buscarGravacao = (req, res, next) => {
  console.log('idMeeting: '+req.params.idMeeting)
  axios.get('https://api.zoom.us/v2/meetings/'+ req.params.idMeeting +'/recordings', {headers})
  .then(resultado => {
    console.log(resultado.data)
    const link = {
      link: resultado.data.share_url,
      senha: resultado.data.password
    }
    return res.status(201).json({msg: 'ok', dados: link})
  }).catch(erro => {
    // console.log(erro.response.data)
    res.status(500).json({msg: erro.response.data.message, erro: erro.response.data})
  });
}
