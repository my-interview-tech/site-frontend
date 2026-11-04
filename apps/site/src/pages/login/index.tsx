import { AuthPage } from '@widgets/auth'

/**
 * Вход. При выключенной авторизации страница уводит на главную.
 * @access private
 * @todo реализовать логику авторизации
 */
const LoginPage = () => <AuthPage screen="login" />

export default LoginPage
