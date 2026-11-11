import { InfoPage } from '@shared/ui/info-page'

import { DATA_TEXT } from './config'

/**
 * Страница «О сервисе».
 * @description Описание сервиса и его цель.
 * @access public
 */
export const AboutPage = () => <InfoPage {...DATA_TEXT} />

export default AboutPage
