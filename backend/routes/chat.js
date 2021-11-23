const express = require('express');
const router = express.Router();
const ChatController = require ('../controllers/chat');

router.get('/conversa/:idConversa/:nMsgs', ChatController.buscarMensagens);
router.get('/:idMateria', ChatController.buscarConversas);
router.get('/:idMateria/:idAluno', ChatController.buscarConversa);
router.post('', ChatController.criarConversa);
router.post('/mensagem', ChatController.criarMensagem);

// router.put('', ConversasController.alterarAula);
// router.delete('', ConversasController.excluirAula);

module.exports = router;

//http://localhost:3000/api/aula/
