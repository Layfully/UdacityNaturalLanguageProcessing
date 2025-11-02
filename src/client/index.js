import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

import { validateText, handleTextValidation } from './js/validateText.js'
import { handleSubmit } from './js/formHandler.js'

export {
    validateText,
    handleSubmit,
    handleTextValidation
}