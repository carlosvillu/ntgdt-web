import Rosetta from '@schibstedspain/rosetta'
import Polyglot from '@schibstedspain/rosetta/lib/adapters/polyglot'

import enGB from './en-GB'
import esES from './es-ES'

const DEFAULT_CULTURE = 'es-ES'
const DEFAULT_CURRENCY = 'EUR'
const i18n = new Rosetta({ adapter: new Polyglot() })
i18n.languages = {'en-GB': enGB, 'es-ES': esES}
i18n.culture = DEFAULT_CULTURE
i18n.currency = DEFAULT_CURRENCY

export default i18n
