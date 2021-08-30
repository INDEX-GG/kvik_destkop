import Button from '@material-ui/core/Button';
import Router from 'next/router';

export default function Default() {
    return (
        <div className="error__page">
            <div className="error__page_wrapper">
                <h5 className="error__title">404</h5>
                <p className="error__sub_title">Ой... Мы не можем найти страницу!</p>
                <p className="error__description">Мы сожалеем, но страница, на которую вы пытались перейти, не существует.<br />Пожалуйста, вернитесь на предыдущую страницу.</p>
                <Button onClick={() => Router.push('/')} variant="contained" color='primary'>Назад</Button>
            </div>
        </div>
    )
}
