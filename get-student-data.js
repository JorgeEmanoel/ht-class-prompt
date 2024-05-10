const _prompt = require('prompt')
const colors = require('@colors/colors/safe')

_prompt.message = colors.green('[HackTown]')
_prompt.delimiter = colors.red(':')

_prompt.start()

const validFunction = (variable) => variable && typeof variable === 'function'

const getStudentData = ({ classByAge, onConfirm, onGiveUp }) => {
  if (!validFunction(classByAge)) {
    throw new Error('Please, pass a valid "classByAge" function')
  }

  const schema = {
    properties: {
      name: {
        required: true,
        message: 'Por favor, digite seu nome'
      },
      age: {
        required: true,
        message: 'Por favor, digite sua idade'
      }
    }
  }

  _prompt.get(schema, (_, result) => {
    const { name, age } = result

    const className = classByAge(age)
    const user = {
      name,
      age,
      className,
    }

    const confirmationMessage = colors.white(`Voce pode entrar na turma "${colors.green(className)}". Deseja continuar (S/n)?`)
    const confirmationSchema = {
      properties: {
        answer: {
          message: confirmationMessage,
          required: true,
        }
      }
    }

    _prompt.get(confirmationSchema, (_, response) => {
      if (response.answer.toLowerCase() === 's' && validFunction(onConfirm)) {
        onConfirm(user)
        return
      }

      if (validFunction(onGiveUp)) {
        onGiveUp(user)
      }
    })
  })
}

module.exports = {
  getStudentData
}
