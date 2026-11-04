import { AuthPage } from '@widgets/auth'

/**
 * Регистрация. При выключенной авторизации страница уводит на главную.
 * @access private
 * @todo реализовать логику авторизации
 */
const RegisterPage = () => <AuthPage screen="register" />

export default RegisterPage
